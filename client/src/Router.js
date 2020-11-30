import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import LayoutApp from "./components/LayoutApp";
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import JobDetail from './pages/JobDetail'

const Router = () => {
  return (
    <BrowserRouter >
      <LayoutApp>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/profile' component={Profile} />
          <Route path='/job/:jobId' component={JobDetail} />
          {/* 404 page */}
          <Route component={() => <h1>404 - ke kiere o ke</h1>} />
        </Switch>
      </LayoutApp>
    </BrowserRouter>
  )
}

export default Router
