import StateMachine from "./st-machine";

const states = {
  initial: "off",
  states: [
    {
      name: "off",
      transitions: [
        {
          action: "turn on",
          response: "on"
        }
      ]
    },
    {
      name: "on",
      initial: "normal",
      transitions: [{ action: "turn off", response: "off" }],
      states: [
        {
          name: "normal",
          transitions: [
            {
              action: "turbo",
              response: "turbo"
            }
          ]
        },
        {
          name: "turbo",
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
