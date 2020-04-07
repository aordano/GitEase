// ! ###  - Actions Space Elements - ###

// TODO This file lacks everything practically

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// tslint:disable-next-line: no-duplicate-imports
import { useState } from 'react';

import {
    Link
} from "react-router-dom";

// ---------------------
// --- Store Imports ---
// ---------------------

import { store } from '../../store/index.redux.store';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    ChangesTreeType,
    StagingCheckboxIndexType,
    SpinnerType
} from '../../types';

import { useSelector } from "../../types/redefinitions"
// ---------------------
// --- Icons Imports ---
// ---------------------

import * as Icon from 'react-feather';

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../../actions/basicWorkflowActions.redux.action';

import {
    SetStagingStatusAction,
    SetGlobalStagingStatusAction
} from '../../actions/commonActions.redux.action';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const mockData = require("../../data.mock")

const localization = require(`../../lang/${mockData.lang}`)

// ----------------------
// --- Static Imports ---
// ----------------------

require('../../static/scss/wizards/firstTime.scss');


import {
    SpinnerComponent
} from "../misc"

// ------------------------
// --- SSH Keys Imports ---
// ------------------------

import * as SSH from "../../functions/ssh"

// --------------------------------
// --- Actions Space Components ---
// --------------------------------

export const FirstTimeWizardGreeter: React.FC = () => {
    // -- Simple dummy test component.

    // TODO Create the buttons to perform the functions for every workflow

    return (
        <div className={'first-time-wizard'}>
            <h2>{localization.firstTimeWizardTitle}</h2>
            <hr/>
            <div className={"greeting-container"}>
                <h3>
                    Bienvenido. Esta es tu primera vez utilizando GitEase.
                </h3>
                <p className={"center"}>
                    Este es un software de control de versiones que utiliza como motor el popular sistema Git.
                </p>
                <p className={"center"}>
                    Este asistente realizara algunas preguntas y en base a ellas determinaremos tu configuracion inicial.
                </p>
                <p className={"center"}>
                    Ante cualquier duda, terminos o conceptos que puedan no ser familiares seran resaltados, 
                     <a className={"information-link"}>de esta manera</a> para que puedas acceder a mas informacion al respecto.
                </p>
                <p className={"center"}>
                    No te preocupes, no es necesario que sepas nada de antemano para poder utilizar este software.
                </p>
                <h3>
                    Buena suerte!
                </h3>
            </div>
            <Link className={"navigator-right"} to={"/firstwizardp2"}>
                <Icon.ChevronRight/>
            </Link>
        </div>
    )
};

export const FirstTimeWizardP2: React.FC = () => {
    
    const title = <h2>Paso uno</h2>
    const loaderContents = <div className={"greeting-container"}>
                            <h3>
                                En este paso el sistema busca <a className={"information-link"}>claves SSH</a> preexistentes.
                            </h3>
                            <SpinnerComponent name={"SSHComprobation"} message={"Buscando claves SSH en el sistema..."}/>
                        </div>
    const existentKeysContents = <div className={"greeting-container"}>
                                    <h3>
                                        En este paso el sistema busca <a className={"information-link"}>claves SSH</a> preexistentes.
                                    </h3>
                                    <p className={"center"}>
                                        El sistema encontro claves previas. Vamos a usar esas.
                                    </p>
                                    <div className={"action-buttons-centering"}>
                                        <Link className={"wizard-action-button"} to={"/firstwizardp3"}>
                                            Continuar
                                        </Link>
                                    </div>
                                </div>
    const generateKeysContents = <div className={"greeting-container"}>
                                    <h3>
                                        En este paso el sistema busca <a className={"information-link"}>claves SSH</a> preexistentes.
                                    </h3>
                                    <p className={"center"}>
                                        El sistema no encontro claves previas o estaban corruptas, y un juego nuevo fue creado automaticamente.
                                    </p>
                                    <div className={"action-buttons-centering"}>
                                        <Link className={"wizard-action-button"} to={"/firstwizardp3"}>
                                            Continuar
                                        </Link>
                                    </div>
                                </div>
    const navigation = <Link className={"navigator-left"} to={"/firstwizardgreeting"}>
                            <Icon.ChevronLeft/>
                        </Link>
    
    const wrappingComponent = React.createElement(
        "div",
        {className: "first-time-wizard"},
        [
            title,
            "hr",
            loaderContents,
            navigation
        ]
    )

    const [contents, setContents] = React.useState(wrappingComponent)
    const [hasKeysBeenChecked, setKeysCheckStatus] = React.useState(false)
    
    if (!hasKeysBeenChecked) {
            
        setKeysCheckStatus(true)

        Promise.resolve(SSH.checkKeysIntegrity()).then((doKeysExistAndAreOK) => {            
            if (doKeysExistAndAreOK) {  
                setContents(React.createElement(
                    "div",
                    {className: "first-time-wizard"},
                    [
                        title,
                        "hr",
                        existentKeysContents,
                        navigation
                    ]
                ))
            } else {
                Promise.resolve(SSH.keygen("bla")).then(
                    () => {
                        setContents(React.createElement(
                            "div",
                            {className: "first-time-wizard"},
                            [
                                title,
                                "hr",
                                generateKeysContents,
                                navigation
                            ]
                        ))
                    }
                )
            }
        })
    }
    
    return contents
};