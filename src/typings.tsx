export interface DOMAttributes {
  children?: ReactNode;
}
export interface HTMLAttributes extends DOMAttributes {
  className?: string;
}
export type JSXElementConstructor<P> =  
| ((props: P) => ReactElement | null)
| (new (props: P) => Component<P, any>);

export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string> {
  type: T;
  props: P;
}
export interface DOMElement extends ReactElement{}
export interface ReactHTML { div:  HTMLDivElement }
export interface DetailedReactHTMLElement extends DOMElement{
  type: keyof ReactHTML;
}

export type ReactText = string | number;
export type ReactChild = ReactElement | ReactText;
export type ReactNode = ReactChild | boolean | null | undefined;

type PropsWithChildren<P> = P & { children?: ReactNode };
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>): ReactElement | null;
}
interface FunctionComponentElement<P> extends ReactElement<P, FunctionComponent<P>> {}

type ComponentState = any;
declare class Component<P, S> {
  setState(state: any): void;
  render(): ReactNode;
}
interface ComponentClass<P = {}, S = ComponentState> {
  new(props: P): Component<P, S>;
}
interface ComponentElement<P> extends ReactElement<P, ComponentClass<P>> {}
export declare function createElement<P extends {}>(
  type:  ComponentClass<P>,
  props?: P,
  ...children: ReactNode[]): ComponentElement<P>;
export declare function createElement<P extends {}>(
  type: FunctionComponent<P>,
  props?: P,
  ...children: ReactNode[]): FunctionComponentElement<P>;
export declare function createElement<P extends {}>(
  type: string,
  props?: P,
  ...children: ReactNode[]): ReactElement;