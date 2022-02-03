// A Simplistic TCP Finite State Machine (FSM)
// Key to solving this problem or any problem is 'UNDERSTANDING'

function traverseTCPStates(eventList) {
  var state = 'CLOSED'; // initial state is always "CLOSED"

  // first classify the session by the 'STATE'
  let TCPObject = {
    CLOSED: {
      APP_PASSIVE_OPEN: 'LISTEN',
      APP_ACTIVE_OPEN: 'SYN_SENT',
    },
    LISTEN: {
      RCV_SYN: 'SYN_RCVD',
      APP_SEND: 'SYN_SENT',
      APP_CLOSE: 'CLOSED',
    },
    SYN_RCVD: {
      APP_CLOSE: 'FIN_WAIT_1',
      RCV_ACK: 'ESTABLISHED',
    },
    SYN_SENT: {
      RCV_SYN: 'SYN_RCVD',
      RCV_SYN_ACK: 'ESTABLISHED',
      APP_CLOSE: 'CLOSED',
    },
    ESTABLISHED: {
      APP_CLOSE: 'FIN_WAIT_1',
      RCV_FIN: 'CLOSE_WAIT',
    },
    FIN_WAIT_1: {
      RCV_FIN: 'CLOSING',
      RCV_FIN_ACK: 'TIME_WAIT',
      RCV_ACK: 'FIN_WAIT_2',
    },
    CLOSING: {
      RCV_ACK: 'TIME_WAIT',
    },
    FIN_WAIT_2: {
      RCV_FIN: 'TIME_WAIT',
    },
    TIME_WAIT: {
      APP_TIMEOUT: 'CLOSED',
    },
    CLOSE_WAIT: {
      APP_CLOSE: 'LAST_ACK',
    },
    LAST_ACK: {
      RCV_ACK: 'CLOSED',
    },
  };

  // basically "changeState" function receives two inputs
  // first input is the "result" whose initial value comes from the variable "state"
  // second input is the "event" which comes from the eventList
  function changeState(result, event) {
    //  logic is simple, we pick object from the TCPObject by the resulting state or "result"
    //  which is initially always "CLOSED" then it might become something else depending on the EVENT (eg. CLOSED -> LISTEN)
    //  then from the resulting state or "result", we check if it has next event by "event"
    //  if the event is not there we assign it the word 'ERROR'
    return TCPObject[result][event] ? TCPObject[result][event] : 'ERROR';
  }
  //  after going through the function above
  //  it will either return the changed state or 'ERROR'
  return eventList.reduce(changeState, state);
}
