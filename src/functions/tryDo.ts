/**
 * An elegant wait to do async/await
 * @example 
   const [error] = await tryDo(wait, 1000);
   if (error) {
     console.log(error);
   }
   // do next
 * @example 
   const [error, result] = await tryDo(getUser, userId);
   if (error) {
     console.log(error);
   }
   // do next with result
 */
async function tryDo<T>(
  prom: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<[null, T] | [unknown, null]> {
  try {
    const result = await prom(...args);
    return [null, result as T];
  } catch (error) {
    return [error, null];
  }
}
export default tryDo;
