/* import { Application } from 'spectron';
import * as electronPath from 'electron';
import * as path from 'path';
import { parseSync } from '@babel/core';

jest.setTimeout(10000);

describe('Main window', () => {
    let app: Application;

    beforeEach(() => {
        app = new Application({
            path: electronPath.toString(),
            args: [path.join(__dirname, '..', '..')]
        });

        return app.start();
    });

    afterEach(() => {
        if (app.isRunning()) {
            return app.stop();
        }
    });
}) */
