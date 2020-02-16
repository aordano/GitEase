// ! ###  - Common Functions Tests - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import promise from 'simple-git/promise';

// --------------------
// --- Type Imports ---
// --------------------

import { ContentNameType } from '../../../src/renderer/types';

// -------------------------
// --- Functions Imports ---
// -------------------------

import {
    parseStatus,
    stageFile,
    unstageFile,
    pull,
    commit,
    push,
    displayCommitErrorAlert,
    displayCommitInProcessAlert,
    displayCommitSuccessAlert,
    truncate,
    removeQuotes,
    getAllIndexes
} from '../../../src/renderer/functions';

// -------------
// --- Tests ---
// -------------

describe('Main Function tests', () => {
    // ---------------------------
    // --- Git Functions Tests ---
    // ---------------------------

    describe('Git related functions', () => {});

    // -----------------------------
    // --- Alert Functions Tests ---
    // -----------------------------

    describe('Alerts functions', () => {});

    // -----------------------------
    // --- Misc. Functions Tests ---
    // -----------------------------

    describe('Miscelaneous functions', () => {
        describe('String file name truncation', () => {});

        describe('Quote removal', () => {
            it('Quote removal cases', () => {
                const testStringArray = ['testString', "testString ' test"];

                testStringArray.forEach(value => {
                    expect(removeQuotes(`'${value}'`)).toBe(value);
                    expect(removeQuotes(`"${value}"`)).toBe(value);
                    expect(removeQuotes(`"${value}`)).toBe(value);
                    expect(removeQuotes(`${value}"`)).toBe(value);
                    expect(removeQuotes(`'${value}`)).toBe(value);
                    expect(removeQuotes(`${value}'${value}`)).toBe(`${value}'${value}`);
                });
            });
        });

        describe('Get indexes of all instances', () => {});
    });
});
