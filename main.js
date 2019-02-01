const {app, BrowserWindow} = require('electron')

let mainWindow

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({width:800, height:600, title:'工会财务记账系统'})
    mainWindow.loadFile('render/main.html')
    mainWindow.on('closed', ()=>{
        mainWindow = null
    })
})

app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin') {
        app.quit()
    }
})