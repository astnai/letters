import { LetterPosition } from "./type";

const isMobile = window.innerWidth <= 768;

export const initialState: Record<string, LetterPosition> = isMobile
  ? {
      a: { x: 10, y: 10 },
      s: { x: 10, y: 170 },
      t: { x: 10, y: 330 },
      n: { x: 170, y: 10 },
      a2: { x: 170, y: 170 },
      i: { x: 170, y: 330 },
    }
  : {
      a: { x: 0, y: 200 },
      s: { x: 200, y: 200 },
      t: { x: 400, y: 200 },
      n: { x: 600, y: 200 },
      a2: { x: 800, y: 200 },
      i: { x: 1000, y: 200 },
    };

type Action =
  | { type: "MOVE_LETTER"; payload: { name: string; position: LetterPosition } }
  | { type: "RESET" };

export const letterReducer = (
  state: typeof initialState,
  action: Action
): typeof initialState => {
  switch (action.type) {
    case "MOVE_LETTER":
      return {
        ...state,
        [action.payload.name]: action.payload.position,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
