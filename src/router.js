import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LayoutApp } from './components'
import { Login, Signup } from './pages'

const Home = () => <h1>Home</h1>
const Profile = () => <h1>Profile</h1>
const ProvRanking = () => <h1>Provisional Ranking</h1>
const Pronogeeks = () => <h1>Pronogeeks</h1>
const GeekLeagues = () => <h1>GeekLeagues</h1>
const GeekLeague = () => <h1>GeekLeague</h1>
const Season = () => <h1>Season</h1>
const NotFound = () => <h1>Cette page n'existe pas...<br />Retourne plutôt faire tes pronos !</h1>

const router = () => {
    return <Router>
        <LayoutApp>
            <Switch>
                <Route component={Home} path='/' exact />
                <Route component={Signup} path='/signup' />
                <Route component={Login} path='/login' />
                <Route component={Profile} path='/profile' exact />
                <Route component={ProvRanking} path='/profile/provRanking' />
                <Route component={Pronogeeks} path='/pronogeeks/matchweek/:matchweekNumber' />
                <Route component={GeekLeagues} path='/myGeekleagues' exact />
                <Route component={GeekLeague} path='/myGeekleagues/:geekLeagueID' />
                <Route component={Season} path='/seasons/:seasonID' exact />
                <Route component={NotFound} />
            </Switch>
        </LayoutApp>
    </Router>
}

export default router
