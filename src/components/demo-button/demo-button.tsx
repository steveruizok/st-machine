import { Component, State } from "@stencil/core";
import { MStateMap, MState } from "../../st-machine/types";
import StateMachine from "../../st-machine";

const stateMap: MStateMap = {
  initial: "off",
  states: [
    {
      id: "off",
      states: [
        {
          id: "default",
          transitions: [{ action: "hover", response: "hovered" }]
        },
        {
          id: "hovered",
          transitions: [
            { action: "unhover", response: "off" },
            { action: "click", response: "on.hovered" }
          ]
        }
      ]
    },
    {
      id: "on",
      states: [
        {
          id: "default",
          transitions: [{ action: "hover", response: "hovered" }]
        },
        {
          id: "hovered",
          transitions: [
            { action: "unhover", response: "on" },
            { action: "click", response: "off.hovered" }
          ]
        }
      ]
    }
  ]
};

const Machine = new StateMachine(stateMap);

@Component({
  tag: "demo-button",
  styleUrl: "demo-button.css"
})
export class DemoButton {
  @State() mState: MState;

  componentWillLoad() {
    Machine.subscribe(this);
  }

  render() {
    let classes = "";

    if (Machine.is("hovered")) {
      classes += " hovered";
    }

    if (Machine.pathIncludes("on")) {
      classes += " on";
    }

    return (
      <div>
        <app-machine-status machine={Machine} />
        <div class="card machine-controls">
          <button
            class={classes}
            onMouseEnter={() => {
              Machine.dispatch("hover");
            }}
            onMouseLeave={() => {
              Machine.dispatch("unhover");
            }}
            onClick={() => {
              Machine.dispatch("click");
            }}
          >
            Get started!
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
