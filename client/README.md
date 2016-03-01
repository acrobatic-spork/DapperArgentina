#Client-side README#

##Overview##
Our client-side uses React, React-Router, and ES6, managed with webpack. Webpack compiles and minifies the client-side files.

##Webpack##
The init.js file is the entry point for the webpack bundle. This is where webpack begins the compiling process, which outputs a minified production script file. Init.js simply points to the children components through the App component and through the Router. 

##React Router##
React Router handles the client-side routing, displaying component when a path is referenced. In our app most of the user navigation happens through the NavBar component. The RepoList, RepoProfile, and ResourceList components are all siblings and will occupy the same space within the App component.
React Router API
https://github.com/reactjs/react-router/blob/master/docs/API.md#routercontext
npm react router docs
https://www.npmjs.com/package/react-router-transition-context

##To Begin##
To begin developing the client side, first run in your terminal 
```javascript
npm install
``` 
This will give you webpack and other dependencies. Then, in the root directory or in this client directory, run 
```javascript
npm run dev
``` 
When it is done (it may take a while), navigate to the page at the top of the webpack command execution. It should be http://localhost:8080/webpack-dev-server/
