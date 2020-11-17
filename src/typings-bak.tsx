export interface ReactHTML { div: HTMLDivElement,span:HTMLSpanElement }

export type ReactText = string | number;
export type ReactChild = ReactElement | ReactText;
export type ReactNode = ReactChild | boolean | null | undefined;

export interface DOMElement<P extends HTMLAttributes<T>, T extends Element> extends ReactElement<P, string> {}

export interface DetailedReactHTMLElement<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMElement<P, T> {
  type: keyof ReactHTML;
}
export type Key = string | number;

export interface Attributes {
  key?: Key;
}
export interface ClassAttributes<T> extends Attributes {}
export interface DOMAttributes<T> {
  children?: ReactNode;
}
export interface HTMLAttributes<T> extends DOMAttributes<T> {
  className?: string;
}
export interface Element { }
export interface HTMLElement extends Element { }

type ComponentState = any;
declare class Component<P, S> {
  setState(state: S): void;
  render(): ReactNode;
}
export type JSXElementConstructor<P> = ((props: P) => ReactElement | null);
interface ComponentClass<P = {}, S = ComponentState> {
  new(props: P): Component<P, S>;
}
export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string> {
  type: T;
  props: P;
}
type PropsWithChildren<P> = P & { children?: ReactNode };
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>): ReactElement | null;
}
export declare function createElement<P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | string,
  props?: Attributes & P | null,
  ...children: ReactNode[]): ReactElement<P>;