export default function randomIntFactory(int: number): () => number {
  return () => Math.round(Math.random() * int);
}
