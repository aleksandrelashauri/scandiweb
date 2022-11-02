export const addItem = (payload) => ({ type: "ADD_ITEM", payload: payload });
export const removeItem = (payload) => ({
  type: "REMOVE_ITEM",
  payload: payload,
});
export const setCurrency = (payload) => ({
  type: "SET_CURRENCY",
  payload: payload,
});
