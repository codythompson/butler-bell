import React from 'react'
import classNames from  'classnames'

import { getLastBellEventType } from '../Utils'

import styles from '../styles/DoteOverlay.module.scss'
import themeStyles from '../styles/themes/themes.module.scss'

const eventMap = {
  requested: {
    postfix: 'warning',
    buttonLabel: 'set to requested',
    statusText: 'Your dote has been requested, but not yet received by your butler. Most embarassing...'
  },
  onHold: {
    postfix: 'danger',
    buttonLabel: 'put on hold',
    statusText: 'Your dote has been put on hold. My goodness!'
  },
  inProgress: {
    postfix: 'success',
    buttonLabel: 'start progress',
    statusText: 'Your butler is working hard on your dote!'
  },
  fulfilled: {
    postfix: 'info',
    buttonLabel: 'fulfill',
    statusText: 'Your butler thinks he already completed this dote. What a noodle!'
  }
}

const makeButton = (buttonEventType, lastEventType) => {
  const { postfix, buttonLabel } = eventMap[buttonEventType]
  return lastEventType === buttonEventType? null: <button type="button" className={classNames('btn', `btn-${postfix}`)}>{buttonLabel}</button>
}

export default function ({doteRequest}) {
  const lastEventType = getLastBellEventType(doteRequest)
  const {postfix, statusText} = eventMap[lastEventType]

  return (
    <div className={styles.DoteOverlayContainer}>
      <div className={classNames(styles.DoteOverlay, themeStyles.secondaryBackground, themeStyles.tertiary_color, themeStyles.quaternary_borderColor)}>
        <h2 className={styles.h2}>Dote Status</h2>
          <div className={classNames('alert', `alert-${postfix}`)}>
            <strong>requested</strong>
            <p>{statusText}</p>
          </div>
          <div className={classNames('', 'btn-group')}>
            {makeButton('requested', lastEventType)}
            {makeButton('onHold', lastEventType)}
            {makeButton('inProgress', lastEventType)}
            {makeButton('fulfilled', lastEventType)}
          </div>
        <hr/>
        <h2 className={styles.h2}>Dote Note</h2>
        <form>
          <div className={"form-group"}>
            <textarea className={"form-control"} rows="10"></textarea>
          </div>
          <button className={"btn btn-success"} type="submit">save dote note</button>
        </form>
      </div>
    </div>
  )
}