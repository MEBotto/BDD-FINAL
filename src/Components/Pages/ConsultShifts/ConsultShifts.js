import React, { useState } from 'react';
import ApiFetcher from '../../../Api/ApiFetcher';
import Table from 'react-bootstrap/Table';
import BackButton from '../../Buttons/BackButton/BackButton';
import '../Styles/TablesStyle.css'

const ConsultShifts = () => {
  const endpoint = 'shifts/info'; 
  const [fetchedData, setFetchedData] = useState({ response: [] });

  const handleDataFetched = (data) => {
      setFetchedData(data);
  };
  return (
    <div className='container-fluid'>
      <ApiFetcher endpoint={endpoint} onDataFetched={handleDataFetched} />
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='row col-12 table-title-style' style={{ backgroundColor: `rgb(3,76,140)` }}>
          Turnos
        </div>
      </div>
      <div className='row col-12 table-container-style'>
        <Table responsive striped bordered hover variant='dark' className='table-style'>
          <thead>
            <tr>
              <th>
                <div className='d-flex align-items-center justify-content-center' style={{ minWidth: '190px' }}>
                  Código de Turno
                </div>
              </th>
              <th style={{ minWidth: '230px' }}>Turno</th>
              <th style={{ minWidth: '240px' }}>Materia</th>
              <th style={{ minWidth: '240px' }}>Profesor Titular</th>
              <th style={{ minWidth: '240px' }}>Nro.Legajo Profesor</th>
              <th style={{ minWidth: '240px' }}>Fecha Exámen</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.response.map((item) => (
              item.planificacions.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className='d-flex align-items-center justify-content-center'>
                      {item.codTurno}
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center justify-content-center'>
                      {item.descTurno}
                    </div>
                  </td>
                  <td key={row.id}>{row.codMatNavigation.descMat}</td>
                  <td key={row.id}>{row.codMatNavigation.nroLegajoPNavigation.apeNomb}</td>
                  <td key={row.id}>{row.codMatNavigation.nroLegajoPNavigation.nroLegajoP}</td>
                  <td key={row.id}>{row.fechaExamen}</td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
        <BackButton props={{margin : '50px'}}/>
      </div>
    </div>
  )
}

export default ConsultShifts