import React from 'react'
import classNames from 'classnames'

import Bell from './Bell'

import styles from './BellsDisplay.module.scss'

export default function ({className, bells}) {

  return (
    <div className={classNames(className, styles.BellsDisplay)}>
      {
        bells.map((bell, i) => <Bell key={i} {...bell}></Bell>)
      }
    </div>
  )
}