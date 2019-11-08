import React from 'react';
import styles from './style.scss';
import FacebookIcon from './assets/icons/Facebook.svg';
import MyImage from './assets/images/myimage.jpg';

const App = ({ title }) => (
  <div className={styles.title}>
    <FacebookIcon width="40px" height="40px" />
    <img width="100" height="100" src={MyImage} alt="torchlight in the sky" />
    <p>lorem ipsum dolar sit amet</p>
    {title}
  </div>
);

export default App;