function wait(time: number = 300) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
export default wait;
