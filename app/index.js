import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { LOCAL } from './servers'

import './index.scss'

console.log(LOCAL)
ReactDOM.render(<App server={LOCAL} />, document.getElementById('butler-bell-app-root'))