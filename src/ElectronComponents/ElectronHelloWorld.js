import {useState} from "react";

export default function ElectronHelloWorld(){
    const [helloText, setHelloText]=useState("")
    const helloWorld=()=>{
        setHelloText(window.helloWorld.hello())
    }
    const helloName = (e)=>{
        e.preventDefault()
        setHelloText(window.helloWorld.name(e.target.name.value))
    }
    const duplicate =()=>{
        window.manipulateBrowser.duplicate()
    }
    return(
        <div>
            <p>
                {helloText}
            </p>
            <input type={'button'} onClick={helloWorld} value={'Electron Hello World'}/>
            <form onSubmit={helloName}>
                <input type={'text'} id={'name'}/>
                <input type={'submit'} value={'Electron Hello Name'}/>
            </form>
            <input type={'button'} onClick={duplicate} value={'Duplicate browser window'}/>
        </div>

    )
}