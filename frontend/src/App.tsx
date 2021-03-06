import React, { FC } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './components/pages/landing'
import Theme from './components/pages/theme'
import Themes from './components/pages/themes'
import ThemeBackground from './components/uiParts/themeBackground.jsx'
import { Routes } from './domain/router'

const App: FC = () => {
   return (
      <Router>
         <Switch>
            <Route exact path={Routes.landing.path}>
               <Landing />
            </Route>
            <Route exact path={Routes.themes.path}>
               <Themes />
            </Route>
            <Route path={Routes.theme.path}>
               <Theme />
            </Route>
            <Route exact path={Routes.themeBackground.path}>
               <ThemeBackground />
            </Route>
            <Route>
               <NoMatch />
            </Route>
         </Switch>
      </Router>
   )
}

export default App

const NoMatch = () => <h2>Not Found</h2>
