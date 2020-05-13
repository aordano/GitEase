// ! ###  - Argentine Spanish Localization - ###

import {
    labelType
}  from "../types"

// ------------------
// --- Commit Box ---
// ------------------

export const commitMessageTooltip = "Dale un nombre corto y breve que los describa."
export const commitMessagePlaceholder = "Nombra tus cambios"
export const commitButtonTooltip = "Publica tus cambios."
export const commitButtonText = "Ir"
export const commitBoxTitle = "Confirma tus cambios:"
export const commitWhatDescriptionPlaceholder = 'Describe lo que hiciste, con una explicación breve'
export const commitWhyDescriptionPlaceholder = 'Describe por qué realizaste los cambios, con una explicación breve'
export const commitBoxTagsPlaceholder = "Agrega una etiqueta"
export const commitBoxDescriptionName = "Archivo"
export const commitBoxDescriptionWhat = "Qué"
export const commitBoxDescriptionWhy = "Por qué"

// ------------------------
// --- Commit Info Pane ---
// ------------------------

export const commitInfoPaneInvalidDescription = "Esta confirmación no contiene una descripción válida"
export const commitInfoPaneCommitDataMessageCommitMade = "Confirmación realizada el "
export const commitInfoPaneCommitDataMessageCommitBy = " por "
export const commitInfoPaneCommitDataMessagePublishedOn = " Esta confirmación fue publicada en la rama "
export const commitInfoPaneCommitDataMessageBranchAndHash = ", y tiene identificador único "
export const commitInfoPaneNavigatorGraphView = "Vista gráfica"
export const commitInfoPaneNavigatorDiffView = "Vista de diferencias"
export const commitInfoPaneChanges = "Cambios"
export const commitInfoPaneReason = "Motivo"

// --------------------------
// --- Commit Box Alerts ---
// --------------------------

export const commitSuccessMessage = "¡Éxito!"
export const commitFailureMessage = "Hubo un error inesperado :("
export const commitProcessMessage = "Subiendo cambios..."

// --------------------
// --- Changes Area ---
// --------------------

export const changesAreaNoChangesTitle = "No hay archivos modificados" 
export const changesAreaChangesTitle = "archivos modificados"
export const changesAreaGlobalCheckboxTooltip = "Asigna/desasigna todos los cambios realizados."
export const changesAreaElementCheckboxTooltip = "Asigna/desasigna los cambios en este archivo."

// -------------------------
// --- First Time Wizard ---
// -------------------------

export const firstTimeWizardTitle = "Asistente de configuración de GitEase"
export const firstTimeWizardDescription = "Bienvenido a GitEase! Primero necesitamos configurar algunas cosas, así que por favor completa este asistente."

// -------------------------
// --- Git Graph Messages ---
// --------------------------

export const gitGraphLoadingMessage = "Cargando información del repositorio..."

// ----------------------
// --- Git Graph Nodes ---
// ----------------------

export const nodeHash = "Id"
export const nodeAuthor = "Por"
export const nodeSubject = "Mensaje" 

// ------------------------
// --- Git Graph Labels ---
// ------------------------

export const labelInitialCommit = "Confirmación inicial"

// ---------------------
// --- Context Menus ---
// ---------------------
    
export const defaultContextMenuLaunchWizard = "Abrir asistente"
export const defaultContextMenuNewProject = "Nuevo proyecto"
export const defaultContextMenuOpenProject = "Abrir proyecto"
export const defaultContextMenuChangeProject = "Cambiar de proyecto"
export const defaultContextMenuProjectSettings = "Configuración de proyecto"
export const defaultContextMenuChangeRepository = "Cambiar de repositorio"
export const defaultContextMenuRepositorySettings = "Configuración de repositorio"
export const defaultContextMenuGeneralSettings = "Configuración general"
    
export const nodeGraphContextMenuRevertCommit = "Revertir a esta confirmación"
export const nodeGraphContextMenuChangeBranch = "Cambiar a esta rama"
export const nodeGraphContextMenuViewCommit = "Ver información de la confirmación"
export const nodeGraphContextMenuCreateBranch = "Crear una rama desde aquí"
export const nodeGraphContextMenuMergeBranch = "Combinar hacia esta rama"
export const nodeGraphContextMenuRebase = "Reunificar"
export const nodeGraphContextMenuViewDiff = "Ver diferencias"
    
export const graphBackgroundContextMenuRedraw = "Redibujar gráfico"
export const graphBackgroundContextMenuChangeRepository = "Cambiar de repositorio"
export const graphBackgroundContextMenuRepositorySettings = "Configuración de repositorio"
export const graphBackgroundContextMenuProjectSettings = "Configuración de proyecto"
export const graphBackgroundContextMenuProjectInformation = "Ver información del proyecto"

export const commitButtonContextMenuCommitOnly = "Sólo confirmar"
export const commitButtonContextMenuCommitAndPush = "Confirmar y enviar"
export const commitButtonContextMenuPushOnly = "Sólo enviar"
export const commitButtonContextMenuRevertLast = "Revertir última confirmación"

