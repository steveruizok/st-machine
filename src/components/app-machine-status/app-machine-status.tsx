import { Component, Prop, State } from "@stencil/core";
import { MState } from "../../st-machine/types";

@Component({
  tag: "app-machine-status",
  styleUrl: "app-machine-status.css"
})
export class AppMachineStatus {
  @Prop() machine: any;
  @State() mState: MState;

  componentWillLoad() {
    this.machine.subscribe(this);
  }
  render() {
    return (
      <div class="card machine-status">
        <p class="label">Current State</p>
        <p>
          Current state: <b>{this.machine.current.name}</b>
        </p>
        <p>
          Current path:{" "}
          <b>{this.machine.current.path.map(p => p.name).join(" > ")}</b>
        </p>
        <p>
          Current payload: <b>{this.machine.current.payload}</b>
        </p>
        <p>
          Set on: <b>{this.machine.current.date.toLocaleString()}</b>
        </p>
        <p>
          Duration: <b>{this.machine.current.duration}</b>
        </p>
      </div>
    );
  }
}
