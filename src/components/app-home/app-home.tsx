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
        <p>
          Current state: <b>{Machine.current.name}</b>
        </p>
        <p>
          Current path:{" "}
          <b>{Machine.current.path.map(p => p.name).join(" > ")}</b>
        </p>
        <p>
          Current payload: <b>{Machine.current.payload}</b>
        </p>
        <p>
          Set on: <b>{Machine.current.date.toLocaleString()}</b>
        </p>
        <p>
          Duration: <b>{Machine.current.duration}</b>
        </p>

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

        <div>
          <button onClick={Machine.undo}>Undo</button>
          <button onClick={Machine.redo}>Redo</button>
        </div>

        <div class="app-home">
          <stencil-route-link url="/profile/stencil">
            <button>Profile page</button>
          </stencil-route-link>
        </div>
      </div>
    );
  }
}
