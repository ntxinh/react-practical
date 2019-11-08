import React from 'react';
import styles from './style.css';
import FacebookIcon from './Icons/Facebook.js';

const App = ({ title }) =>
  <div className={styles.title}>
    <FacebookIcon width="40px" height="40px" />
    {title}
  </div>;

export default App;