import React from "react";
import Media from "react-bootstrap/lib/Media";
import "./Post.css";
import Image from "react-bootstrap/lib/Image";
import Well from "react-bootstrap/lib/Well";
import { Panel } from "react-bootstrap";
import { Grid } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap"

const post = () => {
    return (
        <Grid>
            <Row className = "post-grid">
            <Col xs={5} md ={3}></Col>
            <Col xs={8} md ={6}>
                <Panel>
                <Panel.Heading>
                <h2>Username12345</h2>
                </Panel.Heading>
                <Panel.Body>
                <img width= {360} height = {360} src="/testimg"/>
                </Panel.Body>
                <Panel.Footer>
                <h5>
                    So Much Text Blah Blah Blah
                    So Much Text Blah Blah Blah
                    So Much Text Blah Blah Blah
                    So Much Text Blah Blah Blah
                </h5>
                </Panel.Footer>
                </Panel>
            </Col>
            <Col xs={5} md ={3}></Col>
            </Row>
           
        </Grid>
        

        
        
        
    
    );
};

export default post;