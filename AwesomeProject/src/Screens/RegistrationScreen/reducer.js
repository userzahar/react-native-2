export const reducer = (state, action) => {
  switch (action.type) {
    case "BLUR":
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          borderColor: "#FF6C00",
        },
      };
    case "UNBLUR":
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          borderColor: "#E8E8E8",
        },
      };
    case "CHANGE":
      return {
        ...state,
        [action.payload.index]: {
          // ...state[action.payload],
          value: action.payload.value,
        },
      };
    default:
      return state;
  }
};
