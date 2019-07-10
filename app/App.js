import React from "react"

import testData from './testdata.json'
import BellsDisplay from './BellsDisplay'

import styles from './App.module.scss'
console.log(styles.bellsDisplay)

function App () {
  return (
    <BellsDisplay className={styles.bellsDisplay} bells={testData.data.bells} />
  )
}

export default App
