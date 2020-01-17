import React from "react";

class TCountdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {minutes: props.minutes * 60}
  }

  componentDidMount() {
    this.countTimer = setInterval(() => {
      this.setState({minutes: this.state.minutes - 1} )
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.minutes === 0) {
      this.props.onComplete();
    }
    if (!this.props.todoId && prevState.minutes === 0)
      clearInterval(this.countTimer);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.todoId !== this.props.todoId) {
      this.setState({minutes: nextProps.minutes * 60})
    }
  }

  componentWillUnmount() {
    clearInterval(this.countTimer);
  }

  render() {
    return (
      <span>{this.state.minutes}</span>
    )
  }
}

export default TCountdown;