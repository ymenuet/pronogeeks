import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './i18n'
import { AppLayout } from './components'
import { Login, Signup, Home, Profile, PronogeeksSeason, Pronogeeks, CreateGeekLeague, GeekLeague, AllGeekLeagues, GeekLeagueMatchweek, GeekMatchweek, ConfirmUser, RequestPwdReset, SetNewPwd, PrivacyPolicy, Rules, SeasonRanking, Admin } from './pages'
import AdminRoute from './helpers/AdminRoute.jsx'
import PrivateRoute from './helpers/PrivateRoute.jsx'
import PublicRoute from './helpers/PublicRoute.jsx'
import { useErrorNotification } from './utils/hooks/index'

const NotFound = () => <h2 className='page-404-heading'>Cette page n'existe pas...<br />Retourne faire tes pronos au lieu de papilloner !</h2>

const App = () => {

    useErrorNotification()

    return <BrowserRouter>
        <AppLayout>
            <Switch>
                <Route component={Rules} exact path='/rules' />
                <Route component={PrivacyPolicy} exact path='/privacy-policy' />
                <Route component={ConfirmUser} exact path='/confirm-account/:userID/:confirmToken' />
                <PublicRoute component={Home} exact path='/' />
                <PublicRoute component={Signup} exact path='/signup' />
                <PublicRoute component={Login} exact path='/login' />
                <PublicRoute component={RequestPwdReset} exact path='/reset-pwd' />
                <PublicRoute component={SetNewPwd} exact path='/reset-pwd/:userID/:renewToken' />
                <PrivateRoute component={Profile} exact path='/profile' />
                <PrivateRoute component={PronogeeksSeason} exact path='/pronogeeks/:seasonID' />
                <PrivateRoute component={Pronogeeks} exact path='/pronogeeks/:seasonID/matchweek/:matchweekNumber' />
                <PrivateRoute component={GeekMatchweek} exact path='/geek/:geekID/pronogeeks/:seasonID/matchweek/:matchweekNumber' />
                <PrivateRoute component={AllGeekLeagues} exact path='/myGeekleagues' />
                <PrivateRoute component={CreateGeekLeague} exact path='/myGeekleagues/new' />
                <PrivateRoute component={GeekLeague} exact path='/myGeekleagues/:geekLeagueID' />
                <PrivateRoute component={GeekLeagueMatchweek} exact path='/myGeekleagues/:geekLeagueID/season/:seasonID/:matchweekNumber' />
                <PrivateRoute component={GeekLeagueMatchweek} exact path='/myGeekleagues/:geekLeagueID/season/:seasonID' />
                <PrivateRoute component={SeasonRanking} exact path='/ranking/season/:seasonID/:matchweekNumber' />
                <PrivateRoute component={SeasonRanking} exact path='/ranking/season/:seasonID' />
                <AdminRoute component={Admin} exact path='/admin' />
                <Route component={NotFound} />
            </Switch>
        </AppLayout>
    </BrowserRouter>
}

export default App
