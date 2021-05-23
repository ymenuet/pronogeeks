import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, GeekSelector } from '../../components'
import { Input } from '../../ui/components'
import { openNotification } from '../../utils/helpers'
import { SeasonSelector } from '../../utils/components'
import { useRedirectNewLeague, useUpcomingAndUndergoingSeasons, useForm } from '../../utils/hooks'
import './createGeekleague.css'
import { InputWrapper } from './CreateGeekLeague.styled'

import { createLeague } from '../../state/actions/geekleagueActions'

const formNames = {
    name: 'name',
    geeks: 'geeks',
    season: 'season'
}

const CreateGeekLeague = ({ loading }) => {
    useRedirectNewLeague()

    const { seasons, errorSeasons } = useUpcomingAndUndergoingSeasons()

    const dispatch = useDispatch()
    const createNewLeague = async ({ name, geeks, season }) => {
        if (!name || !geeks || !geeks.length || !season) return openNotification('warning', 'Attention', 'Tous les champs sont requis.')
        dispatch(createLeague({ name, geeks, season }))
    }

    const { formData, handleInputChange, handleValueChange, handleSubmit } = useForm({
        initialValues: {
            [formNames.name]: '',
            [formNames.geeks]: [],
            [formNames.season]: ''
        },
        onSubmit: createNewLeague
    })

    const creatingLeague = useSelector(({ geekleagueReducer }) => geekleagueReducer.loading)

    return <div className='geekleague-bg'>
        {creatingLeague || loading ? (

            <Loader />

        ) : (

            <div className='geekleague-form'>

                <div className='col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3'>

                    <h2>Créer une ligue</h2>

                    <form onSubmit={handleSubmit}>

                        <InputWrapper>
                            <Input
                                value={formData.name}
                                name={formNames.name}
                                onChange={handleInputChange}
                                style={{ borderRadius: 15.8 }}
                                placeholder='Ma Ligue Geek'
                                label="Nom de la ligue :"
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <GeekSelector
                                name={formNames.geeks}
                                onChange={handleValueChange(formNames.geeks)}
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <SeasonSelector
                                seasons={seasons}
                                error={errorSeasons}
                                name={formNames.season}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>


                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                type='submit'
                                className='btn my-btn create-league-btn'
                                style={{ marginTop: 10 }}
                                disabled={creatingLeague}
                            >
                                Créer ligue
                                </button>
                        </div>

                    </form>

                </div>

            </div>
        )
        }

    </div>
}

export default CreateGeekLeague