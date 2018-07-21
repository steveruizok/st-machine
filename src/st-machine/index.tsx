import { MState, MStateMap, MSubscriber, MStep, MTransition } from "./types";

// TODO:
// substate history

// State Machine

export default class StateMachine {
  private states: MState[];
  private subscribers: MSubscriber[] = [];
  private history: MStep[] = [];
  private hIndex: number = 0;
  private changeTime: Date = new Date();
  private onChange: any;

  // @constructor
  // Store stateMap states and set the machine's initial point in history.
  constructor(stateMap: MStateMap, onChange?: Function) {
    // Store the onChange callback.
    this.onChange = onChange;

    // Create a path (a state tree) for each state
    function setPath(state: MState, path: MState[]) {
      state.path = path;

      if (!state.states) {
        return;
      }

      state.states.forEach(s => {
        setPath(s, [...path, s]);
      });
    }

    stateMap.states.forEach(s => {
      setPath(s, [s]);
    });

    // store stateMap's pathed states as own states property
    this.states = stateMap.states;

    // get our initial state
    const initial = stateMap.initial
      ? this.states.find(s => s.name === stateMap.initial)
      : this.states[0];

    if (!initial) {
      throw new Error(
        `Could not find a state with that name (${stateMap.initial}`
      );
    }

    // start the history array
    this.history = [
      ...this.history,
      {
        state: initial,
        payload: stateMap.payload,
        date: this.changeTime,
        duration: 0
      }
    ];

    if (this.onChange) {
      this.onChange(this.history[this.hIndex]);
    }
  }

  // ---------------
  // Public Methods
  // ---------------

  // @method subscribe
  // Add an object to this StateMachine's subscribers.
  //
  // @param subscriber: any - The subscriber object.
  // @param prop: string - The property to set when notifying this subscriber.
  public subscribe = (subscriber: any, prop: string = "mState") => {
    if (this.subscribers.includes(subscriber)) {
      throw "Attempted to subscribe an existing subscriber.";
    }

    const mSubscriber = {
      ref: subscriber,
      prop: prop
    };

    this.subscribers = [...this.subscribers, mSubscriber];
    mSubscriber.ref[prop] = this.current;
  };

  // @method unsubscribe
  // Remove an object from this StateMachine's subscribers.
  //
  // @param subscriber: any - The subscriber object.
  public unsubscribe = (subscriber: any) => {
    if (!this.subscribers.includes(subscriber)) {
      throw "Attempted to unsubscribe a non-subscriber.";
    }

    this.subscribers = this.subscribers.filter(s => s.ref !== subscriber);
  };

  // @method dispatch
  // Handle an dispatched action from a subscriber, finding a valid transition in
  // the current path's state tree, and ignoring dispatches for actions
  // that aren't found in the current path's state tree.
  //
  // @param action: string - The name of the action.
  // @param payload: any - The data attached to the dispatch.
  public dispatch = (action: string, payload?: any) => {
    const stateTree = this.current.path.slice().reverse();

    let foundTransition;

    for (let state of stateTree) {
      let result = state.transitions.find(t => t.action === action);

      if (!result) {
        continue;
      }

      foundTransition = result;
      break;
    }

    // Ignore dispatches for actions that aren't included
    // in the current state's transitions.
    if (!foundTransition) {
      return;
    }

    this.setState(foundTransition, payload);
  };

  // @method willRespondTo
  // Returns true if the machine's current state will respond to any of one or more actions.
  //
  // @param actionNames: string|string[] - The action name(s) to check.
  public willRespondTo = (actionNames: string | string[]) => {
    if (!Array.isArray(actionNames)) {
      actionNames = [actionNames];
    }

    let validActions = this.getValidActions();

    for (let actionName of actionNames) {
      if (validActions.includes(actionName)) {
        return true;
      }
    }

    return false;
  };

  // @method wontRespondTo
  // Returns false if the machine's current state will respond to any of one or more actions.
  //
  // @param actionNames: string|string[] - The action name(s) to check.
  public wontRespondTo = (actionNames: string | string[]) => {
    if (!Array.isArray(actionNames)) {
      actionNames = [actionNames];
    }

    let validActions = this.getValidActions();

    for (let actionName of actionNames) {
      if (validActions.includes(actionName)) {
        return false;
      }
    }

    return true;
  };

