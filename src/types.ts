type Pretty<T extends {}> = {
  [I in keyof T]: T[I];
} & {};

export type RequireKeys<T extends object, K extends keyof T> = Required<
  Pick<T, K>
> &
  Omit<T, K> extends infer O
  ? O extends {}
    ? Pretty<O>
    : never
  : never;

export type AnimationPropsOptinal = {
  delay?: number;
};

export type AnimationProps = {
  duration?: number;
  animation?: (input: number) => number;
} & AnimationPropsOptinal;

export type PlayAnimationProp = {
  from: number;
  to: number;
};
