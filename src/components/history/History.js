import React from 'react'
import Table from 'react-bootstrap/Table'
import './History.css'

function History(props) {
    //Render saved history array data
    return (
        <div>
            <Table responsive>
                <thead className="table-header-style">
                    <tr>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody className="table-body-style">    
                    {props.history.map((obj, index) => {
                        return (
                            <tr key={index} onClick={() => props.searchHistory(obj)}>
                                <td>{obj.city}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}



export default (History)