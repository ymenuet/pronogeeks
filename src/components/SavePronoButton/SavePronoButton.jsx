import React from 'react'
import { useDispatch } from 'react-redux'
import { SaveIcon, ValidateIcon, ViewPronoIcon } from '../Icons'
import { Loader } from '..'
import { useUser, useSaveOneProno } from '../../utils/hooks'
import { openNotification } from '../../utils/functions'
import './savePronoButton.css'

import { savePronogeek } from '../../actions/pronogeekActions'

const SavePronoButton = ({ pronogeek, fixture, modified, matchStarted, homeScore, awayScore, seeLeaguePronos }) => {

    const { user } = useUser()

    const { saving, saveSuccess, setSaveSuccess } = useSaveOneProno(pronogeek, fixture)

    const dispatch = useDispatch()

    const disabled = matchStarted || (!homeScore && parseInt(homeScore) !== 0) || (!awayScore && parseInt(awayScore) !== 0)

    const saveProno = () => {
        setSaveSuccess(false)

        // Error message if someone takes out the "disabled" property of a passed game to change their pronostics
        if (matchStarted) return openNotification('error', 'Erreur', 'Ce match est déjà commencé ou fini. Tu ne peux plus changer ton prono.')

        // Warning message if one of the inputs doesn't have a number
        if (
            (!homeScore && parseInt(homeScore) !== 0) ||
            (!awayScore && parseInt(awayScore) !== 0)
        ) return openNotification('warning', 'Attention', `Tu n'as pas défini de score pour le match ${fixture.homeTeam.name} - ${fixture.awayTeam.name}. Prono non enregistré.`)

        dispatch(savePronogeek(homeScore, awayScore, fixture))
    }

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
