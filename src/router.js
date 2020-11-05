import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppLayout } from './components'
import { Login, Signup, Home, Profile, PronogeeksSearch, Pronogeeks, NewGeekLeague, GeekLeague, GeekLeagues, GeekLeagueDetail, PronogeeksOther, ConfirmUser, ResetPwd, ResetPwdUser, PrivacyPolicy } from './pages'
import PrivateRoute from './helpers/PrivateRoute'

const NotFound = () => <h2 className='page-404-heading'>Cette page n'existe pas...<br />Retourne faire tes pronos au lieu de papilloner !</h2>

const router = () => {
    return <Router>
        <AppLayout>
            <Switch>
                <Route component={Home} path='/' exact />
                <Route component={Signup} path='/signup' />
                <Route component={ConfirmUser} path='/confirm-account/:userID/:confirmToken' />
                <Route component={Login} path='/login' />
                <Route component={ResetPwd} path='/reset-pwd' exact />
                <Route component={ResetPwdUser} path='/reset-pwd/:userID/:renewToken' />
                <Route component={PrivacyPolicy} path='/privacy-policy' />
                <PrivateRoute component={Profile} path='/profile' exact />
                <PrivateRoute component={PronogeeksSearch} path='/pronogeeks/:seasonID' exact />
                <PrivateRoute component={Pronogeeks} path='/pronogeeks/:seasonID/matchweek/:matchweekNumber' />
                <PrivateRoute component={PronogeeksOther} path='/geek/:geekID/pronogeeks/:seasonID/matchweek/:matchweekNumber' />
                <PrivateRoute component={GeekLeagues} path='/myGeekleagues' exact />
                <PrivateRoute component={NewGeekLeague} path='/myGeekleagues/new' exact />
                <PrivateRoute component={GeekLeague} path='/myGeekleagues/:geekLeagueID' exact />
                <PrivateRoute component={GeekLeagueDetail} path='/myGeekleagues/:geekLeagueID/season/:seasonID' />
                <Route component={NotFound} />
            </Switch>
        </AppLayout>
    </Router>
}

export default router
