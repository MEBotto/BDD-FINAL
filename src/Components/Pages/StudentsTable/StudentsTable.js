import React, { useState } from "react";
import ApiFetcher from "../../../Api/ApiFetcher";
import { useLocation } from "react-router-dom";
import TableButton from "../../Buttons/TableButton/TableButton";
import Table from "react-bootstrap/Table";
import BackButton from "../../Buttons/BackButton/BackButton";
import "../Styles/TablesStyle.css";

const StudentsTable = () => {
  const endpoint = "students/list_all";
  const [fetchedData, setFetchedData] = useState({ response: [] });

  const handleDataFetched = (data) => {
    setFetchedData(data);
  };

  const location = useLocation();
  const props = location.state.data.props;
  props.link = "/ModifyStudentForm";
  props.type = "Alumno";

  const { text, background, link, type } = props;

  return (
    <div className="container-fluid">
      <ApiFetcher endpoint={endpoint} onDataFetched={handleDataFetched} />
      <div className="row d-flex justify-content-center align-items-center">
        <div
          className="row col-12 table-title-style"
          style={{ backgroundColor: `rgb(${props.background})` }}
        >
          Alumnos
        </div>
      </div>
      <div className="row col-12 table-container-style">
        <Table
          responsive
          striped
          bordered
          hover
          variant="dark"
          className="table-style"
        >
          <thead>
            <tr>
              <th>
                <div className="d-flex align-items-center justify-content-center">
                  Nro.Legajo
                </div>
              </th>
              <th style={{ minWidth: "230px" }}>Apellido y Nombre</th>
              <th style={{ minWidth: "240px" }}>Fecha de Nacimiento</th>
              <th>Sexo</th>
              <th style={{ minWidth: "220px" }}>Dirección</th>
              <th style={{ minWidth: "210px" }}>Tipo de Documento</th>
              <th style={{ minWidth: "200px" }}>Nro.Documento</th>
              <th style={{ minWidth: "230px" }}>Email</th>
              <th style={{ minWidth: "200px" }}>Teléfono</th>
              <th style={{ minWidth: "160px" }}>Estado Civil</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.response.map((item) => (
              <tr>
                <th>
                  <div className="d-flex align-items-center justify-content-center">
                    {item.nroLegajoA}
                  </div>
                </th>
                <td key={item.id}>{item.apeNomb}</td>
                <td key={item.id}>{item.fecNac}</td>
                <td key={item.id}>{item.sexo}</td>
                <td key={item.id}>{item.direccion}</td>
                <td key={item.id}>{item.codDocNavigation.descDoc}</td>
                <td key={item.id}>{item.nroDoc}</td>
                <td key={item.id}>{item.email}</td>
                <td key={item.id}>{item.telefono}</td>
                <td key={item.id}>{item.estCivil}</td>
                <td>
                  <TableButton
                    link={link}
                    background={background}
                    text={text}
                    type={type}
                    item={item}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <BackButton props={{margin : '50px'}}/>
      </div>
    </div>
  );
};

export default StudentsTable;