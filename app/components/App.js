import React from "react"
import find from 'lodash/find'

import { getLastBellEventType } from '../Utils'
import BellsDisplay from './BellsDisplay'
import DoteOverlay from './DoteOverlay'
import Dialog from './Dialog'
import doteEventInfo from '../doteEventInfo.json'

import styles from '../styles/App.module.scss'
import themeStyles from '../styles/themes/themes.module.scss'

class App extends React.Component {

  constructor ({server}) {
    super();
    this.server = server;
    this.state = {
      errorMessage: null,
      data: null,
      pendingBells: {},
      activeBell: null,
      activeDialogInfo: null,
      onDialogConfirm: null
    };

    this.requestData = this.requestData.bind(this)
    this.handleBellClick = this.handleBellClick.bind(this)
    this.handleDoteEventClick = this.handleDoteEventClick.bind(this)
    this.handleDialogConfirm = this.handleDialogConfirm.bind(this)
    this.handleDialogCancel = this.handleDialogCancel.bind(this)
    this.handleDoteRequestClose = this.handleDoteRequestClose.bind(this)
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
      body: '{"query":"query { serverTime bells { name description doteRequest { events { type timestamp } } } }"}'
    })
      // TODO - also look at status code
      .then(res => res.json())
      .then((data) => {
        let { activeBell } = this.state
        if (activeBell !== null) {
          activeBell = find(data.data.bells, {name: activeBell.name})
          if (!activeBell.doteRequest) {
            activeBell = null
          }
        }
        this.setState({data: data.data, activeBell, pendingBells: {}}
      )})
      .catch(e => this.setState({errorMessage: ''+e, pendingBells: {}}))
  }

  sendDoteEvent(bellName, type) {
    this.setState({
      pendingBells: {[bellName]: true}
    })
    return fetch(this.server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: `{"query":"mutation { doteEvent(bellName:\\"${bellName}\\",type:${type}) { type, timestamp } }"}`
    })
    .then(res => res.json())
    .then(json => console.warn('TODO: error handling', json))
    .then(this.requestData)
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
    // if (getLastBellEventType(bell.doteRequest) !== null) {
      this.setState({
        activeBell: bell,
      })
    // } else {
    //   const { pendingBells } = this.state;
    //   this.setState({pendingBells: {[bellName]: true, ...pendingBells}});
    //   this.sendDoteEvent(bellName, 'requested')
    // }
  }

  handleDialogConfirm() {
    const { onDialogConfirm } = this.state
    this.handleDialogCancel()
    onDialogConfirm()
  }

  handleDialogCancel() {
    this.setState({
      activeDialogInfo: null,
      onDialogConfirm: null
    })
  }

  handleDoteEventClick(eventType) {
    const { confirmDialog } = doteEventInfo[eventType]
    const bellName = this.state.activeBell.name
    if (confirmDialog) {
      this.setState({
        activeDialogInfo: confirmDialog,
        onDialogConfirm: () => {
          // this.setState({
          //   activeBell: null
          // })
          this.sendDoteEvent(bellName, eventType)
        }
      })
    } else {
      // this.setState({
      //   activeBell: null
      // })
      this.sendDoteEvent(bellName, eventType)
    }
  }

  handleDoteRequestClose() {
    this.setState({activeBell: null})
  }

  render () {
    const {
      data,
      pendingBells,
      errorMessage,
      activeBell,
      activeDialogInfo
    } = this.state;

    if (errorMessage) {
      return <div>ERROR! Go find your butler!</div>
    } else if (data !== null) {
      return (
        <div className={themeStyles.theme_princessAndThePea}>
          <BellsDisplay className={styles.bellsDisplay} bells={data.bells} pendingBells={pendingBells} onRing={this.handleBellClick} />
          {activeBell !== null? (
            <DoteOverlay
              bell={activeBell}
              onEventClick={this.handleDoteEventClick}
              onClose={this.handleDoteRequestClose} />
          ): null}
          {activeDialogInfo !== null?(
            <Dialog
              titleText={activeDialogInfo.titleText}
              bodyText={activeDialogInfo.bodyText}
              cancelText={activeDialogInfo.cancelText}
              confirmText={activeDialogInfo.confirmText}
              onCancel={this.handleDialogCancel}
              onConfirm={this.handleDialogConfirm} />
          ): null}
        </div>
      )
    } else {
      return (
        <div>loading.../</div>
      )
    }
  }
}

export default App
