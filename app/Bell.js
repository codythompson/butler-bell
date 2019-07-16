import React from 'react'
import classNames from 'classnames'
import maxBy from 'lodash/maxBy'

import styles from './Bell.module.scss'
import BellImage from '../assets/bell_a.jpg'
// import BellImage from '../assets/bell_test.jpg'

export default function ({name, doteRequest}) {
  let lastEventType = null;
  if (doteRequest) {
    lastEventType = maxBy(doteRequest.events, 'timestamp').type
  }
  console.log(lastEventType)
  return (
    <div className={classNames(styles.Bell, styles[lastEventType])}>
      <img className={styles.BellImg} src={BellImage} alt="servants bell"></img>
      <h2 className={styles.BellName}>{name}</h2>
    </div>
  )
}