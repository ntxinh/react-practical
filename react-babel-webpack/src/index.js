import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// for public information
console.log(process.env.HELLO);
// for sensitive information: API keys/secrets (credentials), ...
console.log(process.env.WORLD);

const title = 'React with Webpack and Babel';

ReactDOM.render(<App title={title} />, document.getElementById('root'));

module.hot.accept();