import React,{useState} from "react";

export default function Room(props){
    const [votesToskip,setVotesToSkip]=useState(2);
    const [guestCanPause,setGuestCanPause]=useState(false);
    const [isHost,setIsHost]=useState(false);
    const [isValid,setIsValid]=useState(false);
    const roomCode=props.match.params.roomCode;
    const requestOptions={method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({
            'code':roomCode
        })}    
    fetch("http://127.0.0.1:8000/api/checkroom",requestOptions).then((response)=>response.json()).then((data)=>{
        if(data.good==="true"){
            setIsValid(true)
            if(data.host==="true"){
                setIsHost(true);
            }
        }
        else{setIsValid(false)}
    })

    if(isValid && isHost){    
    return(<div>
        <h1>{roomCode} you are the host</h1>
        <p>votes: {votesToskip}</p>
        <p>guestcanpause: {guestCanPause.toString()}</p>
        <p>ishost: {isHost.toString()}</p>
    </div>)}
    else if(isValid){
        return(
        <div>
            <h1>this is a valid room</h1>
        </div>)
        
    }
        
    else{
        return(<div><h1>BAD ROOM ENTER VALID ROOM </h1></div>)
    }
}