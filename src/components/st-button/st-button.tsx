import { Component } from "@stencil/core";

@Component({
  tag: "st-button",
  styleUrl: "st-button.css"
})
export class StButton {
  render() {
    let hex = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return (
      <div>
        <span style={{ background: hex }}>Hello world</span>
      </div>
    );
  }
}
