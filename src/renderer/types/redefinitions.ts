// ! ###  - Redefinition types File - ###

// ---------------------------
// --- React-Redux Imports ---
// ---------------------------

import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

// ---------------------------
// --- Store State Imports ---
// ---------------------------

import { RootState } from '../store/index.redux.store';

// -------------------------------------------
// --- Typed Redefinition of useSelector() ---
// -------------------------------------------

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;