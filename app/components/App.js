import React from "react"
import find from 'lodash/find'

import { getLastBellEventType } from '../Utils'
import BellsDisplay from './BellsDisplay'

import styles from '../styles/App.module.scss'

class App extends React.Component {

  constructor ({server}) {
    super();
    this.server = server;
    this.state = {
      errorMessage: null,
      data: null,
      pendingBells: {}
    };

    this.requestData = this.requestData.bind(this);
    this.handleBellClick = this.handleBellClick.bind(this);
  }

  componentDidMount () {
    if (this.state.data === null) {
      this.requestData();
    }
  }

  requestData () {
    console.log('REQ DATA')
    return fetch(this.server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: '{"query":"query { serverTime bells { name description doteRequest { events { type timestamp } } } }"}'
    })
      // TODO - also look at status code
      .then(res => res.json())
      .then(data => this.setState({data: data.data, pendingBells: {}}))
      .catch(e => this.setState({errorMessage: ''+e, pendingBells: {}}))
  }

  sendDoteEvent(bellName, type) {
    const dbody = `{"query":"mutation { doteEvent(bellName:"${bellName}",type:${type}) { type, timestamp } }"}`;
    console.log(dbody)
    return fetch(this.server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: `{"query":"mutation { doteEvent(bellName:\\"${bellName}\\",type:${type}) { type, timestamp } }"}`
    })
  }

  getBellByName(bellName) {
    if (!this.state.data) return null;
    return find(this.state.data.bells, {name: bellName})
  }

  handleBellClick(bellName) {
    const bell = this.getBellByName(bellName);
    if (!bell) {
      console.error('bell not found: ', bellName)
      return
    }
    if (getLastBellEventType(bell.doteRequest) !== null) {
      // TODO remove this log and do something better
      console.log('bell already has event');
      return;
    }

    const pendingBells = this.state;
    this.setState({pendingBells: {[bellName]: true, ...pendingBells}});
    this.sendDoteEvent(bellName, 'requested')
      .then(res => res.json())
      .then(json => console.warn('TODO: error handling', json))
      .then(this.requestData)
  }

  render () {
    const {data, pendingBells, errorMessage} = this.state;
    if (errorMessage) {
      return <div>ERROR! Go find your butler!</div>
    } else if (data !== null) {
      return (
        <BellsDisplay className={styles.bellsDisplay} bells={data.bells} pendingBells={pendingBells} onRing={this.handleBellClick} />
      )
    } else {
      return (
        <div>loading.../</div>
      )
    }
  }
}

export default App
