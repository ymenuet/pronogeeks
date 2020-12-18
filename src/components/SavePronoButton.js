import React from 'react'
import { SaveIcon, ValidateIcon, ViewPronoIcon } from './Icons'
import Loader from './Loader'

const SavePronoButton = ({ saveSuccess, matchStarted, saveProno, saving, seeLeaguePronos }) => {

    return !matchStarted && saveSuccess ? <>

        <small className='legend-save-btn'>Prono enregistré</small>
        <button
            className='btn my-btn save-prono saved-prono'
            disabled={matchStarted}
            onClick={saveProno}
        >
            <ValidateIcon />
        </button>

    </> : !matchStarted ? <>

        <small className='legend-save-btn'>Enregistrer prono</small>
        <button
            className='btn my-btn save-prono'
            disabled={matchStarted}
            onClick={saveProno}
        >
            {!saving && <SaveIcon />}
            {saving && <Loader
                fontSize='1.5rem'
                tip=''
                container={false}
            />}
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
