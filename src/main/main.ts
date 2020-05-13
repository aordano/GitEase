import { app, Menu, BrowserWindow, nativeImage } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

/// create a global var, wich will keep a reference to out loadingScreen window
let loadingScreen: BrowserWindow | null;
const createLoadingScreen = () => {
    /// create a browser window
    loadingScreen = new BrowserWindow({
        /// define width and height for the window
        width: 600,
        height: 200,
        backgroundColor: '#333',
        /// remove the window frame, so it will become a frameless window
        frame: false,
        center: true,
        alwaysOnTop: true,
        title: 'GitEase'
    });
    loadingScreen.setResizable(false);
    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
        loadingScreen.loadURL(`http://localhost:2003/loader.html`);
    } else {
        loadingScreen.loadURL(
            url.format({
                pathname: path.join(__dirname, 'loader.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    loadingScreen.on('closed', () => (loadingScreen = null));
    loadingScreen.webContents.on('did-finish-load', () => {
        loadingScreen!.show();
    });
};

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        show: false,
        title: 'GitEase'
    });

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
        win.loadURL(`http://localhost:2003`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    /// keep listening on the did-finish-load event, when the mainWindow content has loaded
    win.webContents.on('did-finish-load', () => {
        /// then close the loading screen window and show the main window
        if (loadingScreen) {
            loadingScreen.close();
        }
        win!.maximize();
        win!.show();
    });
    
    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
        win.webContents.once('dom-ready', () => {
            win!.webContents.openDevTools();
        });
    }

    /*

    win.webContents.once('dom-ready', () => {
        win!.webContents.openDevTools();
    });

    */


    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', () => {
    createLoadingScreen();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});


/*

const os = require('os')

setTimeout(() => {

    console.log(BrowserWindow.getDevToolsExtensions())
    
},500)

*/
