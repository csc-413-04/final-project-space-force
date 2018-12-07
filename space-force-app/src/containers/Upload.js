import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import "./upload.css";
import axios from "axios";

export default class Upload extends Component {
    state ={
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
            
        })
        console.log(event.target.files[0])
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.className);
        axios.post('', fd, {
            onUpladProgress: ProgressEvent => {
                console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total* 100 ) + '%' )
            }
        }) //in the '' place location to be posted. POST_REQUEST
        .then(res => {
            console.log(res);
        })
    }

    render(){
        return(
            <div className="Upload">
                <input style={{display: 'none'}}
                type="file"
                onChange={this.fileSelectedHandler}
                ref={fileInput => this.fileInput = fileInput}/>
                <button onClick={() => this.fileInput.click()}>Choose Picture</button>
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>

        );
    }
}