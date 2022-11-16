const createAction =
  <T extends { [x: string]: any }>(type: string) =>
  (payload: T) => ({ type, payload });
export default createAction;
