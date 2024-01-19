import {useEffect, useRef, useState} from "react";

function App(){

    console.log("hello")

    return(
        <div>
            Hello World
            <br/>
            <BoolTest/>
        </div>
    )
}export default App;

export function BoolTest() {
    const [bool, setBool] = useState(false)
    const [diffBool, setDiffBool] = useState(false)
    const boolRef = useRef();
    console.log("booltest")


    return (
        <>
            {bool ? "True" : "False"}
            <br/>
            <input type={"button"} onClick={() => {
                setBool(!bool)
            }}/>
            <input type={"text"} ref={boolRef}/>
        </>
    )
}