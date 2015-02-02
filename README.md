# React + Node Boilerplate

A React and Node demo project that serves as a showcase for a great toolchain for building single page applications backed by a JSON API. It is meant to showcase a set of technologies that can not only result in robust web applications, but also facilitate rapid development and ease of developer onboarding. It can also serve as seed for starting new projects.

## Installation Guide

#### Requirements:
  * [Node](http://nodejs.org/) 0.10.35
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

For viewing in the browser, you can navigate to `http://localhost:3000/webpack-dev-server/` to view the app in live-reload mode, or `http://localhost:8080/` for standard (refresh to see changes) mode.

#### Deployment:
A production-ready, minified build can be created in the `./build` directory by running `$ gulp build:production`. The task will only run the build if all tests are passing.

# Tech & Rationale

## Components For The Win!
The architecture of this app is centered around components - specifically, React components. Each component under the `./src/js/components` directory includes the **stylesheets and tests for the component along with the JavasScript/JSX in the same directory**.

This separation of concerns centered around functionality rather than type allows components to be added, modified, or removed with out impacting other aspects of the app. Removing a component should, for example, not leave you with a bunch of broken tests that are still expecting the component to exist. A component directory should in theory be able to be copied into a completely separate and still retain its functionality and core styling.

This also provides a very clear heuristic for finding source code, styles, and tests related to any component without having to bounce between directories or mentally map how, for example, a group of stylesheet partials relate to a specific component in a view.

The `./src/stylesheets` and `./src/test` directories should be used sparingly, and primarily for application-wide code that does not target a specific component, such as a base stylesheet, or integration tests.

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
### React
[React](http://facebook.github.io/react/index.html) allows us to ditch the age-old MVC architecture for a more component-based approached. Component-based development allows for a front end that is highly reusable and extendable, with both data flows and interaction flows that are easy to follow and reason about. React offers the best tool for building view-layer components currently available. It uses JavaScript constructs that will already be familiar to most developers, and its virtual DOM-based rendering is super fast. It also opens up the possibility of server-side rendering of view as well.

### Flux
[Flux](http://facebook.github.io/flux/) is Facebook's recommended approach to managing the flow of data in a React component-based application. I found Flux's unidirectional data flow to be very intuitive, making reasoning about state and the flow of data relatively straightforward. While Flux is more of design pattern than a formal framework, the implementation here is based fairly directly on the implementation described in the official Flux docs. By managing application state in stores and keeping most business logic out of view components, most aspects of the application are able to remain highly decoupled.

### CSS
This project uses [Sass](http://sass-lang.com/) for stylesheets with [Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/) for layout. In order to keep the styles methodology aligned with the component-based approach, the organization CSS stylesheets had to be seriously rethought. This is the largest departure from convention in this project, but one that I believe still facilitates intuitive and rapid development.

#### Key Goals:
* Component CSS files are contained in the same directory as the component's source code.
* All styles affecting a component should be declared within the component's stylesheet. No global styles should affect a component directly. It should be clear from reading the components stylesheet what all of its styles are and what sources they are drawn from.
* A component's stylesheet should have as few dependencies as possible, and it should be easy to remove any dependencies to better facilitate reuse of components in other projects without causing Sass compilation errors or unexpected UI changes.
* CSS code should not be unnecessarily or accidentally duplicated during the build process (e.g., from multiple `imports`s of the same file).

#### The Solution:
* Each component SCSS file imports just one dependency, `common.scss`, which exposes shared mixins and variables to the component. Every component stylesheet should import this file.
* Each component SCSS file contains two local Sass mixins, `layout` and `presentation`, which exist entirely for organization:
  * Styles in the layout mixin should never depend on any external variables or mixins. They should relate entirely size and positioning of the the component and its child elements.
  * Presentation styles might include colors, borders, fonts, and other styles that pertain to the appearance of the app rather than being intrinsic to the component. External dependencies may be required here, since similar appearance styles are often shared among element in an application. When reusing a component in a new application, a developer should expect to be able to delete the contents the presentation mixin without affecting the usability of the component.
* All external styles must be included in the form of a Sass mixin or variable - there should be no plain CSS in `common.scss` or any of its imports. This is to prevent code duplication. Sass will insert a file's CSS each time it is imported by another file, but will inject mixins and variables only when they are actually used.
* An example component stylesheet file with comments can be viewed [here](./src/js/components/todo-item/todo-item.scss).

For shared CSS styles, files containing mixins and variables can be imported into `common.scss`. Mixins are organized in their own directory into whatever categories make the most sense. A `main.scss` file provides basic overarching styles for the entire app.

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
* ES6 support using 6to5
* Yeoman generator for new projects with boilerplate