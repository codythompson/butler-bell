import React from 'react'

import styles from './Bell.module.scss'


export default function ({name}) {
  return (
    <div className={styles.img}>
      <img ></img>
      <h2>{name}</h2>
    </div>
  )
}