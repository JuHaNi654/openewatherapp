import React, { useState } from 'react'
import './Control.css'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import History from 'components/history/History';

function Control(props) {
    //Initialize states, bu using react useState hook
    const [weatherObj, setWeatherObj] = useState({ city: "", unit: "" })
    const [weatherHistory, setWEatherHistory] = useState([])

    //On submit button will save given data
    const handleSubmit = (event) => {
        event.preventDefault();
        /**
        |--------------------------------------------------
        | @function onSubmitClic will save given data as object to the redux store
        | @function saveHistory will save give data object to the array in the redux store
        |--------------------------------------------------
        */
        props.onSubmitClick(weatherObj)
        props.saveToHistory(weatherObj)
        saveHistory()
    }

    //Will fetch history data on the redux store and set state
    const saveHistory = () => {
        setWEatherHistory([...props.history])
    }

    /**
    |--------------------------------------------------
    | @param obj selected saved history data object
    | function will set selected weather object to the input fields
    |--------------------------------------------------
    */
    const searchHistory = (obj) => {
        setWeatherObj(obj)
    }
    return (
        <div>
            <h1>Select city</h1>
            <Form
                onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="inputCity">
                    <Form.Label className="label-text" column sm="3">City</Form.Label>
                    <Col sm="6">
                        <Form.Control size="sm" placeholder="Insert city..."
                            required
                            value={weatherObj.city}
                            type="text"
                            className="temp-input-style"
                            onChange={(e) => setWeatherObj(Object.assign({}, weatherObj, { city: e.target.value }))} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="selectTemp">
                    <Form.Label className="label-text" column sm="3">Temperature</Form.Label>
                    <Col sm="6">
                        <Form.Control className="temp-select-style" size="sm" as="select"
                            required
                            value={weatherObj.temp}
                            onChange={(e) => setWeatherObj(Object.assign({}, weatherObj, { unit: e.target.value }))}
                        >
                            <option value="">Select...</option>
                            <option value="imperial">Fahrenheit </option>
                            <option value="metric">Celsius </option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Button type="submit" size="lg"
                className="submit-button" block>Search</Button>
            </Form>
            <History history={weatherHistory} searchHistory={searchHistory}/>
        </div>
    )
}

//Fetching data from the redux store
function mapStateToProps(state) {
    return {
        history: state.history
    }
}


//Dispatch functions
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitClick: (obj) => {
            const action = { type: 'SAVE_QUERY', query: obj}
            dispatch(action)
        },
        saveToHistory: (obj) => {
            const action = { type: 'SAVE_HISTORY', query: obj}
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control);