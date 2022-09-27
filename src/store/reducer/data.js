const initState = {
  list: [],
  currency:["$"]
};

const data = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }
    case 'SET_CURRENCY': {
      return {
        ...state,
        currency: [action.payload]
      };
    }
    case "REMOVE_ITEM": {
      const copyRows = Array.from(state.list)
      const objWithIdIndex = copyRows.findIndex((list) => list.id === action.payload.id);
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

// const todo = (state = initState, action) => {
//   if (action.type === 'ADD_TODO') {
//     return { ...state, list: [...state.list, action.payload] };
//   } else if (action.type === 'SET_CURRENCY') {
//     return { ...state, currency: [action.payload] }
//   } else if (action.type === 'REMOVE_ITEM') {
//       if(state.list.count !== 1 ){
//     return { ...state, list: state.list.filter((item) => item.id !== action.payload.id,console.log(action.payload.id))}
//   }else {
//     return state;
//   }
// };
// }