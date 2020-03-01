import React from "react";
import {debounce} from 'lodash';
import {TTextArea} from "../common/style";

class TextareaDebounced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
    };
    this.onKeyUp = debounce(this.props.onKeyUp, 500);
  };

  handleOnChange = (e)  => {
    const value = e.currentTarget.value;
    this.setState({value});
    const {onChange} = this.props;
    if (onChange) onChange(value)
  };

  handleOnKeyup = () => {
    this.onKeyUp(this.state.value)
  };

  render () {
    const {defaultValue, onChange, onKeyUp, forwardedRef, ...otherProps} = this.props;
    return (
      <TTextArea
        ref={forwardedRef}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.handleOnChange}
        onKeyUp={this.handleOnKeyup}
        {...otherProps}
      />
    )
  }
}

export default React.forwardRef((props, ref) => (<TextareaDebounced {...props} forwardedRef={ref}/>));

