import React from 'react';
import { render } from 'react-dom';

import App from './App';

const title = 'React with Webpack and Babel';

const rootElement = document.getElementById('react-app');

render(<App title={title} />, rootElement);

module.hot.accept();