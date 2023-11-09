import React, { useState , useEffect } from "react";
import ApiFetcher from "../../../Api/ApiFetcher";
import { Container, Row, Col , Form} from 'react-bootstrap';
import BackButton from "../../Buttons/BackButton/BackButton";
import ADMButton from "../../Buttons/ADMButton/ADMButton";
import "../Styles/FormsStyle.css";

const AddExamForm = () => {

  const endpointAl = "students/list_all";
  const endpointMa = "subjects/list_all";
  const endpointTu = "shifts/info";

  const [fetchedDataAl, setFetchedDataAl] = useState({ response: [] });
  const [fetchedDataMa, setFetchedDataMa] = useState({ response: [] });
  const [fetchedDataTu, setFetchedDataTu] = useState({ response: [] });
  const [examData, setExamData] = useState({
    nroLegajoA : '',
    codMat : '',
    codTurno : '',
    año : '',
    nota : '',
    fechaInscripcion : '',
  });

  const handleDataFetchedAl = (data) => {
    setFetchedDataAl(data);
  };

  const handleDataFetchedMa = (data) => {
    setFetchedDataMa(data);
  };

  const handleDataFetchedTu = (data) => {
    setFetchedDataTu(data);
  };

  const [dataForm,setDataForm] = useState({
    legajo : '',
    codMat : '',
    codTurno : '',
    año : '',
    nota : '',
    fechaIns : ''
  });

  const handleOnChange = (evt) => {
      setDataForm({
        ...dataForm,
        [evt.target.name]: evt.target.value,
      });
    
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    setExamData({
    nroLegajoA : parseInt(dataForm.legajo),
    codMat : dataForm.codMat,
    codTurno : dataForm.codTurno,
    año : dataForm.año,
    nota : parseInt(dataForm.nota),
    fechaInscripcion : dataForm.fechaIns + 'T00:00:00',
    })
  };

  useEffect(()=>{
    console.log(examData)
  }, [examData])

  return(
    <Container>
      <ApiFetcher endpoint={endpointAl} onDataFetched={handleDataFetchedAl} />
      <ApiFetcher endpoint={endpointMa} onDataFetched={handleDataFetchedMa} />
      <ApiFetcher endpoint={endpointTu} onDataFetched={handleDataFetchedTu} />
      <Row className="justify-content-center">
        <Col md={6}>
          <div className='form-title-style' style={{backgroundColor : 'rgb(52, 199, 0)', marginBottom : '20px'}}>
            Exámen
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group>
              <Form.Label>Nro.Legajo Alumno</Form.Label>
              <Form.Control as="select" name="legajo" value={dataForm.legajo} onChange={handleOnChange}>
              <option value="" disabled>Seleccione un Nro.Legajo</option>
              {fetchedDataAl.response.map((item) => (
                <option key={item.nroLegajoA} value={item.nroLegajoA}>{item.nroLegajoA}</option>
              ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Materia</Form.Label>
              <Form.Control as="select" name="codMat" value={dataForm.codMat} onChange={handleOnChange}>
              <option value="" disabled>Seleccione una Materia</option>
              {fetchedDataMa.response.map((item) => (
                <option name="codMat" key={item.codMateria} value={item.codMateria}>{item.descMat}</option>
              ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Turno</Form.Label>
              <Form.Control as="select" name="codTurno" value={dataForm.codTurno} onChange={handleOnChange}>
              <option value="" disabled>Seleccione un Turno</option>
              {fetchedDataTu.response.map((item) => (
                <option key={item.codTurno} value={item.codTurno}>{item.descTurno}</option>
              ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Año</Form.Label>
              <Form.Control type="text" name="año" required maxLength="4" pattern="[0-9]+" value={dataForm.año} onChange={handleOnChange}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nota</Form.Label>
              <Form.Control type="text" name="nota" required maxLength="2" pattern="^(?:[1-9]|10)$" value={dataForm.nota} onChange={handleOnChange}/>
              <Form.Control.Feedback type="invalid">
                La nota debe estar entre 1 y 10.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Fecha de Inscripción</Form.Label>
              <Form.Control type="date" name="fechaIns"required value={dataForm.fechaIns} onChange={handleOnChange}/>
            </Form.Group>

            <div className="form-buttons-style">
              <BackButton props={{margin : '0px'}}/>
              <ADMButton background={'52, 199, 0'} text={'Agregar'} item={examData} type={'Exámen'}/>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddExamForm;