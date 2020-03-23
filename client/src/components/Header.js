import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import {compose} from 'redux';
import {connect} from "react-redux";
import {logoutUser} from "../redux";



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



const Header = (props) => {
  const classes = useStyles();

  const logout = () =>{
    console.log('logout');
    props.logoutUser();
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Burger Builder
          </Typography>
          {!props.user.loggedIn ?
              <Button color="inherit" onClick={() => props.history.push('/login')}>Login</Button> : <Button color="inherit" onClick={() => logout()}>Logout</Button>

          }


        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
};

// export default compose(connect(),withRouter(Header));
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Header);

