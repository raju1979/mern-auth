import React, { useState, useEffect, useCallback } from 'react';

import {connect} from 'react-redux';
import {fetchUser} from '../redux';
import {compose} from 'redux'

import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { spacing } from '@material-ui/system';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const LoginWrapper = styled.section`
            width: 300px;
            min-height: 400px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
        `;

const Form = styled.section`
            width: 100%;
            padding: 10px;
        `;

const styles = theme => ({
  buttonPadding: {
    padding: '30px',
  },
  inputMargin: {
    margin: '5px'
  }
});


const Login = (props) => {

  // console.log(props)

  const { classes } = props;
  const [login, setLogin] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const changeTextHandler = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  };

  const onSubmit = (e) => {
    console.log('submitted', login);
    // props.history.push('/home');
    // useEffect(() => {
    //   fetchUser({})
    // });
    props.fetchUser(login)
    e.preventDefault();
  }

  return (
    <LoginWrapper>
      <Paper elevation={3} square>
        <Form>
          <form onSubmit={onSubmit}>
              <TextField
                className={classes.inputMargin}
                id="outlined-basic"
                label="email"
                variant="outlined"
                type="email"
                name="email"
                value={login.email}
                onChange={changeTextHandler}
              />
            <TextField
              className={classes.inputMargin}
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              name="password"
              value={login.password}
              onChange={changeTextHandler}
            />
            <Box display="flex" width="75%" className={classes.inputMargin} justifyContent="flex-start">
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            </Box>
          </form>
        </Form>
      </Paper>
    </LoginWrapper>
  )


};

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchUser: (user) => dispatch(fetchUser(user))
  }
};

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Login);
