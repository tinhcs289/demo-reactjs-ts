function wait(time: number = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
export default wait;
