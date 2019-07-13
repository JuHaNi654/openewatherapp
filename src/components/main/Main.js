import React from 'react';
import './Main.css';
import  Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Control from '../control/Control';
import Display from '../display/Display';
import store from '../store/index.js'
function Main() {
    return (
        <Container className="container">
            <Row className="row-style">
                <Col sm className="right-container">
                    <Display store={store} />
                </Col>
                <Col sm className="left-container">
                    <Control store={store}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Main;
