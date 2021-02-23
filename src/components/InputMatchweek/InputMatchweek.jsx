import React, { useEffect } from 'react'
import './inputMatchweek.css'

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

    return matchweekFromInput || parseInt(matchweekFromInput) === 0 || matchweekFromInput === '' ? <form className='input-matchweek-container cancel-target' onSubmit={confirmMatchweek}>
        <input
            className='input-matchweek cancel-target'
            value={matchweekFromInput}
            onChange={handleInput}
            type='number'
            min='1'
            max={lastMatchweek}
            style={{ backgroundColor, fontSize }}
        />
        <button className='button-input-matchweek cancel-target' type='submit'><span className='cancel-target' style={{ color: backgroundColor }}>OK</span></button>
    </form> : null
}

export default InputMatchweek
