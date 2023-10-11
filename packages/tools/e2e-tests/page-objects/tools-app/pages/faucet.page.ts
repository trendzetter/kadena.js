import CardComponent from '../../react-ui/card.component';
import NotificationContainerComponent from '../../react-ui/notificationContainer.component';

import type { Page } from '@playwright/test';

export default class FaucetPage {
  private readonly _page: Page;
  private _card: CardComponent;
  public notification: NotificationContainerComponent;

  public constructor(page: Page) {
    this._page = page;
    this._card = new CardComponent(this._page);
    this.notification = new NotificationContainerComponent(this._page);
  }

  public async fundAccount(account: string, chainId: string): Promise<void> {
    await this._card.setValueForTextbox(
      'The Account Name You Would Like To Fund Coins To',
      account,
    );
    await this._card.setValueForCombobox('Select Chain ID', chainId);
    await this._page.getByRole('button', { name: 'Fund 100 Coins' }).click();
  }
}
