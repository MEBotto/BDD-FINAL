import React, { useState } from 'react';
import ApiFetcher from '../../../Api/ApiFetcher';
import { useLocation } from 'react-router-dom';
import TableButton from '../../Buttons/TableButton/TableButton';
import Table from 'react-bootstrap/Table';
import BackButton from '../../Buttons/BackButton/BackButton';
import '../Styles/TablesStyle.css'

const ExamsTable = () => {
  const endpoint = 'exams/list_all'; 
  const [fetchedData, setFetchedData] = useState({ response: [] });

  const handleDataFetched = (data) => {
    setFetchedData(data);
  };

  const location = useLocation();
  const props = location.state.data.props
  props.link = "/ModifyExamForm"
  props.type = "Exámen";

  const { text, background, link, type } = props;

  return (
    <div className='container-fluid'>
      <ApiFetcher endpoint={endpoint} onDataFetched={handleDataFetched} />
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='row col-12 table-title-style' style={{ backgroundColor : `rgb(${props.background})`}}>
          Exámenes
        </div>
      </div>
      <div className='row col-12 table-container-style'>
        <Table responsive striped bordered hover variant='dark'className='table-style'>
          <thead>
            <tr>
              <th>
                <div className='d-flex align-items-center justify-content-center' style={{minWidth : '240px'}}>
                  Nro.Legajo de Alumno
                </div>
              </th>
              <th style={{minWidth : '230px'}}>Nombre y Apellido</th>
              <th style={{minWidth : '220px'}}>Materia</th>
              <th style={{minWidth : '170px'}}>Turno</th>
              <th style={{minWidth : '120px'}}>Año</th>
              <th style={{minWidth : '100px'}}>Nota</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {fetchedData.response.map((item) => (
              <tr>
                <th>
                  <div className='d-flex align-items-center justify-content-center'>
                      {item.nroLegajoA}
                  </div>
                </th>
                <td key={item.id}>{item.nroLegajoANavigation.apeNomb}</td>
                <td key={item.id}>{item.codMatNavigation.descMat}</td>
                <td key={item.id}>{item.codTurnoNavigation.descTurno}</td>
                <td key={item.id}>{item.año}</td>
                <td key={item.id}>{item.nota}</td>
                <td>
                  <TableButton
                      link={link}
                      background={background}
                      text={text}
                      type={type}
                      item={item}
                  />
                </td>
              </tr>))}
          </tbody>
        </Table>
        <BackButton props={{margin : '50px'}}/>
      </div>
    </div>
  )
}

export default ExamsTable