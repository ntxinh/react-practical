# Setup

```bash
npm i react react-dom
npm i -D @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties babel-eslint babel-loader clean-webpack-plugin copy-webpack-plugin css-loader dotenv-webpack eslint eslint-config-airbnb eslint-config-prettier eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react file-loader html-webpack-plugin husky lint-staged mini-css-extract-plugin node-sass prettier react-hot-loader sass-loader style-loader webpack webpack-cli webpack-dev-server webpack-merge
```

# TODO

- [x] Minimal webpack config
- [x] Hot Module Replacement: `react-hot-loader`
- [x] CSS Modules: `style-loader`, `css-loader`
- [x] SASS: `node-sass`, `sass-loader`
- [x] SVG Icons
- [x] Favicon
- [x] Fonts
- [x] Images
- [x] webpack configuration env dev & prod
- [x] CSS extraction: `mini-css-extract-plugin`
- [x] Webpack environment variables: Define & .env
- [x] airbnb style guide, eslint, husky, lint-staged, prettier, prop-types, editorconfig
- [ ] Re-use current tab instead of open a new one
- [ ] Optimize build production: sourceMap, Compress with gzip, minify with UglifyJS, code splitting with CommonsChunkPlugin
- [ ] web app manifest
- [ ] progressive web app (PWA): service-worker

# How to run

```
npm start
npm run build
npx serve -s build/
```

http://localhost:9000
