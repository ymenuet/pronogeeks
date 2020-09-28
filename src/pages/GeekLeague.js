import React from 'react'

const GeekLeague = ({ match: { params: { geekLeagueID } } }) => {
    return (
        <div className='geekleague-bg row'>
            <h2>{geekLeagueID}</h2>
        </div>
    )
}

export default GeekLeague
