import React, { useEffect } from 'react'
import '../styles/inputMatchweek.css'

const InputMatchweek = ({ matchweekInit, matchweekFromInput, setMatchweekFromInput, changeMatchweek, lastMatchweek, backgroundColor, fontSize }) => {

    useEffect(() => {
        setMatchweekFromInput(matchweekInit)
    }, [matchweekInit, setMatchweekFromInput])

    const confirmMatchweek = e => {
        e.preventDefault()
        if (matchweekFromInput === matchweekInit) return
        changeMatchweek(matchweekFromInput)
    }

    const handleInput = e => {
        setMatchweekFromInput(e.target.value)
    }

    return <div className='input-matchweek-container'>
        <input
            className='input-matchweek'
            value={matchweekFromInput}
            onChange={handleInput}
            type='number'
            min='1'
            max={lastMatchweek}
            style={{ backgroundColor, fontSize }}
        />
        <button className='button-input-matchweek' onClick={confirmMatchweek}><span style={{ color: backgroundColor }}>OK</span></button>
    </div>
}

export default InputMatchweek
