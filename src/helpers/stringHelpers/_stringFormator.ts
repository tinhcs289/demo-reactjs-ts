export default function stringFormator(...fns: Array<(str: string) => string>) {
  return fns.reduceRight((f, g) => (t) => f(g(t)));
}
