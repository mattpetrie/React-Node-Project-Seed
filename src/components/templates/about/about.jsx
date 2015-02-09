import './about.less';

import React from 'react/addons';
import Header from '../../molecules/header/header';
import Card from '../../molecules/card/card';

const About = React.createClass({

  render: function() {
    return (
      <div className="about">
        <Header headerText='About' />
        <div className="main">
          <Card>
            <h2>About React + Flux Todos</h2>
            <hr />
            <p>
              This is the example app from the React-Node-Boilerplate repo by Matt Petrie. It's intended to be a starting point for other React projects. You can view the source on Github <a href="https://github.com/mattpetrie/React-Node-Boilerplate">here</a>.
            </p>
          </Card>
        </div>
      </div>
    );
  }
});

export default About;