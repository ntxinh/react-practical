import React, { Component } from 'react';
import { ThemeProvider, withStyles, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import styles from './styles'
import Taskboard from './../Taskboard';
import { Provider } from 'react-redux';
import configureStore from './../../redux/configureStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from './../../components/GlobalLoading'
import MyModal from './../../components/MyModal';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <GlobalLoading />
          <MyModal />
          <Taskboard />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withStyles(styles)(App);
