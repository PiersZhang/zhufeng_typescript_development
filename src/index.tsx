import * as React from 'react';
import * as ReactDOM from 'react-dom';
let root: HTMLElement | null = document.getElementById('root');
interface Props {
  className: string
}
let props: Props = { className: 'title' };
let element: React.DetailedReactHTMLElement<Props, HTMLDivElement> = (
  React.createElement<Props, HTMLDivElement>('div', props, 'hello')
)
ReactDOM.render(element, root);