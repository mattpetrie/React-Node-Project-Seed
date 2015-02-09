# React + Node Boilerplate

A React and Node with ES6 demo project that serves as a showcase for a great toolchain for building single page applications backed by a JSON API. It is meant to showcase a set of technologies that can not only result in robust web applications, but also facilitate rapid development and ease of developer onboarding. It can also serve as seed for starting new projects.

## Installation Guide

#### Requirements:
  * [Node](http://nodejs.org/) 0.10.36
  * [MongoDB](www.mongodb.org/)
  * [Gulp](http://gulpjs.com/) installed globally: `$ npm install -g gulp`

#### Installation:
1. Clone the repo
2. `$ npm install`
3. Source files for the front end are located in the ./src directory.
4. Run the `$ gulp build` task to build the client-side app into the ./build
   directory.

#### Runtime:
Run the default `$ gulp` task to:
  * Run the tests
  * Build from `./src` into the `./build` via webpack
  * start the Node server
  * start the webpack development server to server client-side assets
  * Watch for changes. All changes will to JS/JSX will re-run the tests. Changes to source JS/CSS/Markup will trigger a re-build.

For viewing in the browser, you can navigate to `http://localhost:3000/webpack-dev-server/#/` to view the app in live-reload mode, or `http://localhost:8080/` for standard (refresh to see changes) mode.

#### Deployment:
A production-ready, minified build can be created in the `./build` directory by running `$ gulp build:production`.

When to ploying to a hosting service (such as Heroku), make sure to set `NODE_ENV=production` and `MONGOLAB_URI` to your MongoDB instance URI in your environment variables.

A Heroku deployment of this example app can be viewed [here](http://react-node-project-seed.herokuapp.com/#/).

# Tech

## Build Tools
### Webpack
The [webpack](http://webpack.github.io/docs/what-is-webpack.html) module bundler is the principal build tool, and supports our component-based architecture very well. Webpack's myriad features and advantages as a module bundler are too many to list here. However, a key feature to this project is that **stylesheets are 'required' within component source code in the same CommonJS format as JavaScript dependencies**, e.g., `require('./stylesheet.css')`.

### Gulp Task/Build Runner
[Gulp](http://gulpjs.com/) is used to fill in the gaps around webpack and automate groups of tasks with a single command, e.g. starting the backend server and the development server simultaneously.

Gulp's straightforward syntax makes configuration of tasks both quick to setup and easy for other developers to interpret and build upon. It's use of "pipes" and streaming data not only makes it fast but also makes it easy to reason about the flow of data through the build process.

Gulp tasks can be found in the `./gulp/tasks` directory, and configuration is consolidated in a single `./gulp/config.js` file.

## Server-Side Architecture
### Nodejs + Express
For many if not most client-side single-page applications, what's needed most from the server-side is a JSON API. Node and [Express](http://expressjs.com/) offer the fastest and easiest route to getting a RESTful API up and running with little overhead, while leaving lots of room for expansion should more complex services be necessary.

### MongoDB
Mongo's document-based storage and flexible schemas offer a fast route to persisting data without the need for much configuration, while offering the potential of scalability. This makes is a great complement to Node and Express for building simple backends to facilitate rapid prototyping of client-side apps. This could easily swapped out for a relational database like Postgres if preferred.

## Client-Side SPA

### Atomic React
[React](http://facebook.github.io/react/index.html) allows us to ditch the age-old MVC architecture for a more component-based approached. Component-based development allows for a front end that is highly reusable and extendable, with both data flows and interaction flows that are easy to follow and reason about. React offers the best tool for building view-layer components currently available. It uses JavaScript constructs that will already be familiar to most developers, and its virtual DOM-based rendering is super fast. It also opens up the possibility of server-side rendering of view as well.

The architecture of this app applies the principles of [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) to React components. Components are organized into atoms, molecules, organisms, templates, and pages. The **stylesheets and tests for the component along with the JavasScript/JSX in the same directory**. Stylesheets adhere to the same rules as they would under a normal Atomic CSS layout. However, with the exception of a few global styles, **every style and stylesheet must belong to a component**. This pattern is very handy for organizing complex groups of components, and makes mentally mappign the location of code, tests, or styles related to a particular component or structure within the app very intuitive.

### React Router
Routing is performed via [React Router](https://github.com/rackt/react-router).
### Flux
[Flux](http://facebook.github.io/flux/) is Facebook's recommended approach to managing the flow of data in a React component-based application. I found Flux's unidirectional data flow to be very intuitive, making reasoning about state and the flow of data relatively straightforward. While Flux is more of design pattern than a formal framework, the implementation here is based fairly directly on the implementation described in the official Flux docs. By managing application state in stores and keeping most business logic out of view components, most aspects of the application are able to remain highly decoupled.

## Testing
Tests can be run with `$ gulp test`. All files ending in `-spec.js` or `-spec.jsx` in the `./src` directory will be detected, bundled, and run automatically by the test runner.

The unit testing strategy for React components in this project borrows heavily from
[this blog post](http://substantial.com/blog/2014/11/11/test-driven-react-how-to-manually-mock-components/).

### Why not Jest?
Facebook is strongly promoting the use of their [Jest](http://facebook.github.io/jest/) testing framework for React apps. Jest's automatic mocking of dependencies is a great idea for easy JavaScript unit testing, however after experimenting with the framework with this project I've
reached the conclusion that Jest is not yet ready for primetime. My chief complaint with Jest at this point is speed - even a very basic set of unit tests took several seconds to run. It outputs extremely cryptic error messages that make debugging test code difficult. It also requires a separate preprocessor for converting JSX files, which adds additional time to running the tests.

Jest still looks like a very promising addition to JavaScript testing tools, and I look forward to seeing how it develops in the future. If the complaints above can be addressed I would strongly consider making the switch back to Jest as the
primary tool for unit testing.

#### Karma + Mocha + Chai + Sinon + Rewire
Given the current shortcomings of Jest, it's my opinion that this recipe represents the best option for testing React apps. The Karma test runner is blazing fast, allows for running tests in both a headless environment via PhantomJS and in the browser, and couples well with the webpack module bundler for bundling test code and converting JSX. I prefer Mocha and Chai, but Jasmine could easily be substituted as well.

Since we don't have the benefit of Jest's automocking with this setup, we'll have to handle mocking on our own. Thankfully Sinon and Rewire make this easy. A simple [helper module](../test/helpers/rewire-module.js) facilitates mocking and testing of calls to external dependencies with Sinon or replacing child React components with dummy ones possible with very little code ([example here](../tests/todo-item-spec.jsx)).

## Todo
* Server-side rendering of React components
* Tests for Server API
* Convert components to ES6 classes once React 0.13 is available
* Upgrade to [iojs](https://iojs.org/) once it is fully supported by node-sass