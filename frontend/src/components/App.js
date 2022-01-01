import React,{useState,useEffect}from "react"; 
import { render } from "react-dom";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
export default function App(props){
        const [cnt,setCnt]=useState(1);
        // setCnt(3);
        return(
            <div className="center">
            <HomePage/>
            </div>
            // <p>you clicked {props.name} hello {cnt}</p>
            // <button onClick={()=>setCnt(cnt+1)}>click me </button>
        );
        
}


const appDiv=document.getElementById("app");
render(<App name="shivi"/>,appDiv)