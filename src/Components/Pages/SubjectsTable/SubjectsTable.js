import React, { useState } from 'react';
import ApiFetcher from '../../../Api/ApiFetcher';
import { useLocation } from 'react-router-dom';
import TableButton from '../../Buttons/TableButton/TableButton';
import Table from 'react-bootstrap/Table';
import BackButton from '../../Buttons/BackButton/BackButton';
import '../Styles/TablesStyle.css'

const SubjectsTable = () => {
  const endpoint = 'subjects/list_all'; 
  const [fetchedData, setFetchedData] = useState({ response: [] });

  const handleDataFetched = (data) => {
    setFetchedData(data);
  };

  const location = useLocation();
  const props = location.state.data.props
  props.link = "/ModifySubjectForm"
  props.type = "Materia";

  const { text, background, link, type } = props;
  
  return (
    <div className='container-fluid'>
      <ApiFetcher endpoint={endpoint} onDataFetched={handleDataFetched} />
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='row col-12 table-title-style' style={{ backgroundColor: `rgb(${props.background})` }}>
          Materias
        </div>
      </div>
      <div className='row col-12 table-container-style'>
        <Table responsive striped bordered hover variant='dark'className='table-style'>
          <thead>
            <tr>
              <th>
                <div className='d-flex align-items-center justify-content-center'>
                  Código
                </div>
              </th>
              <th style={{minWidth : '230px'}}>Materia</th>
              <th style={{minWidth : '230px'}}>Carrera</th>
              <th style={{minWidth : '230px'}}>Profesor Titular</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {fetchedData.response.map((item) => (
              <tr>
                <th><div className='d-flex align-items-center justify-content-center'>
                      {item.codMateria}
                    </div>
                </th>
                <td key={item.id}>{item.descMat}</td>
                <td key={item.id}>{item.descCarrera}</td>
                <td key={item.id}>{item.nroLegajoPNavigation.apeNomb}</td>
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

export default SubjectsTable