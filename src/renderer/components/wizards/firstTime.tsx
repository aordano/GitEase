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

import {
    SetReposConfigInformationAction
} from '../../actions/configActions.redux.action';

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

// ----------------------
// --- Config Imports ---
// ----------------------

import * as GeneralFunctions from "../../functions"

import * as Configurator from "../../functions/config"

import * as Path from "path"
import * as Electron from "electron"

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
                                        <Link className={"wizard-action-button normal"} to={"/firstwizardp3"}>
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
                                        <Link className={"wizard-action-button normal"} to={"/firstwizardp3"}>
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
            <hr key={"IDSEPARATOR"}/>,
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
                        <hr key={"IDSEPARATOR"}/>,
                        existentKeysContents,
                        navigation
                    ]
                ))
            } else {
                // TODO include small form to include comment in key
                Promise.resolve(SSH.keygen("bla")).then( // TODO include comment in key
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

export const FirstTimeWizardP3: React.FC = () => {

    const generateDefaultConfig = () => {

        const defaultConfig = {
            UIConfig: {
                language: "en_US",
                theme: "light",
                mainView: "graph",
                showSidePanelsByDefault: true,
                showAdditionalInformation: true
            },
            SSHConfig: {
                currentKeysLocation: Path.join(Electron.remote.app.getPath("home"), ".ssh"),
                keysDefaultLocation: Path.join(Electron.remote.app.getPath("home"), ".ssh"),
                keysLocations: [
                    Path.join(Electron.remote.app.getPath("home"), ".ssh")
                ]
            },
            ReposConfig: {
                reposDefaultLocation: Path.join(Electron.remote.app.getPath("home"), "repositories"),
                reposLocations: [
                    Path.join(Electron.remote.app.getPath("home"), "repositories"),
                ],
                activeRepo: Path.join(Electron.remote.app.getPath("home"))
            },
            CurrentGitConfig: {
                excludedPaths: [
                    ""
                ],
                submodules: false,
                submodulesPaths: [
                    ""
                ],
                enforcePreCommitHooks: false,
                enforcePrePushHooks: false,
                enforcePostCommitHooks: false,
                enforcePostMergeHooks: false,
                enforceAllHooks: false,
                currentBranch: "master",
                currentRemote: "origin"
            },
            GitConfigs: [
                {
                    excludedPaths: [
                        ""
                    ],
                    submodules: false,
                    submodulesPaths: [
                        ""
                    ],
                    enforcePreCommitHooks: false,
                    enforcePrePushHooks: false,
                    enforcePostCommitHooks: false,
                    enforcePostMergeHooks: false,
                    enforceAllHooks: false,
                    currentBranch: "master",
                    currentRemote: "origin"
                }
            ],
            UserDataConfig: {
                currentUser: {
                    userName: "Default",
                    userEmail: "default@example.com",
                    userProfilePic: "",
                    userFetchedFrom: "local"
                },
                usersList: [
                    {
                        userName: "Default",
                        userEmail: "default@example.com",
                        userProfilePic: "",
                        userFetchedFrom: "local"
                    }
                ]
            },
            CurrentProjectConfig: {
                currentWorkflow: "basic",
                handholding: true,
                autoSaveChanges: true,
                autoSaveTimeoutMinutes: 5,
                opinionatedWorkflow: true,
                resolveSubmodulesAsIndependentRepos: true,
                integration: "local"
            },
            ProjectConfigs: [
                {
                    currentWorkflow: "basic",
                    handholding: true,
                    autoSaveChanges: true,
                    autoSaveTimeoutMinutes: 5,
                    opinionatedWorkflow: true,
                    resolveSubmodulesAsIndependentRepos: true,
                    integration: "local"
                }
            ]
        }

        const labelsConfig = [
            {
                "label": "feat",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "feature",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "fix",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "fixes",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "structure",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "documentation",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "docs",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "refactor",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "test",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "tests",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "scaffolding",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "experiments",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "experiment",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "lang",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "language",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "cleanup",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "style",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "styling",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "minor feat",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "caract.",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "característica",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "arreglo",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "arreglos",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "estructura",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "documentación",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "docs",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "reorganización",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "prueba",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "pruebas",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "andamiaje",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "experimentos",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "experimento",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "leng",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "lenguage",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "limpieza",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "estilo",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "estilizado",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            },
            {
                "label": "caract. menor",
                "labelColor": {
                    "r": 140,
                    "g": 70, 
                    "b": 90
                }
            }
            
        ]

        Configurator.deleteConfigWithBackup()
        Configurator.writeConfigToFile(defaultConfig)
        Configurator.writeLabelsConfigToFile(labelsConfig)

        window.localStorage.setItem("doesPreexistentConfigExists", "false")

        setContents(React.createElement(
            "div",
            {className: "first-time-wizard"},
            [
                title,
                <hr key={"IDSEPARATOR"}/>,
                overrideConfigContents,
                navigation
            ]
        ))

    }
    
    const title = <h2>Paso dos</h2>
    const loaderContents = <div className={"greeting-container"}>
                            <h3>
                                En este paso el sistema busca archivos de configuracion preexistentes y datos de instalaciones previas.
                            </h3>
                            <SpinnerComponent name={"ConfigComprobation"} message={"Buscando archivos de configuracion en el sistema..."}/>
                        </div>
    const existentConfigContents = <div className={"greeting-container"}>
                                    <h3>
                                        En este paso el sistema busca archivos de configuracion preexistentes y datos de instalaciones previas.
                                    </h3>
                                    <p className={"center"}>
                                        El sistema encontro configuracion previa, por defecto esta configuracion va a ser utilizada y puede cambiarse 
                                        desde dentro de la aplicacion. De lo contrario se puede optar por resetear la configuracion a sus valores por defecto.
                                    </p>
                                    <div className={"action-buttons-centering"}>
                                        <Link className={"wizard-action-button normal"} to={"/firstwizardp4"}>
                                            Continuar
                                        </Link>
                                    </div>
                                    <div className={"action-buttons-centering"}>
                                        <a
                                            className={"wizard-action-button danger"}
                                            onClick={generateDefaultConfig}
                                        >
                                            Comenzar de cero
                                        </a>
                                    </div>
                                </div>
    const generateConfigContents = <div className={"greeting-container"}>
                                    <h3>
                                        En este paso el sistema busca archivos de configuracion preexistentes y datos de instalaciones previas.
                                    </h3>
                                    <p className={"center"}>
                                        El sistema genero automaticamente un archivo de configuracion con los valores por defecto. Estos valores pueden
                                        ser cambiados en cualquier momento desde dentro de la aplicacion.
                                    </p>
                                    <div className={"action-buttons-centering"}>
                                        <Link className={"wizard-action-button normal"} to={"/firstwizardp4"}>
                                            Continuar
                                        </Link>
                                    </div>
                                </div>
    const overrideConfigContents = <div className={"greeting-container"}>
                                    <h3>
                                        En este paso el sistema busca archivos de configuracion preexistentes y datos de instalaciones previas.
                                    </h3>
                                    <p className={"center"}>
                                        El sistema genero automaticamente un archivo de configuracion con los valores por defecto y 
                                        guardo una copia de seguridad de la configuracion anterior, que puede ser restaurada en cualquier momento. Estos valores pueden
                                        ser cambiados en cualquier momento desde dentro de la aplicacion.
                                    </p>
                                    <div className={"action-buttons-centering"}>
                                        <Link className={"wizard-action-button normal"} to={"/firstwizardp4"}>
                                            Continuar
                                        </Link>
                                    </div>
                                </div>
    const navigation = <Link className={"navigator-left"} to={"/firstwizardp2"}>
                            <Icon.ChevronLeft/>
                        </Link>
    
    const wrappingComponent = React.createElement(
        "div",
        {className: "first-time-wizard"},
        [
            title,
            <hr key={"IDSEPARATOR"}/>,
            loaderContents,
            navigation
        ]
    )

    const [contents, setContents] = React.useState(wrappingComponent)
    const [hasConfigBeenChecked, setConfigCheckStatus] = React.useState(false)
    
    if (!hasConfigBeenChecked) {
            
        setConfigCheckStatus(true)

        Promise.resolve(Configurator.checkIfConfigExist()).then((doConfigExistAndIsOK) => {            
            if (doConfigExistAndIsOK) {  
                window.localStorage.setItem("doesPreexistentConfigExists", "true")
                setContents(React.createElement(
                    "div",
                    {className: "first-time-wizard"},
                    [
                        title,
                        <hr key={"IDSEPARATOR"}/>,
                        existentConfigContents,
                        navigation
                    ]
                ))
            } else {
                generateDefaultConfig()
            }
        })
    }
    
    return contents
};

export const FirstTimeWizardP4: React.FC = () => {
    
    const title = <h2>Paso tres</h2>
    const loaderContents = <div className={"greeting-container"}>
                            <h3>
                                En este paso el sistema busca informacion de <a className={"information-link"}>identidad de Git</a> preexistente.
                            </h3>
                            <SpinnerComponent name={"IdentityComprobation"} message={"Buscando informacion de identidad..."}/>
                        </div>
    const existentGitConfigContents = <div className={"greeting-container"}>
                                    <h3>
                                    En este paso el sistema busca informacion de <a className={"information-link"}>identidad de Git</a> preexistente.
                                    </h3>
                                    <p className={"center"}>
                                        El sistema encontro un archivo de identidad previo. Vamos a usar ese.
                                    </p>
                                    <div className={"action-buttons-centering"}>
                                        <Link className={"wizard-action-button normal"} to={"/firstwizardp5"}>
                                            Continuar
                                        </Link>
                                    </div>
                                </div>
    const generateGitConfigContents = <div className={"greeting-container"}>
                                    <h3>
                                    En este paso el sistema busca informacion de <a className={"information-link"}>identidad de Git</a> preexistente.
                                    </h3>
                                    <p className={"center"}>
                                        El sistema no encontro configuracion previa. Vamos a crearla.
                                    </p>
                                    <div className={"action-buttons-centering"}>
                                        <Link className={"wizard-action-button normal"} to={"/firstwizardp4b"}>
                                            Continuar
                                        </Link>
                                    </div>
                                </div>
    const navigation = <Link className={"navigator-left"} to={"/firstwizardp3"}>
                            <Icon.ChevronLeft/>
                        </Link>
    
    const wrappingComponent = React.createElement(
        "div",
        {className: "first-time-wizard"},
        [
            title,
            <hr key={"IDSEPARATOR"}/>,
            loaderContents,
            navigation
        ]
    )

    const [contents, setContents] = React.useState(wrappingComponent)
    const [hasIdentityBeenChecked, setIdentityCheckStatus] = React.useState(false)
    
    if (!hasIdentityBeenChecked) {
            
        setIdentityCheckStatus(true)

        Promise.resolve(Configurator.checkIfGitConfigExist()).then((doConfigExist) => {    
            Promise.resolve(Configurator.readGitIdentity()).then((configData) => {
                if (doConfigExist && configData) {  
                    setContents(React.createElement(
                        "div",
                        {className: "first-time-wizard"},
                        [
                            title,
                            <hr key={"IDSEPARATOR"}/>,
                            existentGitConfigContents,
                            navigation
                        ]
                    ))
                } else {
                    setContents(React.createElement(
                        "div",
                        {className: "first-time-wizard"},
                        [
                            title,
                            "hr",
                            generateGitConfigContents,
                            navigation
                        ]
                    ))
                }
            })
        })
    }
    
    return contents
};



export const FirstTimeWizardP4b: React.FC = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleNameFormTextChange = (event: React.FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const handleEmailFormTextChange = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };

    const generateGitIdentityConfig = () => {
        GeneralFunctions.writeIdentityName(name)
        GeneralFunctions.writeIdentityEmail(email)
    }
    
    const title = <h2>Paso tres</h2>
    const pageContents = <div className={"greeting-container"}>
                            <h3>
                                En este paso vamos a crear la <a className={"information-link"}>identidad de Git</a>.
                            </h3>
                            <div className={"form-center"}>
                                <input
                                    title={"TODO"}
                                    className={"wizard-form-input"}
                                    placeholder={"Escribe tu nombre"}
                                    value={name}
                                    onChange={handleNameFormTextChange}
                                />
                                <input
                                    title={"TODO"}
                                    className={"wizard-form-input"}
                                    placeholder={"Escribe tu email"}
                                    value={email}
                                    onChange={handleEmailFormTextChange}
                                />
                            </div>
                            <div className={"action-buttons-centering"}>
                                <Link onClick={generateGitIdentityConfig} className={"wizard-action-button normal"} to={"/firstwizardp5"}>
                                    Continuar
                                </Link>
                            </div>
                        </div>
    const navigation = <Link className={"navigator-left"} to={"/firstwizardp3"}>
                            <Icon.ChevronLeft/>
                        </Link>
    
    const wrappingComponent = React.createElement(
        "div",
        {className: "first-time-wizard"},
        [
            title,
            <hr key={"IDSEPARATOR"}/>,
            pageContents,
            navigation
        ]
    )
    
    return wrappingComponent
};

export const FirstTimeWizardP5: React.FC = () => {

    const [reposDefaultLocation, setReposDefaultLocation] = React.useState(
        store.getState()!.configInformationReducer.ReposConfig.reposDefaultLocation
    )

    const [activeRepoLocation, setActiveRepoLocation] = React.useState(
        store.getState()!.configInformationReducer.ReposConfig.activeRepo
    )

    const selectReposDefaultLocation = () => {
        setReposDefaultLocation(Electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        })[0])
        const selectReposDefaultLocationButton = document.getElementById("repos-default-location-button")
        selectReposDefaultLocationButton!.className = "wizard-action-button done fanfare"
        selectReposDefaultLocationButton!.textContent = "Listo!"
        setTimeout(() => {
            selectReposDefaultLocationButton!.className = "wizard-action-button done"
            selectReposDefaultLocationButton!.textContent = "Seleccionar ubicacion por defecto de los proyectos/repositorios"
        }, 2000)
    }

    const selectActiveRepoLocation= () => {
        setActiveRepoLocation(Electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        })[0])
        const selectActiveRepoLocationButton = document.getElementById("active-repo-location-button")
        selectActiveRepoLocationButton!.className = "wizard-action-button done fanfare"
        selectActiveRepoLocationButton!.textContent = "Listo!"
        setTimeout(() => {
            selectActiveRepoLocationButton!.className = "wizard-action-button done"
            selectActiveRepoLocationButton!.textContent = "Selecciona un repositorio"
        }, 2000)
    }

    const storeConfigChanges = () => {
        const currentReposConfig = store.getState()!.configInformationReducer.ReposConfig
        store.dispatch(SetReposConfigInformationAction({
            reposDefaultLocation,
            activeRepo: activeRepoLocation,
            reposLocations: currentReposConfig.reposLocations
        }))

        const wholeConfig = store.getState()!.configInformationReducer
        Configurator.writeConfigToFile(wholeConfig)

        window.localStorage.setItem("firstTimeWizardCompleted", "1")
    }
    
    const title = <h2>Paso cuatro</h2>
    const loaderContents = <div className={"greeting-container"}>
                            <h3>
                                En este paso definimos algunas opciones generales.
                            </h3>
                            <SpinnerComponent name={"IdentityComprobation"} message={"Buscando informacion de identidad..."}/>
                        </div>
    
    const generateGeneralConfigContents = <div className={"greeting-container"}>
                                    <h3>
                                    En este paso definimos algunas opciones generales.
                                    </h3>
                                    <div className={"action-buttons-centering"}>
                                        <a 
                                            id={"repos-default-location-button"}
                                            className={"wizard-action-button normal"}
                                            onClick={selectReposDefaultLocation}
                                        >
                                            Seleccionar ubicacion por defecto de los proyectos/repositorios
                                        </a>
                                        <a 
                                            id={"active-repo-location-button"}
                                            className={"wizard-action-button normal"}
                                            onClick={selectActiveRepoLocation}
                                        >
                                            Selecciona un repositorio
                                        </a>
                                    </div>
                                    
                                    <div className={"action-buttons-centering"}>
                                        <Link
                                        // make it so it's disabled until all the options are selected
                                            className={"wizard-action-button normal"} 
                                            onClick={storeConfigChanges}
                                            // It should go to /firstimewizardp6 but we leave it there as to be able to start using the soft
                                            to={"/"}
                                        >
                                            Continuar
                                        </Link>
                                    </div>
                                </div>
    const navigation = <Link className={"navigator-left"} to={"/firstwizardp4"}>
                            <Icon.ChevronLeft/>
                        </Link>

    
    // Had to put it in here instead of below because of function assigment orders
    const overrideDefaultConfig = () => {
        setContents(React.createElement(
            "div",
            {className: "first-time-wizard"},
            [
                title,
                "hr",
                generateGeneralConfigContents,
                navigation
            ]
        ))
    }

    const existentGeneralConfigContents = <div className={"greeting-container"}>
                                    <h3>
                                    En este paso definimos algunas opciones generales.
                                    </h3>
                                    <p className={"center"}>
                                        El sistema usara la configuracion general encontrada previamente.
                                    </p>
                                    <div className={"action-buttons-centering"}>
                                        <Link 
                                            className={"wizard-action-button normal"} 
                                            onClick={()=> {
                                                window.localStorage.setItem("firstTimeWizardCompleted", "1")
                                            }}
                                            // It should go to /firstimewizardp6 but we leave it there as to be able to start using the soft
                                            to={"/"}
                                        > 
                                            Continuar
                                        </Link>
                                    </div>
                                    <div className={"action-buttons-centering"}>
                                        <a
                                            className={"wizard-action-button danger"}
                                            onClick={overrideDefaultConfig}
                                        >
                                            Ignorar configuracion guardada
                                        </a>
                                    </div>
                                </div>
    
    
    const wrappingComponent = React.createElement(
        "div",
        {className: "first-time-wizard"},
        [
            title,
            <hr key={"IDSEPARATOR"}/>,
            loaderContents,
            navigation
        ]
    )

    const [contents, setContents] = React.useState(wrappingComponent)
    const [hasConfigBeenChecked, setConfigCheckStatus] = React.useState(false)
    
    if (!hasConfigBeenChecked) {
            
        setConfigCheckStatus(true)

        Promise.resolve(Configurator.checkIfConfigExist()).then((doConfigExistAndIsOK) => {            
            if (doConfigExistAndIsOK) { 
                setContents(React.createElement(
                    "div",
                    {className: "first-time-wizard"},
                    [
                        title,
                        <hr key={"IDSEPARATOR"}/>,
                        existentGeneralConfigContents,
                        navigation
                    ]
                ))
            } else {
                setContents(React.createElement(
                    "div",
                    {className: "first-time-wizard"},
                    [
                        title,
                        "hr",
                        generateGeneralConfigContents,
                        navigation
                    ]
                ))
            }
        })
    }
    
    return contents
};