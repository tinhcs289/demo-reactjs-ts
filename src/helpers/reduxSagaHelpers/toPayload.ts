const toPayload = <T extends { [x: string]: any }>(data: T) => ({ payload: data || {} });
export default toPayload;
