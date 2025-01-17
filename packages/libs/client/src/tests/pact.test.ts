jest.mock('cross-fetch', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
import { IUnsignedTransaction } from '../interfaces/IUnsignedTransaction';
import { ICommandBuilder, Pact } from '../pact';

import fetch from 'cross-fetch';

function getCode(transaction: IUnsignedTransaction): string {
  return JSON.parse(transaction.cmd).payload.exec.code;
}

describe('Pact proxy', () => {
  it('creates an instance of the proxy', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pact = Pact as any;
    const tx = pact.modules.coin.transfer('alice', 'bob', 100).createCommand();
    expect(getCode(tx)).toBe('(coin.transfer "alice" "bob" 100.0)');
  });

  it('generates two different commands when executed after each other', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pact = Pact as any;

    const tx = pact.modules.coin.transfer('alice', 'bob', 100).createCommand();

    const tx2 = pact.modules.coin.transfer('bob', 'alice', 100).createCommand();

    expect(getCode(tx)).toBe('(coin.transfer "alice" "bob" 100.0)');
    expect(getCode(tx2)).toBe('(coin.transfer "bob" "alice" 100.0)');
  });

  it('generates two different commands when generated asynchronously', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pact = Pact as any;
    const tx = pact.modules.coin.transfer('alice', 'bob', 100).createCommand();
    const tx2 = pact.modules.coin['transfer-xchain'](
      'k:1',
      'k:1',
      'chain1',
      'chain2',
      100,
    ).createCommand();

    expect(getCode(tx2)).toBe(
      '(coin.transfer-xchain "k:1" "k:1" "chain1" "chain2" 100.0)',
    );
    expect(getCode(tx)).toBe('(coin.transfer "alice" "bob" 100.0)');
  });

  it('generates a command with data', () => {
    const sender =
      'k:554754f48b16df24b552f6832dda090642ed9658559fef9f3ee1bb4637ea7c94';
    const receiver =
      'k:e34b62cb48526f89e419dae4e918996d66582b5951361c98ee387665a94b7ad8';
    const amount = 0.23;
    const signerAccount = sender.split('k:')[1];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pact = Pact as any;

    const transaction = pact.modules.coin['transfer-create'](
      sender,
      receiver,
      () => "(read-keyset 'ks)",
      amount,
    )
      .addCap('coin.GAS', signerAccount)
      .addCap('coin.TRANSFER', signerAccount, sender, receiver, amount)
      .addData({
        ks: {
          keys: [
            '554754f48b16df24b552f6832dda090642ed9658559fef9f3ee1bb4637ea7c94',
          ],
          pred: 'keys-all',
        },
      })
      .setMeta(
        {
          gasLimit: 1000,
          gasPrice: 1.0e-6,
          sender: signerAccount,
          ttl: 10 * 60, // 10 minutes
        },
        'testnet04',
      )
      .createCommand();

    expect(JSON.parse(transaction.cmd).payload.exec.data.ks.keys).toEqual([
      '554754f48b16df24b552f6832dda090642ed9658559fef9f3ee1bb4637ea7c94',
    ]);
  });

  it('makes a well formatted /local call', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      ok: true,
      text: () => JSON.stringify({ results: [] }),
      json: () => {},
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pact = Pact as any;
    const builder: ICommandBuilder<{}> = pact.modules.coin.transfer(
      'from',
      'to',
      1.234,
    );
    await builder.local('fake-api-host.local.co');

    const body = builder.createCommand();

    expect(fetch).toBeCalledWith('fake-api-host.local.co/api/v1/local', {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });

  it('makes a well formatted /send call', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      ok: true,
      text: () => JSON.stringify({ requestKeys: ['key1'] }),
      json: () => ({ requestKeys: ['key1'] }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pact = Pact as any;
    const builder: ICommandBuilder<{}> = pact.modules.coin.transfer(
      'from',
      'to',
      1.234,
    );
    await builder.send('fake-api-host.local.co');

    const body = { cmds: [builder.createCommand()] };

    expect(fetch).toBeCalledWith('fake-api-host.local.co/api/v1/send', {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });

  it('makes a well formatted /poll call', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      ok: true,
      text: () => JSON.stringify({ requestKeys: ['key1'] }),
      json: () => ({ requestKeys: ['key1'] }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pact = Pact as any;
    const builder: ICommandBuilder<{}> = pact.modules.coin.transfer(
      'from',
      'to',
      1.234,
    );

    const { requestKeys } = await builder.send('fake-api-host.local.co');
    const body = { cmds: [builder.createCommand()] };

    expect(fetch).toBeCalledWith('fake-api-host.local.co/api/v1/send', {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    await builder.poll('fake-api-host.local.co');
    expect(fetch).toBeCalledWith('fake-api-host.local.co/api/v1/poll', {
      body: JSON.stringify({ requestKeys }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });

  it('throws when trying a .poll() when no requestkey is present', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      ok: true,
      text: () => JSON.stringify({ requestKeys: ['key1'] }),
      json: () => ({ requestKeys: ['key1'] }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pact = Pact as any;
    const builder: ICommandBuilder<{}> = pact.modules.coin.transfer(
      'from',
      'to',
      1.234,
    );

    expect(() => builder.poll('fake-api-host.local.co')).toThrow();
  });
});
