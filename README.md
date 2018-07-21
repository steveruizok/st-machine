# st-machine

Handle component logic with clever state machines.

A very early build, built on StencilJS.

[Demo](http://st-machine.firebaseapp.com/)

From [@steveruizok](http://twitter.com/steveruizok)

# Installation

(npm package inabit)

# Usage

## 1. Create your state map.

```typescript
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
      transitions: [
        {
          action: "turn off",
          response: "off"
        }
      ]
    }
  ]
};
```

## 2. Create a StateMachine instance.

```typescript
const Machine = new StateMachine(states);
```

StateMachines may accept an optional second argument: a callback function to be fired whenever the Machine changes its state.

```typescript
const Machine = new StateMachine(states, function(newState) {
  console.log(newState);
});
```

## 3. Subscript your components to your StateMachine instance.

When a machine changes states, it will set a property on all of its subscribers. By default, this property is `mState`. To make a component reactive to this change, make `mState` a component State (or an editable Prop).

```typescript
import Machine from "machine";
@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  @State() mState;

  componentWillLoad() {
    Machine.subscribe(this);
	}
```

You can change the property name by passing a string to `Machine.subscribe` as the second argument.

```typescript
import Machine from "machine";
@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  @State() myMachineState;

  componentWillLoad() {
    Machine.subscribe(this, "myMachineState");
	}
```

## 4. Dispatch actions to the Machine.

Each of a machine's state has a list of transitions, which are made up of `action`s and `response`s. If the machine recieves a dispatched action and that action is included in its list of transitions, the machine will change state according to that transition's response.

If the action does not appear on the machine's current state's transitions, and the state is a "child" of a different state, the machine will check up the current state's path, searching at each level for a transition that responds to the dispatched action. If it finds a responsive transition, it will follow that transition's response. If it runs out of "parent" states without finding a responsive transition, the machine will ignore the dispatched action.

In this way, the Machine is responsible for deciding whether and how to respond to a given action. Interface elements are therefore free to dispatch actions to the Machine regardless of whether the Machine will respond to them. The machine is smart, so the buttons can be dumb.

```jsx
render() {
	return (
		<div>
			<button onClick={() => {Machine.dispatch("turn on")}}>
			Turn On
			</button>

			<button onClick={() => {Machine.dispatch("turn off")}}>
			Turn Off
			</button>
		</div>
```

Dispatched actions can also include data, called the dispatch's `payload`. This data will be part of the object broadcast to subscribers, and accessible at any time through `Machine.current.payload`.

```jsx
render() {
	return (
		<div>
			<input type="text" ref={el=>{this.myInput = el}}/>
			<button onClick={() => {Machine.dispatch("submit", this.myInput.value)}}>
			Submit
			</button>
		</div>
```

## 5. Change rendering depending on the Machine's state.

While interface elements don't need any logic to determine whether they dispatch actions, they may want to render differently depending on whether the machine will respond. A Machine has several useful hooks for helping with this presentation.

```jsx
render() {

	let turnoff;

	if (Machine.willRespondTo("turn off") {
		turnoff = (
			<button
				onClick={() => {Machine.dispatch("turn off")}}
			>
			Turn off
			</button>
		)
	})

	return(
		<div>
			<button
				onClick={() => {Machine.dispatch("turn on");}}
				disabled={Machine.wontRespondTo("turn on")}
			>
			{turnoff}
		</div>
	)
}
```

Other options are `Machine.is` and `Machine.isnt`, which will check against the Machine's current state name.

## 6. Move backward and forward in the Machine's history.

Machines have a history of all previous states, along with their data payload,the time entered into the state, and the duration of time spent in the state. The machine may move back in its history and forward through `Machine.undo` and `Machine.redo`. As with most undo/redo implementations, a new action that occurs at a prior point in the machine's history will begin a new history from that point.

```jsx
render() {

	return(
		<div>
			<button onClick={Machine.undo}>Undo</button>
			<button onClick={Machine.redo}>Redo</button>
		</div>
	)
}
```

# Documentation

Better documentation to follow!

# Demo

[Demo](http://st-machine.firebaseapp.com/)
