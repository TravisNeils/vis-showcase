import firebase from "firebase";
import {useEffect } from "react";
import {useState} from 'react';

let db = firebase.firestore();

function useDB(study){
    const [visurls, setVisurls] = useState([]);
    // console.log( db.collection("studies"))
    // let urls = [];
    function add(v){
        setVisurls(current => {
            console.log(v.name);
            return [v, ...current]
        })
    }

    function remove(id) {
        setVisurls(current=> current.filter(m=> m.id!==id))
    }

    useEffect(() => {
        const collection = study ? 
            db.collection("vis").where('study','==',study) :
            db.collection("vis")
        
        collection.onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [study])
    // componentDidMount() {
    //     this._asyncRequest = db.collection("studies").get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //             this._asyncRequest = null;
    //             this.setState([doc.data(), ...this.state.visurls])
    //         });
    //     }); 
    // }
    // firebase
    //   .storage()
    //   .ref("images")
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url => this.setState({}));
    //   console.log('uploaded to storage');
    //   db.collection("studies").add({
    //     name: filename,
    //     url : "name"
    // });
    return visurls;
}
            //  <div>
            //     <p>{this.state.visurls}</p>
            //   {this.state.visurls.map((msg,i)=> {
            //     const isMe = true
            //     return <Vis key={i} {...msg} isMe={isMe} />
            //   })}
            // </div>
export {useDB};