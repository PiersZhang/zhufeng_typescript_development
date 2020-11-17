import * as React from 'react';
import * as ReactDOM from 'react-dom';
let root: HTMLElement | null = document.getElementById('root');
interface Attributes {
  className: string
}
let props: Attributes = { className: 'title' };
let element = React.createElement<Attributes, HTMLDivElement>('div', props, 'hello');
ReactDOM.render(element, root);