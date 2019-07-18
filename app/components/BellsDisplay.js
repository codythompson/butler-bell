import React from 'react'
import classNames from 'classnames'

import Bell from './Bell'

import styles from '../styles/BellsDisplay.module.scss'

export default function ({className, bells, pendingBells, onRing=null}) {

  return (
    <div className={classNames(className, styles.BellsDisplay)}>
      {
        bells.map((bell, i) => <Bell key={i} isPending={pendingBells[bell.name]} onRing={onRing} {...bell}></Bell>)
      }
    </div>
  )
}