import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "Sin titulo"
    };
  }

  componentDidMount() {
    console.log('DidMount');
    setTimeout(() => {
      this.setState({
        title: "Mi aplicación de React !!!!!"
      })  
    }, 5000);
  }

  componentDidUpdate() {
    console.log('Updated');
  }

  updateTitle(text) {
    this.setState({
      title: text
    });
  }

  render() {
    console.log('Renderized');
    return (
      <h1 
        onMouseOver={() => this.updateTitle('over')}
        onMouseOut={() => this.updateTitle('out')}>
          { this.state.title }
      </h1>
    )
  }
}

export default App;