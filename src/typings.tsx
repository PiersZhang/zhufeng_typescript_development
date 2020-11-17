export interface DOMAttributes {
  children?: ReactNode;
}
export interface HTMLAttributes extends DOMAttributes {
  className?: string;
}

export interface ReactElement<P = any> {
  type: string;
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

export declare function createElement<P extends {}>(
  type: string,
  props?: P,
  ...children: ReactNode[]): ReactElement;