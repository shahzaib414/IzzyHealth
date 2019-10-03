import React from "react";
import classnames from "classnames";

import "./index.scss";

class Dropdown extends React.Component {
  state = {
    option: this.props.options[0],
    open: false
  };

  toggle(e){
    e.stopPropagation();
    this.setState({ open: !this.state.open })
  }

  renderHeader(value) {
    if (this.props.header) {
      return this.props.header({ value });
    }
  }

  componentDidMount(){
    document.querySelector('body').addEventListener('click', () => {
      this.setState({ open: false });
    })
  }

  render() {
    const options = this.props.options.map(option => (
      <li
        key={option}
        onClick={() => this.setState({ option, open: false })}
      >
        {option}
      </li>
    ));

    return (
      <div className={classnames({ open: this.state.open }, "dropdown izzy-dropdown")}>
        <div className="izzy-dropdown-head" onClick={e => this.toggle(e)}>
          {this.renderHeader(this.state.option)}
        </div>
        <ul className="izzy-dropdown-list">{options}</ul>
      </div>
    );
  }
}

export default Dropdown;
