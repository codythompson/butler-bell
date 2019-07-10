import React from "react"

import BellsDisplay from './BellsDisplay'

import styles from './App.module.scss'

class App extends React.Component {

  constructor ({server}) {
    super();
    this.server = server;
    this.state = {
      errorMessage: null,
      data: null
    };

    this.requestData = this.requestData.bind(this);
  }

  componentDidMount () {
    if (this.state.data === null) {
      this.requestData();
    }
  }

  requestData () {
    return fetch(this.server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: '{"query":"query { serverTime bells { name rings }}"}'
    })
      // TODO - also look at status code
      .then(res => res.json())
      .then(data => this.setState({data: data.data}))
      .catch(e => this.setState({errorMessage: ''+e}))
  }

  render () {
    const {data, errorMessage} = this.state;
    if (errorMessage) {
      return <div>ERROR! Go find your butler!</div>
    } else if (data !== null) {
      return (
        <BellsDisplay className={styles.bellsDisplay} bells={data.bells} />
      )
    } else {
      return (
        <div>loading.../</div>
      )
    }
  }
}

export default App
