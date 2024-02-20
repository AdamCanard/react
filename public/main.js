const { app, BrowserWindow,ipcMain} = require('electron')
const isDev = require("electron-is-dev")
const path = require("path");
process.env['NODE_' + 'ENV'] = 'production'

function createWindow(){
    let win = new BrowserWindow({
        width:800,
        height:800,
        webPreferences:{
            preload:path.join(__dirname,'preload.js')
        }
    })
    win.loadURL(
        isDev
            ? 'http://localhost:3001'
            : `file://${path.join(__dirname, './index.html')}`
    );

    win.maximize()
}
app.on('ready',()=>{
    createWindow()
})
ipcMain.on('hello-world',async (event)=>{
    event.returnValue = "Hello World"
})
ipcMain.on('hello-name',async (event,name)=>{
    event.returnValue = ("Hello "+name)
})

// Browser windows are each their own react app, although you can define communication channels between them in main.js:
// https://stackoverflow.com/questions/40251411/communication-between-2-browser-windows-in-electron

ipcMain.on('duplicate-window',async(event)=>{
    createWindow()
})
