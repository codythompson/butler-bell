import React from 'react'

import Bell from './Bell'

export default function ({bells}) {
  return (
    <div>
      {
        bells.map((bell, i) => <Bell key={i} {...bell}></Bell>)
      }
    </div>
  )
}