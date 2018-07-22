import { Component, State } from "@stencil/core";

import Machine from "../../machine";
import { MState } from "../../st-machine/types";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  @State() mState: MState;

  componentWillLoad() {
    Machine.subscribe(this);
  }

  render() {
    return (
      <div>
        <app-machine-status machine={Machine} />
        <div class="card machine-controls">
          <p class="label">Controls</p>
          <button
            onClick={() => {
              Machine.dispatch("turn on", "We're turning on.");
            }}
            disabled={Machine.wontRespondTo("turn on")}
          >
            Turn on
          </button>
          <button
            onClick={() => {
              Machine.dispatch("turn off", "Switched everything off.");
            }}
            disabled={Machine.wontRespondTo("turn off")}
          >
            Turn off
          </button>
          <button
            onClick={() => {
              Machine.dispatch("relax", "Cooling off.");
            }}
            disabled={Machine.wontRespondTo("relax")}
          >
            Relax
          </button>
          <button
            onClick={() => {
              Machine.dispatch("turbo", "Going turbo!");
            }}
            disabled={Machine.wontRespondTo("turbo")}
          >
            Turbo
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
