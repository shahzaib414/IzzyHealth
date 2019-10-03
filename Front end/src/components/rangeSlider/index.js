import React from "react";
import InputRange from "react-input-range";

import "react-input-range/lib/css/index.css";

class RangeSlider extends React.Component {
  state = {
    value: 5
  }

  render() {
    return (
      <InputRange
        value={this.state.value}
        onChange={(value) => this.setState({ value })}
      />
    );
  }
}

export default RangeSlider;
