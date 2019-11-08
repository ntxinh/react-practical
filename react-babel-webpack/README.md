# TODO
- [x] Minimal webpack config
- [x] Hot Module Replacement (alternative: react-hot-loader)
- [x] CSS Modules: style-loader, css-loader
- [x] SCSS
- [x] SVG Icons
- [x] Fonts
- [x] Images
- [ ] airbnb style guide, eslint, husky, lint-staged, prettier, prop-types, editorconfig

# babel
```
Babel doesn't do anything,It basically acts like const babel = code => code; 
by parsing the code and then generating the same code back out again.

You will need to add some plugins for Babel to do anything like transpiling es6,JSX.
```

# babel-core

```
if you want to use babel in your real project, you need to install babel but 
there's no babel package available.

   babel split it up into two separate packages: babel-cli and babel-core

   **babel-cli** : which can be used to compile files from the command line.

   **babel-core** : if you want to use the Node API you can install babel-
      core, Same as "babel-cli" except you would use it programmatically inside your app.

   use "babel-cli" or "babel-core" to compile your files before production.
```
before move on,

# preset vs plugin :

```
We can add features(es6,JSX) one at a time with babel plugins(es2015), 
    or 
we can use babel presets to include all the features(es6) of a particular year.

Presets make setup easier.
```

# babel-preset-es2015

```
babel-preset-env supports es2015 features and replaces es2015, es2016, 
  es2017 and latest.

So use babel-preset-env, it behaves exactly the same as babel-preset-latest 
 (or babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 together).
 ```

# babel-preset-react

```
transform JSX into createElement calls like transforming react pure class to 
   function and transform react remove prop-types.
```

# babel-polyfill

```
Without babel-polyfill, babel only allows you to use features like arrow 
 functions, destructuring, default arguments, and other syntax-specific 
 features introduced in ES6.

The new ES6 built-ins like Set, Map and Promise must be polyfilled

To include the polyfill you need to require it at the top of the entry point 
  to your application. 
```

# babel-loader

```
you done with babel-core, babel-cli, and why need preset, plugins and now 
  you are compiling ES6 to ES5 on a file-by-file basis by babel-cli every time.

to get rid-off this, you need to bundle the task/js file. For that you need 
   Webpack.

Loaders are kind of like “tasks”, They gives the ability to leverage 
 webpack's bundling capabilities for all kinds of files by converting them 
 to valid modules that webpack can process.

Webpack has great Babel support through babel-loader
```

# devDependencies

```
When you deploy your app, modules in dependencies need to be installed or 
your app won't work. Modules in devDependencies don't need to be installed 
on the production server since you're not developing on that machine.

These packages are only needed for development and testing.
```

# Isn't there any single dependency to replace them all?

```
as you read the above states, You need some presets and loaders to transpile 
 es2015 or JSX files.
```

# babel -> @babel

```
Since Babel 7 the Babel team switched to scoped packages, so you now 
have to use @babel/core instead of babel-core.

Your dependencies will need to be modified like so:

babel-cli -> @babel/cli. Ex:  babel- with @babel/.
```

---

1. babel-core: Well as the name suggests the main engine of babel plugin for its dependents to work.
2. babel-preset-env: This is the ES5, ES6 supporting part
3. babel-preset-react: Babel can be used in any framework that needs latest JS syntax support, in our case its “React”, hence this preset.
4. babel-loader: Consider this as a bridge of communication between Webpack and Babel

1. webpack: The main webpack plugin as an engine for its dependents.
2. webpack-cli: To access some webpack commands through CLI like starting dev server, creating production build, etc.
3. webpack-dev-server: A minimal server for client-side development purpose only.
4. html-webpack-plugin: Will help in creating HTML templates for our application.

---

webpack - Webpack is a bundler for modules.

webpack-cli - Command Line interface for webpack.

webpack-dev-server - Development server that provides live reloading.

html-webpack-plugin - The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.

@babel/core - Mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript.

@babel/preset-env - @babel/preset-env allows you to use the latest JavaScript.

@babel/preset-react - This package is a set of plugins used to support React.js specific features.

babel-loader - This package allows transpiling JavaScript files using Babel and webpack.