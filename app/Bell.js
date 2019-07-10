import React from 'react'

import styles from './Bell.module.scss'
import BellImage from '../assets/bell_a.jpg'
// import BellImage from '../assets/bell_test.jpg'

export default function ({name}) {
  return (
    <div className={styles.Bell}>
      <img className={styles.BellImg} src={BellImage} alt="servants bell"></img>
      <h2 className={styles.BellName}>{name}</h2>
    </div>
  )
}