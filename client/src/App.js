import React from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './components/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import Header from './components/Header';

const Home = () => {
  return(
    <div>Home</div>
  )
}
const About = () => {
  return(
    <div>About</div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  useStyles = () => makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100vh'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  

  render() {

    const App = styled.section`
      width: 100%;
      height: 100vh;
      background: #dedede;
      overflow: hidden;
      overflow-y: auto;
    `
    
    const classes = this.useStyles();
    return (
      <App>
        <Router>
          <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
      </App>
    );
  }
  
}

export default App;
