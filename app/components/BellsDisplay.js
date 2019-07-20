import React from 'react'
import classNames from 'classnames'

import Bell from './Bell'

import styles from '../styles/BellsDisplay.module.scss'
import bellStyles from '../styles/Bell.module.scss'

export default function ({className, bells, pendingBells, onRing=null, onShowCard=null}) {

  return (
    <div className={classNames(className, styles.BellsDisplay)}>
      {
        bells.map((bell, i) => <Bell key={i} isPending={pendingBells[bell.name]} onRing={onRing} {...bell}></Bell>)
      }
      <div className={bellStyles.Bell}>
        <div className={styles.ShowCard}>
          <button type="button" className={'btn btn-secondary'} onClick={onShowCard}>Show Card</button>
        </div>
      </div>
    </div>
  )
}