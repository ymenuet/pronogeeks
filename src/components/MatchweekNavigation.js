import React from 'react'

const MatchweekNavigation = ({ matchweekNumber, matchweekPoints, matchweekCorrects, matchweekBonus, previousPage, nextPage, myClassName, noPronos }) => {

    return <div className='previous-next-btns'>

        {parseInt(matchweekNumber) !== 1 && <div>
            <button
                className='btn my-btn'
                onClick={previousPage}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
            </button>
        </div>}

    </div>
}

export default MatchweekNavigation
