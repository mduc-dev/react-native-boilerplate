import { Icon } from '@baronha/ting';

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> =
  | TValue
  | ValueFunction<TValue, TArg>;

export type CustomOption = {
  icon: Icon;
  duration?: number;
};