export const stagingAreaContextMenuStageAll = "Preparar todos los archivos"
export const stagingAreaContextMenuDiscardAll = "Descartar todos los cambios"
export const stagingAreaContextMenuStash = "Archivar cambios"
export const stagingAreaContextMenuOpen = "Abrir proyecto en el explorador de archivos"

export const stagingAreaItemContextMenuStage = "Preparar archivo"
export const stagingAreaItemContextMenuDiscard = "Descartar cambios"
export const stagingAreaItemContextMenuShow = "Mostrar en el explorador de archivos"
export const stagingAreaItemContextMenuOpen = "Abrir archivo"

// -------------------------
// --- Application Menus ---
// -------------------------

export const applicationMenuView = "Ver"
export const applicationMenuViewLaunchWizard = "Abrir asistente"
export const applicationMenuViewProjectInfo = "Información del proyecto"
export const applicationMenuViewRepoInfo = "Información del repositorio"
export const applicationMenuViewBranchInfo = "Información de una rama"
export const applicationMenuViewCommitInfo = "Información de una confirmación"
export const applicationMenuViewCompareBranches = "Comparar ramas..."
export const applicationMenuViewCompareCommits = "Comparar confirmaciones..."
export const applicationMenuViewLastDiff = "Última diferencia"
export const applicationMenuViewDiffFrom = "Diferencias desde..."
export const applicationMenuViewGraphView = "Vista gráfica"
export const applicationMenuViewDiffView = "Vista de diferencias"
export const applicationMenuViewOpenFolder = "Abrir directorio de trabajo en el explorador de archivos"

export const applicationMenuChanges = "Cambios"
export const applicationMenuChangesFiles = "Archivos"
export const applicationMenuChangesFilesStageAll = "Agregar todos los archivos al área de preparación"
export const applicationMenuChangesFilesDiscardAll = "Descartar todos los cambios"
export const applicationMenuChangesFilesStash = "Archivar cambios"
export const applicationMenuChangesCommit = "Confirmación"
export const applicationMenuChangesCommitCommitOnly = "Sólo confirmar"
export const applicationMenuChangesCommitCommitAndPush = "Confirmar y enviar"
export const applicationMenuChangesCommitPushOnly = "Sólo enviar"
export const applicationMenuChangesCommitRevertLast = "Revertir última confirmación"
export const applicationMenuChangesCommitRevertTo = "Revertir a confirmación..."
export const applicationMenuChangesBranch = "Rama"
export const applicationMenuChangesBranchNewBranch = "Nueva rama desde la última confirmación"
export const applicationMenuChangesBranchBranchFrom = "Nueva rama desde..."
export const applicationMenuChangesBranchChange = "Cambiar rama activa"
export const applicationMenuChangesBranchMerge = "Combinar rama actual hacia...."
export const applicationMenuChangesBranchRename = "Renombrar rama..."
export const applicationMenuChangesBranchDelete = "Eliminar rama..."
export const applicationMenuChangesBranchRebase = "Reunificar"

export const applicationMenuManage = "Administrar"
export const applicationMenuManageRepository = "Repositorio"
export const applicationMenuManageRepositoryChange = "Cambiar repositorio"
export const applicationMenuManageRepositorySettings = "Configuración de repositorio"
export const applicationMenuManageRepositoryInfo = "Ver información del repositorio"
export const applicationMenuManageProject = "Proyecto"
export const applicationMenuManageProjectNew = "Nuevo proyecto"
export const applicationMenuManageProjectOpen = "Abrir proyecto"
export const applicationMenuManageProjectChange = "Cambiar proyecto"
export const applicationMenuManageProjectSettings = "Configuración del proyecto"

export const applicationMenuSettings = "Configuración"
export const applicationMenuSettingsAccounts = "Configuración de cuentas"
export const applicationMenuSettingsGithub = "Integración con Github"
export const applicationMenuSettingsGitlab = "Integración con Gitlab"
export const applicationMenuSettingsKeys = "Claves"
export const applicationMenuSettingsProject = "Configuración del proyecto"
export const applicationMenuSettingsRepo = "Configuración del repositorio"
export const applicationMenuSettingsGeneral = "Configuración general"

// -------------------
// --- Git History ---
// -------------------
 
export const gitHistoryTitle = "Historial"
export const gitHistoryCommitedName = "confirmó"
export const gitHistoryElementMinutesAgo = "minutos atrás"
export const gitHistoryElementHoursAgo = "horas atrás"
export const gitHistoryElementDaysAgo = "días"
export const gitHistoryElementArticle = "el"

// -------------------
// --- Git labels ---
// -------------------

export const labelsDictionary: labelType[] = [
    {
        label: "caract.",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "característica",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "arreglo",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "arreglos",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "estructura",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "documentación",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "docs",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "reorganización",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "prueba",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "pruebas",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "andamiaje",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "experimentos",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "experimento",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "leng",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "lenguage",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "limpieza",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "estilo",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "estilizado",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "caract. menor",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    
]
 
