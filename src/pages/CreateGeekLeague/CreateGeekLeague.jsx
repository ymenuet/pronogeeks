import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Loader, GeekSelector } from "../../components";
import { Input } from "../../ui/components";
import { SeasonSelector } from "../../utils/components";
import {
  useRedirectNewLeague,
  useUpcomingAndUndergoingSeasons,
  useForm,
} from "../../utils/hooks";
import { arrayNotEmpty } from "../../utils/helpers/inputValidations";
import "./createGeekleague.css";
import { InputWrapper } from "./CreateGeekLeague.styled";

import { createLeague } from "../../state/actions/geekleagueActions";

const formNames = {
  name: "name",
  geeks: "geeks",
  season: "season",
};

const CreateGeekLeague = ({ loading }) => {
  const { t } = useTranslation();

  useRedirectNewLeague();

  const { seasons, errorSeasons } = useUpcomingAndUndergoingSeasons();

  const dispatch = useDispatch();
  const createNewLeague = ({ name, geeks, season }) => {
    dispatch(createLeague({ name, geeks, season }));
  };

  const { inputsProps, handleSubmit } = useForm({
    initialValues: {
      [formNames.name]: "",
      [formNames.geeks]: [],
      [formNames.season]: "",
    },
    onSubmit: createNewLeague,
    validations: {
      [formNames.name]: {
        message: t("createGeekleague.formValidations.name"),
      },
      [formNames.geeks]: {
        validation: arrayNotEmpty,
        message: t("createGeekleague.formValidations.geeks"),
      },
      [formNames.season]: {
        message: t("createGeekleague.formValidations.season"),
      },
    },
  });

  const creatingLeague = useSelector(
    ({ geekleagueReducer }) => geekleagueReducer.loading
  );

  return (
    <div className="geekleague-bg">
      {creatingLeague || loading ? (
        <Loader />
      ) : (
        <div className="geekleague-form">
          <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-xl-6 offset-xl-3">
            <h2>Créer une ligue</h2>

            <form onSubmit={handleSubmit}>
              <InputWrapper>
                <Input
                  {...inputsProps[formNames.name]}
                  placeholder="Ma Ligue Geek"
                  label="Nom de la ligue :"
                  labelColor="white"
                />
              </InputWrapper>

              <InputWrapper>
                <SeasonSelector
                  {...inputsProps[formNames.season]}
                  seasons={seasons}
                  error={errorSeasons}
                  noOptionMessage={t("createGeekleague.noSeasonOption")}
                  labelColor="white"
                />
              </InputWrapper>

              <InputWrapper>
                <GeekSelector
                  {...inputsProps[formNames.geeks]}
                  labelColor="white"
                />
              </InputWrapper>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  className="btn my-btn create-league-btn"
                  style={{ marginTop: 10 }}
                  disabled={creatingLeague}
                >
                  Créer ligue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGeekLeague;
