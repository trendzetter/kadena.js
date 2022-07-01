import type { ListenRequestBody, SendRequestBody } from '@kadena/types';

import { unique } from '../util/unique';

/**
 * Given an exec 'send' message, prepare a message for 'listen' endpoint.
 * @param execMsg {object} JSON with "cmds" field, see 'mkPublicSend'. Only takes first element.
 * @return {object} with "requestKey" for polling.
 */
export function createListenRequest({
  cmds,
}: SendRequestBody): ListenRequestBody {
  return { listen: unique(cmds.map(({ hash }) => hash))[0] };
}
