export interface ReactElement<P = any, T extends string=string> {
  type: T;
  props: P;
}

export type ReactText = string | number;
export type ReactChild = ReactElement | ReactText;
export type ReactNode = ReactChild | boolean | null | undefined;

export declare function createElement<P extends {}>(
  type: string,
  props?: P,
  ...children: ReactNode[]): ReactElement<P>;