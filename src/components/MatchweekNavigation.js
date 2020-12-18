import React from 'react'
import { GoBackIcon, GoNextIcon } from './Icons'

const MatchweekNavigation = ({ matchweekNumber, matchweekPoints, matchweekCorrects, matchweekBonus, previousPage, nextPage, myClassName, noPronos }) => {

    return <div className='previous-next-btns'>

        {parseInt(matchweekNumber) !== 1 && <div>
            <button
                className='btn my-btn'
                onClick={previousPage}
            >
                <GoBackIcon />
            </button>
        </div>}

        {!noPronos && matchweekBonus > 0 && <div className={myClassName}>
            <p>Total J{matchweekNumber} : {matchweekPoints} pts<br />dont {matchweekBonus} pts bonus ({matchweekCorrects}/10)</p>
        </div>}
        {!noPronos && !matchweekBonus && <div className={myClassName}>
            <p>Total J{matchweekNumber} : {matchweekPoints} pts ({matchweekCorrects}/10)</p>
        </div>}

        {noPronos && <div className='score-top'>
            <p>Total J{matchweekNumber} : ? pts (?/10)</p>
        </div>}

        {parseInt(matchweekNumber) !== 38 && <div>
            <button
                className='btn my-btn'
                onClick={nextPage}
            >
                <GoNextIcon />
            </button>
        </div>}

    </div>
}

export default MatchweekNavigation
