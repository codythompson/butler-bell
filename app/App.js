import React from "react"

import testData from './testdata.json'
import BellsDisplay from './BellsDisplay'

function App () {
  return (
    <BellsDisplay bells={testData.data.bells} />
  )
}

export default App
