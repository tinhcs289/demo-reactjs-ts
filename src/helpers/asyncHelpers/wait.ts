export default function wait(time: number = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
