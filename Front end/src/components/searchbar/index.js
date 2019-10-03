import React, { Component } from 'react'

import "./index.scss"

class Searchbar extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    saech_term: ""
  }

  submit(e){
    e.preventDefault();
    console.log(this.state.saech_term);
    if (this.props.action) {
      this.props.action(this.state.saech_term);
    }
  }

  render() {
    return (
      <form className="searchbar" onSubmit={e => this.submit(e)}>
        <input
          type="search" 
          className="izzy-input"
          id="searchBar"
          placeholder={this.props.placeholder} 
          onChange = {e => this.props.HandleSearch(e)}
          onKeyDown={e => this.props.OnPressEnter(e)}
         //onChange={e => this.setState({ saech_term: e.target.value  })}
        />
      </form>
    )
  }
}

export default Searchbar;