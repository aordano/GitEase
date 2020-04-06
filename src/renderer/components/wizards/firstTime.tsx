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
    // -- Simple dummy test component.

    // TODO Create the buttons to perform the functions for every workflow

    return (
        <div className={'first-time-wizard'}>
            <h2>Paso uno.</h2>
            <hr/>
            <div className={"greeting-container"}>
                <h3>
                    En este paso el sistema buscara archivos de configuracion preexistentes, <a className={"information-link"}>claves SSH</a> e instalaciones previas.
                </h3>
                <p className={"center"}>
                    [mostrar cargador]
                </p>
                <p className={"center"}>
                    [resultado si hay claves SSH]
                     Se encontraron claves SSH presentes en el sistema. Vamos a cargarlas a GitEase.
                    [mostrar siguiente parte]
                </p>
                <p className={"center"}>
                    [Resultado si hay archivos de configuracion de GitEase presentes en el sistema]
                     Parece que provienes de una instalacion anterior. Podemos intentar cargar la configuracion previa o intentarlo de cero.
                    [ir a pagina de carga de configuracion previa]
                    [ir a pagina de creacion de configuracion de gitease]
                </p>
                <p className={"center"}>
                    [resultado si no hay claves SSH]
                     No se encontraron claves SSH en el sistema. Vamos a crear unas! 
                    [ir a pagina de creacion de claves]
                </p>
            </div>
            <Link className={"navigator-left"} to={"/firstwizardgreeting"}>
                <Icon.ChevronLeft/>
            </Link>
            <Link className={"navigator-right"} to={"/firstwizardp3"}>
                <Icon.ChevronRight/>
            </Link>
        </div>
    )
};