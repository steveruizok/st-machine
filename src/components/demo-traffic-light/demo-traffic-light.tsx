import { Component, State } from "@stencil/core";
import { MStateMap, MState } from "../../st-machine/types";
import StateMachine from "../../st-machine";

const stateMap: MStateMap = {
  initial: "red",
  states: [
    {
      name: "red",
      initial: "walk",
      states: [
        {
          name: "walk",
          transitions: [{ action: "tick", response: "stop" }]
        },
        {
          name: "stop",
          transitions: [{ action: "tick", response: "wait" }]
        },
        {
          name: "wait",
          transitions: [{ action: "tick", response: "green" }]
        }
      ]
    },
    {
      name: "green",
      transitions: [
        {
          action: "tick",
          response: "yellow"
        }
      ]
    },
    {
      name: "yellow",
      transitions: [
        {
          action: "tick",
          response: "red"
        }
      ]
    }
  ]
};

const Machine = new StateMachine(stateMap);

@Component({
  tag: "demo-traffic-light",
  styleUrl: "demo-traffic-light.css"
})
export class DemoTrafficLight {
  @State() mState: MState;
  ticker;

  componentWillLoad() {
    Machine.subscribe(this);
  }

  componentDidLoad() {}

  render() {
    let red = "light red";
    let yellow = "light yellow";
    let green = "light green";
    let signalImgSrc = "/assets/signal_dont.png";

    switch (Machine.current.name) {
      case "yellow":
        yellow += " on";
        break;
      case "green":
        green += " on";
        break;
      case "walk":
        signalImgSrc = "/assets/signal_walk.png";
        break;
      case "stop":
        signalImgSrc = "/assets/signal_stop.png";
        break;
      case "wait":
        signalImgSrc = "/assets/signal_dont.png";
        break;
    }

    if (Machine.pathIncludes("red")) {
      red += " on";
    }

    return (
      <div>
        <app-machine-status machine={Machine} />
        <div class="card">
          <div class={red} />
          <div class={yellow} />
          <div class={green} />
          <img src={signalImgSrc} />
        </div>
        <div class="card machine-controls">
          <button
            onClick={() => {
              Machine.dispatch("tick");
            }}
          >
            Tick
          </button>
        </div>
        <div class="card machine-undo-redo">
          <p class="label">History</p>
          <button onClick={Machine.undo}>Undo</button>
          <button onClick={Machine.redo}>Redo</button>
        </div>
      </div>
    );
  }
}
