import React from 'react'
import Loader from './Loader'

const SavePronoButton = ({ saveSuccess, matchStarted, saveProno, saving, seeLeaguePronos }) => {

    return !matchStarted && saveSuccess ? <>

        <small className='legend-save-btn'>Prono enregistré</small>
        <button
            className='btn my-btn save-prono saved-prono'
            disabled={matchStarted}
            onClick={saveProno}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
        </button>

    </> : !matchStarted ? <>

        <small className='legend-save-btn'>Enregistrer prono</small>
        <button
            className='btn my-btn save-prono'
            disabled={matchStarted}
            onClick={saveProno}
        >
            {!saving && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>}
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                </button>
            </>
}

export default SavePronoButton
