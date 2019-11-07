import React from 'react';
import { render } from 'react-dom';

const rootElement = document.getElementById('react-app');

render(<div> Hello World!222 </div>, rootElement);

module.hot.accept();