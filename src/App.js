// import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Paper, Breadcrumbs } from '@material-ui/core';
// import { saveAs } from 'file-saver';
// import Dropzone from 'react-dropzone'
import Uploader from './uploader.js'
// import {createStore, combineReducers} from 'redux';
// import {Provider, useDispatch} from 'react-redux';
import Gallery from './gallery';
import { useDB } from "./visdb";

// My switcher thing :)
export default function Wrap() {

  return<Router>
      <header className="App-header">
          <h1>visualization Showcase</h1>
          <div className='tab_menu'>
            <Paper>
              <Breadcrumbs aria-label="breadcrumb">
                <Link to='/'> Home</Link>
                <Link to='/upload'> Upload</Link>
                <Link to='/showcase'> Showcase</Link>

              </Breadcrumbs>
            </Paper>
            
          </div>
          
        </header>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/upload" component={Uploader} />
        <Route exact path="/showcase"component={Gallery}>
        </Route>
      </Switch>
    </Router>
}

function App() {
  const visnames = useDB(false);
  
  return (
    <div className="App">
      <h1>Hello!</h1>
        <p> There are currently {visnames.length} visualization uploaded to the sites
        check out the showcase to see them all :) or upload to add another one</p>

    </div>
  );
}

const ImageThumb = ({ image }) => {
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};
