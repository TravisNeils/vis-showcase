import firebase from "firebase";
import React from "react";
// import {useState} from 'react';
import Vis from "./vis";
import { useDB } from "./visdb";

// let db = firebase.firestore();

function Gallery(){
    
    const visnames = useDB(false);

    return   <div>
  {visnames.map((msg,i)=> {
      console.log(msg.filename);
      return <Vis src = {msg.url} filename={msg.filename} keyval={i} name={msg.name} key={i} heightval = {msg.heightval}/>
  })}
</div>
}


            
export default Gallery;