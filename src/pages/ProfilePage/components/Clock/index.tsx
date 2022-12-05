import React from "react";

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: new Date().toLocaleTimeString(),
    };
  }
  componentDidMount() {
    this.tick();
  }
  componentWillUnmount() {
    clearInterval(this.inderver);
  }
  tick() {
    this.inderver = setInterval(() => {
      this.setState({
        timer: new Date().toLocaleTimeString(),
      });
    }, 300);
  }
  render() {
    return (
      <h1>{this.state.timer}</h1>
    );
  }
}
export default Clock;