  // @method isnt
  // Returns false if the machine's current state name is any of one or more values.
  //
  // @param stateNames: string|string[] - The state name(s) to check.
  public isnt = (stateNames: string | string[]) => {
    if (!Array.isArray(stateNames)) {
      stateNames = [stateNames];
    }

    for (let stateName of stateNames) {
      if (this.current.name === stateName) {
        return false;
      }
    }

    return true;
  };

  // @method is
  // Returns true if the machine's current state name is any of one or more values.
  //
  // @param stateNames: string|string[] - The state name(s) to check.
  public is = (stateNames: string | string[]) => {
    if (!Array.isArray(stateNames)) {
      stateNames = [stateNames];
    }

    for (let stateName of stateNames) {
      if (this.current.name === stateName) {
        return true;
      }
    }

    return false;
  };

  // @getter current
  // Get the machine's current state name.
  get current() {
    let current = this.history[this.hIndex];

    if (!current) {
      return null;
    }

    return { ...current, name: current.state.name, path: current.state.path };
  }

  // @getter current
  // Get the machine's current state name.
  get historyIndex() {
    return this.historyIndex;
  }

  // @method Undo
  // Go back one step in the Machine's history.
  undo = () => {
    this.goToHistoryIndex(-1);
  };

  // @method Redo
  // Go forward one step in the Machine's history.
  redo = () => {
    this.goToHistoryIndex(1);
  };

  // --------------
  // Private Methods
  // --------------

  // @method getValidActions
  // Return an array of the actions that the current state will respond to.
  private getValidActions = () => {
    let validActions = [];

    this.current.path.forEach(state => {
      state.transitions.forEach(t => {
        validActions = [...validActions, t.action];
      });
    });

    return validActions;
  };

  // @method goToHistoryIndex
  // Move to a history state, without mutating history.
  //
  // @param change: number - The relative number of steps to move forward or backward.
  private goToHistoryIndex = (change: number) => {
    let newIndex = this.hIndex + change;

    if (newIndex < 0) {
      newIndex = 0;
    } else {
      if (newIndex > this.history.length - 1) {
        newIndex = this.history.length - 1;
      }
    }

    if (newIndex === this.hIndex) {
      return;
    }

    this.changeTime = new Date();
    this.hIndex = newIndex;
    this.notifySubscribers();
  };

  // @method getState
  // Locate a state, given the state's name.
  //
  // @param stateName: string - The name of the state.
  private getState = (stateName: string) => {
    let foundState;
    const stateTree = this.current.path.slice().reverse();

    // At each state in the state tree, look for a state named stateName.
    for (let state of stateTree) {
      if (!state.states) {
        continue;
      }

      let found = state.states.find(s => s.name === stateName);

      if (!found) {
        continue;
      }

      foundState = found;
      break;
    }

    // If we couldn't find a state in the stateTree, search again
    // at the root level.
    if (!foundState) {
      foundState = this.states.find(s => s.name === stateName);
    }

    // And if we still haven't found one, throw an error, because
    // that state doesn't exist anywhere in the tree.
    if (!foundState) {
      throw new Error("Could not find a state with that name.");
    }

    // If the new state has states of its own, change to the initial
    // state -- or, if not specified, to the first state in the
    // states array.
    if (foundState.states) {
      foundState = foundState.initial
        ? foundState.states.find(s => s.name === foundState.initial)
        : foundState.states[0];
    }

    return foundState;
  };

  // @method setState
  // Set a new state, based on the dispatched transition.
  //
  // @param transition: MTransition - The action/response dispatched.
  // @param payload: any - The data attached to the dispatch.
  private setState = (transition: MTransition, payload: any) => {
    const nextState = this.getState(transition.response);

    const newDate = new Date();
    this.history[this.hIndex].duration =
      newDate.getTime() - this.changeTime.getTime();

    this.changeTime = new Date();
    this.hIndex++;

    this.history = [
      ...this.history.slice(0, this.hIndex),
      {
        state: nextState,
        payload: payload,
        date: newDate,
        duration: 0
      }
    ];

    this.notifySubscribers();
  };

  // @method notifySubscribers
  // Alert all subscribers that the machine's state has changed.
  private notifySubscribers = () => {
    this.subscribers.forEach(subscriber => {
      subscriber.ref[subscriber.prop] = this.current;
    });

    if (this.onChange) {
      this.onChange(this.history[this.hIndex]);
    }
  };
}
