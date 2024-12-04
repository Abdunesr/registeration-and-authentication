import { useReducer } from "react";
const initialState = { count: 0, userInput: "" };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "userInput":
      return { ...state, userInput: action.payload };
    default:
      throw new Error();
  }
};

export default function Userreducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      count: {state.count}{" "}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <input
        type="text"
        onChange={(e) =>
          dispatch({ type: "userInput", payload: e.target.value })
        }
      />
      username : {state.userInput}
    </div>
  );
}
