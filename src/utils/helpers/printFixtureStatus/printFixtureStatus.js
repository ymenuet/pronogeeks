import matchStatuses from '../../models/matchStatuses';
import { isMatchFinished } from '..';

export default (statusShort, minutes) => {
  if (isMatchFinished(statusShort)) {
    return 'Match terminé';
  }
  if (statusShort === matchStatuses.HALFTIME) {
    return 'Mi-temps';
  }
  if (statusShort === matchStatuses.POSTPONED) {
    return 'Match reporté';
  }
  if (statusShort === matchStatuses.SUSPENDED) {
    return `Match suspendu (${minutes}')`;
  }
  if (statusShort === matchStatuses.INTERRUPTED) {
    return `Match interrompu (${minutes}')`;
  }
  return `${minutes}'`;
};
