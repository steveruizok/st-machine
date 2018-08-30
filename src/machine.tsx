import StateMachine from "./st-machine";

const states = {
  initial: "off",
  states: [
    {
      id: "off",
      transitions: [
        {
          action: "turn on",
          response: "on"
        }
      ]
    },
    {
      id: "on",
      initial: "normal",
      transitions: [{ action: "turn off", response: "off" }],
      states: [
        {
          id: "normal",
          transitions: [
            {
              action: "turbo",
              response: "turbo"
            }
          ]
        },
        {
          id: "turbo",
          transitions: [
            {
              action: "relax",
              response: "normal"
            }
          ]
        }
      ]
    }
  ]
};

function callback(change) {
  change;
  // console.log(change);
}

const Machine = new StateMachine(states, callback);

export default Machine;
