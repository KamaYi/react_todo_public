// App.jsx
import React, { Component, PureComponent,memo } from 'react';

//子组件
class Foo extends PureComponent<any, any> {
  //   shouldComponentUpdate(nextProps: { name: any; },nextState: any){
  //     if(nextProps.name === this.props.name){
  //         return false;
  //     }
  //     return true;
  // }
  render() {
    console.log('foo render');
    return null;
  }
}

//父组件
class App extends Component<any, any> {
  state = {
    count: 0,
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>sdsdsd</button>
        <Foo name="Milk" />
      </div>
    )

  }
}
export default App