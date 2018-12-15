import React, { Component } from "react";
import "./Upload.css";
import axios from "axios";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

export default class Upload extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          comment: ""
        };
      }

    state ={
        selectedFile: null
    }

    handleChange = event => {
        this.setState({
            
          [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]

        })
        console.log(event.target.files[0])
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('uploaded_file', this.state.selectedFile, this.state.selectedFile.className);
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
            <div className = "FormData">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        autofocus
                        type="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                    </FormGroup>
                </form>

            </div>
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
