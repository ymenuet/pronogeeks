import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppLayout } from './components'
import { Login, Signup, Home, Profile, PronogeeksSearch, Pronogeeks, NewGeekLeague, GeekLeague, GeekLeagues, GeekLeagueDetail, PronogeeksOther, ConfirmUser, ResetPwd, ResetPwdUser, PrivacyPolicy, Rules, SeasonRanking } from './pages'
import PrivateRoute from './helpers/PrivateRoute'
import PublicRoute from './helpers/PublicRoute'

const NotFound = () => <h2 className='page-404-heading'>Cette page n'existe pas...<br />Retourne faire tes pronos au lieu de papilloner !</h2>

const router = () => {
    return <Router>
        <AppLayout>
            <Switch>
                <Route component={Rules} exact path='/rules' />
                <Route component={PrivacyPolicy} exact path='/privacy-policy' />
                <Route component={ConfirmUser} exact path='/confirm-account/:userID/:confirmToken' />
                <PublicRoute component={Home} exact path='/' />
                <PublicRoute component={Signup} exact path='/signup' />
                <PublicRoute component={Login} exact path='/login' />
                <PublicRoute component={ResetPwd} exact path='/reset-pwd' />
                <PublicRoute component={ResetPwdUser} exact path='/reset-pwd/:userID/:renewToken' />
                <PrivateRoute component={Profile} exact path='/profile' />
                <PrivateRoute component={PronogeeksSearch} exact path='/pronogeeks/:seasonID' />
                <PrivateRoute component={Pronogeeks} exact path='/pronogeeks/:seasonID/matchweek/:matchweekNumber' />
                <PrivateRoute component={PronogeeksOther} exact path='/geek/:geekID/pronogeeks/:seasonID/matchweek/:matchweekNumber' />
                <PrivateRoute component={GeekLeagues} exact path='/myGeekleagues' />
                <PrivateRoute component={NewGeekLeague} exact path='/myGeekleagues/new' />
                <PrivateRoute component={GeekLeague} exact path='/myGeekleagues/:geekLeagueID' />
                <PrivateRoute component={GeekLeagueDetail} exact path='/myGeekleagues/:geekLeagueID/season/:seasonID/:matchweekNumber' />
                <PrivateRoute component={GeekLeagueDetail} exact path='/myGeekleagues/:geekLeagueID/season/:seasonID' />
                <PrivateRoute component={SeasonRanking} exact path='/ranking/season/:seasonID/:matchweekNumber' />
                <PrivateRoute component={SeasonRanking} exact path='/ranking/season/:seasonID' />
                <Route component={NotFound} />
            </Switch>
        </AppLayout>
    </Router>
}

export default router
