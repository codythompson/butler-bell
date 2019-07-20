import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import servers from './servers'

import './styles/index.scss'

// const server = servers.LOCAL
const server = servers.PROD


ReactDOM.render(<App server={server} />, document.getElementById('butler-bell-app-root'))