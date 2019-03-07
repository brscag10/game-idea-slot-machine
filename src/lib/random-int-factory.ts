export default function randomIntFactory(max: number, min: number = 0): () => number {
  return () => Math.round(Math.random() * (max - min)) + min;
}
