import { LetterPosition } from "./type";

const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

export const initialState: Record<string, LetterPosition> = isMobile
  ? {
      a: { x: 10, y: 10 },
      s: { x: 10, y: 270 },
      t: { x: 10, y: 530 },
      n: { x: 270, y: 10 },
      a2: { x: 270, y: 270 },
      i: { x: 270, y: 530 },
    }
  : {
      a: { x: 0, y: 175 },
      s: { x: 200, y: 175 },
      t: { x: 400, y: 175 },
      n: { x: 600, y: 175 },
      a2: { x: 800, y: 175 },
      i: { x: 1000, y: 175 },
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
