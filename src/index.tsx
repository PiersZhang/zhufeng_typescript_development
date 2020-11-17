import * as React from 'react';
import * as ReactDOM from 'react-dom';
let root: HTMLElement | null = document.getElementById('root');
interface Props {
  className: string
}
interface State {
  count:number
}
class Welcome extends React.Component<Props, State> {
  state = { count: 0 }
  render():React.DetailedReactHTMLElement<Props, HTMLDivElement> {
    return React.createElement<Props, HTMLDivElement>('div', this.props, this.state.count);
  }
}
let props: Props = { className: 'title' };
let element = (
  React.createElement<Props>(Welcome, props)
)
ReactDOM.render(element, root);