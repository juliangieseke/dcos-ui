import React from "react";

import Icon from "#SRC/js/components/Icon";
import Page from "#SRC/js/components/Page";

// import FeedMediator from "#PLUGINS/inspector/mediators/FeedMediator";
import ClockMediator from "#PLUGINS/inspector/mediators/ClockMediator";

const commands = {
  clock: () => <ClockMediator />
  // feed: () => <FeedMediator />,
  // mesos: () => <MesosMediator />
};

const noCommand = (cmd, commands) => {
  return () => {
    return (
      <div>
        {cmd} <br />
        Commands:
        <ul>{commands.map(cmd => <li key={cmd}>{cmd}</li>)}</ul>
      </div>
    );
  };
};

class InspectorPage extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      expression: ""
    };
  }

  render() {
    const firstWord = this.state.expression.split(" ")[0];
    const commandSelection =
      commands[firstWord] || noCommand(firstWord, Object.keys(commands));

    return (
      <Page title="Inspector">
        <h1>Actions:</h1>
        <input
          value={this.state.expression}
          onChange={e => this.setState({ expression: e.target.value })}
        />
        {commandSelection()}
      </Page>
    );
  }
}

InspectorPage.routeConfig = {
  label: "Inspector",
  icon: <Icon id="components-inverse" size="small" family="product" />,
  matches: /^\/inspector/
};

module.exports = InspectorPage;
