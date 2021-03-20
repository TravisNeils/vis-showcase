import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
// import { uploadFromBlobAsync } from './storage'
import Vis from "./vis";

let db = firebase.firestore();

class Uploader extends Component {
  state = {
    visname: "",
    filename: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    heightval:"50vh"
  };
 
  handleChangeUsername = event =>
    this.setState({ visname: event.target.value });
  handleChangeHeight = event =>
    this.setState({ heightval: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ filename: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {this.setState({ avatarURL: url});
        console.log('uploaded to storage');
        });
      
  };
  addToShowcase = () => {
    db.collection("vis").add({
      filename: this.state.filename,
      name: this.state.visname,
      url : this.state.avatarURL,
      heightval: this.state.heightval
  });
  alert('added to showcase');
  };
 
  render() {
    return (
      <div className="uploader">
        <form>
          <label>Visualizaiton Name:</label>
          <input
            type="text"
            value={this.state.visname}
            onChange={this.handleChangeUsername}
          />
          <label>Height:</label>
          <input
            type="text"
            value={this.state.heightval}
            onChange={this.handleChangeHeight}
          />
          <label>Choose an image or HTML file to upload:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          
          <FileUploader
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
        {this.state.avatarURL && <h2>Preview</h2>}
          {this.state.avatarURL && <Vis src = {this.state.avatarURL} 
          filename={this.state.filename} name={this.state.visname} heightval = {this.state.heightval}/>}
          {this.state.avatarURL && <button className="add_button" onClick={this.addToShowcase}> Add to showcase</button>}
      </div>
    );
  }
}
 
export default Uploader;