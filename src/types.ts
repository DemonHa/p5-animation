type Pretty<T extends {}> = {
  [I in keyof T]: T[I];
} & {};

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K> extends infer O
  ? O extends {}
    ? Pretty<O>
    : never
  : never;

type AnimationPropsOptional = {
  delay?: number;
};

export type AnimationProps = Partial<{
  duration: number;
  animation: (input: number) => number;
}> &
  AnimationPropsOptional;

type AnimationValues = {
  from: number;
  to: number;
};

export type PlayAnimationProps<D extends {}> = RequireKeys<
  AnimationProps,
  keyof Omit<AnimationProps, keyof D | keyof AnimationPropsOptional>
> &
  AnimationValues;

export type RunTimeAnimationProps = RequireKeys<
  AnimationProps,
  keyof Omit<AnimationProps, keyof AnimationPropsOptional>
>;
