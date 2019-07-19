import React from 'react'
import PropTypes from 'prop-types'
import classNames from  'classnames'

import { getLastBellEventType } from '../Utils'
import doteEventInfo from '../doteEventInfo.json'
import DoteNote from './DoteNote'

import styles from '../styles/DoteOverlay.module.scss'
import themeStyles from '../styles/themes/themes.module.scss'

class DoteOverlay extends React.Component {

  constructor(props) {
    super(props)

    this.clickHandlers = {
      requested: this._handleClick.bind(this, 'requested'),
      onHold: this._handleClick.bind(this, 'onHold'),
      inProgress: this._handleClick.bind(this, 'inProgress'),
      fulfilled: this._handleClick.bind(this, 'fulfilled')
    }
  }

  _handleClick(eventType) {
    if (this.props.onEventClick) {
      this.props.onEventClick(eventType)
    }
  }

  makeButton (buttonEventType, lastEventType) {
    const { postfix, buttonLabel } = doteEventInfo[buttonEventType]
    return lastEventType === buttonEventType? null: <button type="button" className={classNames('btn', `btn-${postfix}`)} onClick={this.clickHandlers[buttonEventType]}>{buttonLabel}</button>
  }

  makeButtons(lastEventType) {
    if (lastEventType === null) {
      return <button type="button" className={classNames('btn', 'btn-success')} onClick={this.clickHandlers.requested}>Ring Dote Bell!</button>
    } {
      return (
        <div className={classNames('', 'btn-group')}>
          {this.makeButton('onHold', lastEventType)}
          {this.makeButton('requested', lastEventType)}
          {this.makeButton('inProgress', lastEventType)}
          {this.makeButton('fulfilled', lastEventType)}
        </div>
      )
    }
  }

  makeStatus(lastEventType) {
    if (lastEventType === null) {
      return (
        <div className={classNames('alert', 'alert-light')}>
          <p>No dotes of this kind requested.</p>
          <p><strong>Ring the bell?</strong></p>
          <p>Press the button below to request your butler come to your service at once.</p>
        </div>
      )
    } else {
      const {postfix, statusText} = doteEventInfo[lastEventType]
      return (
        <div className={classNames('alert', `alert-${postfix}`)}>
          <strong>{lastEventType}</strong>
          <p>{statusText}</p>
        </div>
      )
    }
  }

  render() {
    const { bell, onClose } = this.props;
    const lastEventType = getLastBellEventType(bell.doteRequest)

    return (
      <div className={styles.DoteOverlayContainer}>
        <div className={classNames(styles.DoteOverlay, themeStyles.secondaryBackground, themeStyles.tertiary_color, themeStyles.quaternary_borderColor)}>
          <div className={'container-fluid'}>
            <div className={'row'}>
              <h1 className={classNames(styles.h1, 'col-10')}>{bell.name}</h1>
              <button type="button" className={classNames(styles.CloseButton, 'col-2 close')} onClick={onClose}>&times;</button>
            </div>
          </div>
          <hr/>
          <h2 className={styles.h2}>Dote Status</h2>
            {this.makeStatus(lastEventType)}
            {this.makeButtons(lastEventType)}
            {lastEventType? <DoteNote /> : null}
        </div>
      </div>
    )
  }
}

DoteOverlay.propTypes = {
  bell: PropTypes.object.isRequired,
  onEventClick: PropTypes.func,
  onClose: PropTypes.func
}

export default DoteOverlay
