export interface CounterType {
  count: number;
}

export type CounterAction = { type: "INCREMENT" } | { type: "DECREMENT" };
