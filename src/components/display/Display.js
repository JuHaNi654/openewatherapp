import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux' 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Display.css'
import Token from 'Token'
import axios from 'axios'

function Display(props) {
    const [weatherResult, setWeatherResult] = useState([])
    const [errorResult, setErrorResult] = useState(null)
    const [selectedUnit, setUnit] = useState('')
    const [selectMetric, setMetric] = useState('')

    /**
    |--------------------------------------------------
    | @Function useEffect react hook calls function befeore rendering
    | If given weather object is not null it will do api call and save result
    |--------------------------------------------------
    */
    useEffect(() => {
        if (props.query !== null) {
            const fetchData = async () => {
                await axios(`http://api.openweathermap.org/data/2.5/weather?q=${props.query.city}&units=${props.query.unit}&appid=` + Token.weatherAppId)
                        .then(res => {
                            setWeatherResult(res.data)
                        })
                        .catch(err => {
                            setErrorResult(err.response.data.cod)
                        })
            };
            fetchData()

            if (props.query.unit === 'metric') {
                setUnit('°C')
                setMetric('m/s')
            } else {
                setUnit('°F')
                setMetric('m/h')
            }
        }
    }, [props.query])


    if (weatherResult.length !== 0) {
        const showIcon = `http://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`

        
        return (
            <div>
                <Row className="row-1">
                    <Col md={8} xs={12} className="col-1">
                        <Row className="weather-temp">
                            <img className="icon-style" width="200" height="200" src={showIcon} alt="icon" />
                            <div className="asd">
                                <h1>{weatherResult.main.temp}{selectedUnit}</h1>
                                <p>{weatherResult.weather[0].description}</p>
                            </div>
                        </Row>
                        <Row className="sub-temp-row">
                            <h3>Highest Temperature: {weatherResult.main.temp_max}{selectedUnit}</h3>
                        </Row>
                        <Row className="sub-temp-row">
                            <h3>Lowest Temperature: {weatherResult.main.temp_min}{selectedUnit}</h3>
                        </Row>
                    </Col>
                    <Col md={4} xs={12} className="col-2">
                        <Row className="row-3">
                            <Col xs={12}>
                                <p>Humitidy: {weatherResult.main.humidity}%</p>
                                <p>Wind: {weatherResult.wind.speed} {selectMetric}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row xs={"auto"} className="row-2">
                    <h1 className="country-text">{weatherResult.name}, {weatherResult.sys.country}</h1>
                </Row>
            </div>
        )
    } else {
        if (errorResult === '404') {
            return (
                <div>
                    <h1>Selected City not found</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>City not selected</h1>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        query: state.query
    }
}

export default connect(mapStateToProps)(Display);