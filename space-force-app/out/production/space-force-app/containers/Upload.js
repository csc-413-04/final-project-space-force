import React, { Component } from "react";
import "./Upload.css";
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
        fd.append('image/jpeg', this.state.selectedFile, this.state.selectedFile.className);
        axios({
            method: 'POST',
            url: '/api/uploadimage',
            data:fd,
            //onUpladProgress: ProgressEvent => {
            //    console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total* 100 ) + '%' )
            //}
        }) //in the '' place location to be posted. POST_REQUEST
        .then(res => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        });
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
