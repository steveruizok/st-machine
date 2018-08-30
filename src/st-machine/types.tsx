export interface MTransition {
  action: string;
  response: string;
}

export interface MSubscriber {
  ref: any;
  prop: string;
}

export interface MState {
  id: string;
  initial?: string;
  transitions?: MTransition[];
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

// {
//   initial: "off",
//   states: [
//     {
//       id: "off",
//       states: [
//         {
//           id: "default",
//           transitions: [{ action: "hover", response: "hovered" }]
//         },
//         {
//           id: "hovered",
//           transitions: [
//             { action: "unhover", response: "off" },
//             { action: "click", response: "on.hovered" }
//           ]
//         }
//       ]
//     },
//     {
//       id: "on",
//       states: [
//         {
//           id: "default",
//           transitions: [{ action: "hover", response: "hovered" }]
//         },
//         {
//           id: "hovered",
//           transitions: [
//             { action: "unhover", response: "on" },
//             { action: "click", response: "off.hovered" }
//           ]
//         }
//       ]
//     }
//   ]
// };

// {
//   "id": "root",
//   "states": {
//     "My Awesome Sketch": {
//       "id": "My Awesome Sketch",
//       "states": {
//         "First State": {
//           "id": "First State",
//           "states": {},
//           "on": { "some event": "#Second State" }
//         },
//         "Second State": { "id": "Second State", "states": {} }
//       },
//       "initial": "First State",
//       "on": {}
//     }
//   },
//   "initial": "My Awesome Sketch",
//   "on": {}
// }

// interface NStateMap {
//   [key: string]: any;
// }

// interface NActionMap {
//   [key: string]: any;
// }

// interface NState {
//   id: string;
//   initial?: string;
//   states?: NStateMap;
//   on?: NActionMap;
// }
