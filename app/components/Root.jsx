import React, { Component } from 'react';
import { connect } from 'react-redux'

class Root extends Component {
  constructor() {
    super()
  }

  render() {
    if (!this.state) { return null }

    const { joke, answered } = this.state
    return (
      <div>
        <h1 onClick={answered ? this.nextJoke : this.answer}>{joke.q}</h1>
        {answered && <h2>{joke.a}</h2>}
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {

  }
 };
const mapDispatch = (dispatch) => {
  return {

  }
}

const BetterRoot = connect(mapState, mapDispatch)(Root);


export default BetterRoot;
