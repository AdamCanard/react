const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('helloWorld',{
// window.helloWorld.hello()
    hello:()=> {
        return ipcRenderer.sendSync('hello-world') // sendSync should be used to return value back to the window that called this event
    },
    name:(name)=>{
        return ipcRenderer.sendSync('hello-name',name) // name is var we want to send, sometimes it's easier to send an object.
    }
})

contextBridge.exposeInMainWorld('manipulateBrowser',{
    duplicate:()=> ipcRenderer.send('duplicate-window')
})

contextBridge.exposeInMainWorld('helloWorldObject',{
    hello:{ // window.helloWorldObject.hello.hello()
        hello(){
            return ipcRenderer.sendSync('hello-world')
        },
        name(name){
            return ipcRenderer.sendSync('hello-name',name)
        }
    },
})

