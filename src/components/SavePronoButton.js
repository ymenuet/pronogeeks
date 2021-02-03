import React from 'react'
import { SaveIcon, ValidateIcon, ViewPronoIcon } from './Icons'
import Loader from './Loader'
import '../styles/savePronoButton.css'

const SavePronoButton = ({ user, modified, saveSuccess, matchStarted, saveProno, saving, homeScore, awayScore, seeLeaguePronos }) => {

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

        <small className='legend-save-btn'>{saving ? 'Enregistrement...' : 'Enregistrer prono'}</small>
        <button
            className={`btn my-btn save-prono ${modified ? 'pending-save' : ''}`}
            disabled={disabled || saving}
            onClick={saveProno}
        >
            {!saving && <SaveIcon />}
            {saving && <Loader
                fontSize='1.5rem'
                tip=''
                container={false}
            />}
        </button>

    </> : matchStarted && !user.geekLeagues.length ? <>
        <button
            className='btn my-btn save-prono'
            disabled={true}
        >
            <SaveIcon />
        </button>
    </> : <>
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
