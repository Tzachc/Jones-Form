import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import "./App.css";
import Form from "./Form";

injectTapEventPlugin();

class App extends Component {
  
  onChange = updatedValue => {
    this.setState({
      fields: {
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form onChange={fields => this.onChange(fields)} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
