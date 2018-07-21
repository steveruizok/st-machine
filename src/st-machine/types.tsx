export interface MTransition {
  action: string;
  response: string;
}

export interface MSubscriber {
  ref: any;
  prop: string;
}

export interface MState {
  name: string;
  transitions: MTransition[];
  states?: MState[];
  path?: MState[];
}

export interface MStateMap {
  initial: string;
  payload?: any;
  states: MState[];
}

export interface MStep {
  state: MState;
  payload: any;
  date: Date;
  duration: number;
}
