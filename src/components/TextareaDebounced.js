import React from "react";
import {debounce} from 'lodash';
import {TTextArea} from "../common/style";

class TextareaDebounced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: props.defaultValue || '',
    };
    this.saveInfo = debounce(this.props.saveInfo, 500);
  };

  handleOnChange = (e)  => {
    const value = e.currentTarget.value;
    this.setState({desc: value});
  };

  handleOnKeyup = () => {
    this.saveInfo(this.state.desc)
  };

  render () {
    return (
      <TTextArea
        value={this.state.desc}
        placeholder={'添加描述'}
        onChange={this.handleOnChange}
        onKeyUp={this.handleOnKeyup}
      />
    )
  }
}

export default TextareaDebounced;

