import React, { Component } from 'react'

import "./searchbar.scss"

class Searchbar extends Component {

  state = {
    saech_term: ""
  }

  submit(e){
    e.preventDefault();
    console.log(this.state.saech_term);
  }

  render() {
    return (
      <form className="searchbar" onSubmit={e => this.submit(e)}>
        <input
          type="search" 
          className="izzy-input"
          placeholder="Search doctors" 
          onChange={e => this.setState({ saech_term: e.target.value  })}
        />
      </form>
    )
  }
}

export default Searchbar;