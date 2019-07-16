import maxBy from 'lodash/maxBy'

function getLastBellEvent (doteRequest) {
  if (doteRequest && doteRequest.events.length > 0) {
    return maxBy(doteRequest.events, 'timestamp')
  }
}

function getLastBellEventType (doteRequest) {
  const lastBellEvent = getLastBellEvent(doteRequest);
  return lastBellEvent && lastBellEvent.type || null;
}

export { getLastBellEvent, getLastBellEventType }