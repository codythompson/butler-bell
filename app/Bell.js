import React from 'react'
import classNames from 'classnames'

import { getLastBellEventType } from './Utils'

import styles from './Bell.module.scss'
import BellImage from '../assets/bell_a.jpg'
// import BellImage from '../assets/bell_test.jpg'

export default function ({name, doteRequest=null, isPending=false, onRing=null}) {
  let lastEventType = getLastBellEventType(doteRequest);

  // maybe react hooks should be used instead of this weird flag stuff
  let canRing = !isPending;
  const onRingHandler = () => {
    if (canRing && onRing) {
      canRing = false; // only click once per render
      onRing(name)
    }
  }

  return (
    <div className={classNames(styles.Bell, styles[lastEventType])} onClick={onRingHandler}>
      <img className={styles.BellImg} src={BellImage} alt="servants bell"></img>
      <h2 className={styles.BellName}>{name}</h2>
      {
        isPending?
          <div>updating...</div>
        : null
      }
    </div>
  )
}