import React from 'react'
import { SaveIcon, ValidateIcon, ViewPronoIcon } from './Icons'
import Loader from './Loader'

const SavePronoButton = ({ user, saveSuccess, matchStarted, saveProno, saving, homeScore, awayScore, seeLeaguePronos }) => {

    const disabled = matchStarted || (!homeScore && parseInt(homeScore) !== 0) || (!awayScore && parseInt(awayScore) !== 0)

    return !matchStarted && saveSuccess ? <>

        <small className='legend-save-btn'>Prono enregistré</small>
        <button
            className='btn my-btn save-prono saved-prono'
            disabled={disabled}
            onClick={saveProno}
        >
            <ValidateIcon />
        </button>

    </> : !matchStarted ? <>

        <small className='legend-save-btn'>Enregistrer prono</small>
        <button
            className='btn my-btn save-prono'
            disabled={disabled}
            onClick={saveProno}
        >
            {!saving && <SaveIcon />}
            {saving && <Loader
                fontSize='1.5rem'
                tip=''
                container={false}
            />}
        </button>

    </> : user.geekLeagues.length > 0 && <>
        <small className='legend-save-btn'>Voir pronos</small>
        <button
            className='btn my-btn save-prono'
            onClick={seeLeaguePronos}
        >
            <ViewPronoIcon />
        </button>
    </>
}

export default SavePronoButton
