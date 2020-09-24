import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppLayout } from './components'
import { Login, Signup, Home, Profile, PronogeeksSearch, Pronogeeks } from './pages'

const ProvRanking = () => <h1>Provisional Ranking</h1>
const GeekLeagues = () => <h1>GeekLeagues</h1>
const GeekLeague = () => <h1>GeekLeague</h1>
const Season = () => <h1>Season</h1>
const NotFound = () => <h2>Cette page n'existe pas...<br />Retourne faire tes pronos au lieu de papilloner !</h2>

const router = () => {
    return <Router>
        <AppLayout>
            <Switch>
                <Route component={Home} path='/' exact />
                <Route component={Signup} path='/signup' />
                <Route component={Login} path='/login' />
                <Route component={Profile} path='/profile' exact />
                <Route component={ProvRanking} path='/profile/provRanking' />
                <Route component={PronogeeksSearch} path='/pronogeeks/:seasonID' exact />
                <Route component={Pronogeeks} path='/pronogeeks/:seasonID/matchweek/:matchweekNumber' />
                <Route component={GeekLeagues} path='/myGeekleagues' exact />
                <Route component={GeekLeague} path='/myGeekleagues/:geekLeagueID' />
                <Route component={Season} path='/seasons/:seasonID' exact />
                <Route component={NotFound} />
            </Switch>
        </AppLayout>
    </Router>
}

export default router
