import React from 'react'
import '../styles/selectMatchweek.css'

const SelectMatchweek = ({ matchweek, changeMatchweek, lastMatchweek, seeSelectOptions, setSeeSelectOptions, backgroundColor, fontSize }) => {

    const matchweekArr = []
    for (let i = 1; i <= lastMatchweek; i++) {
        matchweekArr.push(i)
    }
    const size = seeSelectOptions ? lastMatchweek > 6 ? 6 : lastMatchweek : 1

    return (
        <>
            <select
                defaultValue={matchweek}
                onChange={changeMatchweek}
                onClick={() => setSeeSelectOptions(!seeSelectOptions)}
                size={size}
                style={{ backgroundColor, fontSize }}
                className={`select-matchweek ${seeSelectOptions ? 'opened' : ''}`}
            >
                {matchweekArr.map(matchweek => <option key={matchweek} value={matchweek}>{matchweek}</option>)}
            </select>
            <select className={`select-matchweek invisible-select ${!seeSelectOptions ? 'invisible' : ''}`} style={{ fontSize }}>
                {matchweekArr.map(matchweek => <option key={matchweek} value={matchweek}>{matchweek}</option>)}
            </select>
        </>
    )
}

export default SelectMatchweek
