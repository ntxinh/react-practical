import React from 'react';
import { render } from 'react-dom';

import App from './App';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const title = 'React with Webpack and Babel';

const rootElement = document.getElementById('root');

render(<App title={title} />, rootElement);

module.hot.accept();