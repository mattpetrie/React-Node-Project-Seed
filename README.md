# React + Node Boilerplate

This repo serves as a demo app for my current favorite stack for building
client-side Single Page Applications backed by a JSON API. It also provides a
boilerplate for starting other React + Node projects. The technologies used
represent my current views on the ideal stack for developing single page
applications, but are subject to future change as I discover new tools that
fulfill roles even better.

## Installation Guide

Requirements:
  * Node 0.10.35
  * MongoDB
  * [Gulp](http://gulpjs.com/) installed globally: `npm install -g gulp`

Runtime:
1. Clone the repo
2. `npm install`
3. Source files for the front end are located in the ./src directory.
4. Run the `gulp build` task to build the client-side app into the ./build
   directory.
5. Run the default `gulp` task to:
  * Run the tests
  * Build from the source code
  * start the Node server
  * Launch the app in a browser tab
  * Watch for changes. Tests will re-run on changes to the ./tests directory.
  Changes to source JS/CSS/Markup will trigger a re-build and refresh the
  browser.

# Tech & Rationale
The tech choices here are oriented not just toward performance of the final application, but also ease and speed of configuration and development. The goal is to have a toolchain that facilitates both rapid prototyping of new project and simple onboarding for collaborators.

## Build Tools
### Gulp Task/Build Runner
[Gulp](http://gulpjs.com/)'s straightforward syntax makes configuration both quick to setup and easy for other developers to interpret and build upon. It's use of "pipes" and streaming data not only makes it fast but also makes it easy to reason about the flow of data through the build process.

The Gulp configuration here was based heavily on
[this gulp-starter example](https://github.com/greypants/gulp-starter). Gulp
tasks can be found in the `./gulp/tasks` directory, and configuration is consolidated in a single `./gulp/config.js` file.

### Browserify (plus Watchify, Reactify and Rewireify)
[Browserify](http://browserify.org/) allows for easy bundling of front-end JavaScript using the same CommonJS module system used by Node. Browserify's many advantages include:
  * Unified syntax for declaring dependencies in server-side and client-side code.
  * Single tool for package management (npm) rather than using a separate tool such as Bower for front-end package management.
  * Easy configuration and integration with Gulp.
  * Clear documentation of dependencies, since each module lists it's own dependencies via it's requires.

[Watchify](https://github.com/substack/watchify) supplies a watch mode for automating re-bundling on code changes. [Reactify](https://github.com/andreypopp/reactify) is a "transform" for Browserify to compile JSX into JS when bundling. [Rewireify](https://github.com/i-like-robots/rewireify) is a Browserify-compatible port of [Rewire](https://github.com/jhnns/rewire) for injecting mocks for testing.

I am contemplating replacing these build tools with
[Webpack](http://webpack.github.io/).

## Server-Side Architecture
### Nodejs + Express
For many if not most client-side single-page applications, what's needed most from the server-side is a JSON API. Node and Express offer that fastest and easiest route to getting a RESTful API up and running with little overhead, while leaving lots of room for expansion should more complex services be necessary.

### MongoDB
Mongo's document-based storage and flexible schemas offer a fast route to persisting data without the need for much configuration, while offering the potential of scalability. This makes is a great complement to Node and Express for building simple backends to facilitate rapid prototyping of client-side apps. This could easily swapped out for a relational database like Postgres if preferred.

## Client-Side SPA
### React
[React](http://facebook.github.io/react/index.html) allows us to ditch the age-old MVC architecture for a more component-based approached. Component-based development allows for a front end that is highly reusable and extendable, with both data flows and interaction flows that are easy to follow and reason about. React offers the best tool for building view components currently available. It uses JavaScript constructs that will already be familiar to most developers, and it's virtual DOM-based rendering is super fast. It also opens up the possibility of server-side rendering of view as well.

### Flux
[Flux](http://facebook.github.io/flux/) is Facebook's recommended approach to managing the flow of data in a React component-based application. I found Flux's unidirectional data flow to be very intuitive, making reasoning about state and the flow of data relatively straightforward. While Flux is more of design pattern than a formal framework, the implementation here is based fairly directly on the implementation described in the official Flux docs. By managing application state in stores and keeping most business logic out of view components, most aspects of the application are able to remain high decoupled.

## Testing
The unit testing strategy for this project borrows heavily from
[this blog post](http://substantial.com/blog/2014/11/11/test-driven-react-how-to-manually-mock-components/).

### Why not Jest?
Facebook is strongly promoting the use of their [Jest](http://facebook.github.io/jest/) testing framework for React apps. Jest's automatic mocking of dependencies is a great idea for easy JavaScript unit testing, however after experimenting with the framework with this project I've
reached the conclusion that Jest is not yet ready for primetime. My chief complaint with Jest at this point is speed - even a very basic set of unit tests took several seconds to run. It also outputs extremely cryptic error messages
that make debugging test code difficult. It also requires a separate preprocessor for converting JSX files, which adds additional time to running the tests.

Jest still looks like a very promising addition to JavaScript testing tools, and I look forward to seeing how it develops in the future. If my complaints above can be addressed I would strongly consider making the switch back to Jest as the
primary tool for unit testing.

#### Karma + Mocha + Chai + Sinon + Rewireify
Given the current shortcomings of Jest, it's my opinion that this recipe represents the best option for testing React apps. The Karma test runner is blazing fast, allows for running tests in both a headless environment via PhantomJS and in the browser, and couples well with the Browserify module
bundler for bundling test code and converting JSX. I prefer Mocha and Chai but Jasmine could easily be substituted as well.

Since we don't have the benefit of Jest's automocking with this setup, we'll have to handle mocking on our own. Thankfully Sinon and Rewireify make this easy. Rewire sadly no longer supports Browersify, having cast their lot with Webpack,
but thankfully there is a Browserify-compatible port Rewireify. A simple [helper module](../test/utils/rewire-module.js) facilitates mocking and testing of calls to external dependencies with Sinon or replacing child React components
with dummy ones possible with very little code ([example here](../tests/todo-item-spec.jsx)).

Project Organization
---------------------
Coming soon.

Todo
-----
* Server-side rendering of React components
* Component-based file organization
* Tests for Server API
* Gulp task for production build with minifying, etc.
* Explore using Webpack for bundling of front-end assets