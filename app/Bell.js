import React from 'react'

const BELL_CLASSNAME = 'bell';

export default function ({name}) {
  return (
    <div className={BELL_CLASSNAME}>
      <img ></img>
      <h2>{name}</h2>
    </div>
  )
}