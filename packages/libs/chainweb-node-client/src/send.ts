import { parseResponse } from './parseResponse';
import { stringifyAndMakePOSTRequest } from './stringifyAndMakePOSTRequest';
import { SendResponse, Base16String, ICommand } from '@kadena/types';

/**
 * Request type of /send endpoint.
 *
 * @param cmds - Non-empty array of Pact commands (or transactions) to submit to server.
 * @alpha
 */
export interface ISendRequestBody {
  cmds: Array<ICommand>;
}

/**
 * Response type of /send endpoint.
 *
 * @param requestKeys - List of request keys (or command hashes) of the transactions submitted.
 *                      Can be sent to /poll and /listen to retrieve transaction results.
 * @alpha
 */
export interface ISendResponse {
  requestKeys: Array<Base16String>;
}

/**
 * Asynchronous submission of one or more public (unencrypted) commands to the blockchain for execution.
 *
 * Corresponds to `fetchSendRaw` and `fetchSend` functions:
 * https://github.com/kadena-io/pact-lang-api/blob/master/pact-lang-api.js#L601
 * https://github.com/kadena-io/pact-lang-api/blob/master/pact-lang-api.js#L589
 *
 * @param requestBody - Non-empty array of Pact commands to submit to server.
 * @param apiHost - API host running a Pact-enabled server.
 * @alpha
 */
export function send(
  requestBody: ISendRequestBody,
  apiHost: string,
): Promise<SendResponse> {
  const request = stringifyAndMakePOSTRequest(requestBody);

  const response: Promise<SendResponse> = fetch(
    `${apiHost}/api/v1/send`,
    request,
  ).then((r) => parseResponse(r));

  return response;
}
