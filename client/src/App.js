import React from 'react';
import './App.css';

import Login from './components/Login';
import SignUp from './components/SignUp';

import { Provider} from 'react-redux';
import store from './redux/store';

import PrivateRoute from './components/PrivateRoute';
import LoadingOverlay from 'react-loading-overlay';
import Loader from './components/Loader';

import {
  Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import styled from 'styled-components';

import Header from './components/Header';
import {history} from "./history";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";




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
        <Provider store={store}>

          <App>
            <Loader />
            <Router history={history}>
              <Header />
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={SignUp} />
                  <PrivateRoute path="/home">
                    <BurgerBuilder />
                  </PrivateRoute>
                  <Redirect to="/home" />
                </Switch>
            </Router>
          </App>
      </Provider>
    )
  }
  
}



export default App;
