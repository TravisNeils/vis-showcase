import firebase from "firebase";
import React, { Component, useEffect } from "react";
import {useState} from 'react';
import AsyncImage from "./AsyncImage";
import AsyncHTML from "./AsyncHtml";
import { useDB } from "./visdb";

let db = firebase.firestore();

function Vis(props){
    return <div className="message-row"
    style={{justifyContent: props.isMe ? 'flex-end' : 'flex-start'}}>
    <div className="message">
      <div className="message-name">{props.name}</div>
      {props.link}
    </div>
  </div>
}



function Gallery(){
    
    const visnames = useDB(false);

    return   <div>
    <p></p>
  {visnames.map((msg,i)=> {
      console.log(msg.name);
      if(msg.name.split('.').pop() === 'html'){
          return <AsyncHTML image = {msg.name} />

      }
    return <AsyncImage image = {msg.name} />
  })}
</div>
}


            
export default Gallery;