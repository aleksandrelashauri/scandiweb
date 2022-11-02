const initState = {
  list: [],
  currency: ["$"],
};

const data = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }
    case "SET_CURRENCY": {
      return {
        ...state,
        currency: [action.payload],
      };
    }
    case "REMOVE_ITEM": {
      const copyRows = Array.from(state.list);
      const objWithIdIndex = copyRows.findIndex(
        (list) => list.id === action.payload.id
      );
      copyRows.splice(objWithIdIndex, 1);
      return {
        ...state,
        list: copyRows,
      };
    }
    default:
      return state;
  }
};
export default data;
