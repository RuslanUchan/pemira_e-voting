import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import AdminPage from './components/pages/AdminPage'
import AdminLoginPage from './components/pages/AdminLoginPage'
import ChartPage from './components/pages/ChartPage'
import TatacaraPage from './components/pages/TatacaraPage'
import VotePage from './components/pages/VotePage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/tatacara" component={TatacaraPage} />
          <Route path="/login" component={AdminLoginPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/publik" component={ChartPage} />
          <Route path="/vote" component={VotePage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
