export interface ITodo {
  id: number;
  isCompleted?: boolean;
  todo?: string;
}

export type Optional<T> = {
  [P in keyof T]?: T[P];
};
