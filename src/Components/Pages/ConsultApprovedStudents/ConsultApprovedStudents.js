import React, { useState } from 'react';
import ApiFetcher from '../../../Api/ApiFetcher';
import Table from 'react-bootstrap/Table';
import BackButton from '../../Buttons/BackButton/BackButton';
import '../Styles/TablesStyle.css'

const ConsultRegisteredStudents = () => {
    const endpoint = 'students/per_shift/approved'; 
    const [fetchedData, setFetchedData] = useState({ response: [] });

    const handleDataFetched = (data) => {
        setFetchedData(data);
    };
    return (
        <div className='container-fluid'>
            <ApiFetcher endpoint={endpoint} onDataFetched={handleDataFetched} />
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='row col-12 table-title-style' style={{ backgroundColor : `rgb(3,76,140)`}}>
                    Alumnos Aprobados
                </div>
            </div>
            <div className='row col-12 table-container-style'>
                <Table responsive striped bordered hover variant='dark'className='table-style'>
                    <thead>
                        <tr>
                            <th>
                                <div className='d-flex align-items-center justify-content-center' style={{minWidth : '190px'}}>
                                    Código de Turno
                                </div>
                            </th>
                            <th style={{minWidth : '230px'}}>Turno</th>
                            <th style={{minWidth : '240px'}}>Cantidad de Alumnos</th>
                            <th style={{minWidth : '350px'}}>Cantidad de Alumnos Aprobados</th>
                            <th style={{minWidth : '350px'}}>Porcentaje de Alumnos Aprobados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedData.response.map((item) => (
                        <tr>
                            <th>
                                <div className='d-flex align-items-center justify-content-center'>
                                    {item.codTurno}
                                </div>
                            </th>
                            <td key={item.id}>{item.descTurno}</td>
                            <td key={item.id}>{item.cantidadAlumnos}</td>
                            <td key={item.id}>{item.cantidadAlumnosAprobados}</td>
                            <td key={item.id}>{item.porcentaje}</td>
                        </tr>))}
                    </tbody>
                </Table>
                <BackButton props={{margin : '50px'}}/>
            </div>
        </div>
    )
}

export default ConsultRegisteredStudents