import React, { useState , useEffect } from "react";
import ApiFetcher from "../../../Api/ApiFetcher";
import { useLocation } from "react-router-dom";
import { Container, Row, Col , Form} from 'react-bootstrap';
import BackButton from "../../Buttons/BackButton/BackButton";
import ADMButton from "../../Buttons/ADMButton/ADMButton";
import "../Styles/FormsStyle.css";

const ModifySubjectForm = () => {

  const endpoint = "professors/list_all";

  const [fetchedData, setFetchedData] = useState({ response: [] });
  const [subjectData, setSubjectData] = useState({
    codMateria : '',
    descMat : '',
    descCarrera : '',
    nroLegajoP : '',
  });

  const handleDataFetched = (data) => {
    setFetchedData(data);
  };

  const location = useLocation();
  console.log(location);
  const itemdata = location.state.data;

  const [dataForm,setDataForm] = useState({
    codMateria : itemdata.codMateria,
    descMat : itemdata.descMat,
    descCarrera : itemdata.descCarrera,
    nroLegajoP : itemdata.nroLegajoP
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

    setSubjectData({
      codMateria : dataForm.codMateria,
      descMat : dataForm.descMat,
      descCarrera : dataForm.descCarrera,
      nroLegajoP : dataForm.nroLegajoP,
      })
  };

  useEffect(()=>{
    console.log(subjectData)
  },[subjectData])


  return(
    <Container>
      <ApiFetcher endpoint={endpoint} onDataFetched={handleDataFetched} />
      <Row className="justify-content-center">
        <Col md={6}>
          <div className='form-title-style' style={{backgroundColor : 'rgb(211, 114, 28)'}}>
            Materia
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group>
              <Form.Label>Codigo Materia</Form.Label>
              <Form.Control name="codMateria" type="text" disabled value={itemdata.codMateria} onChange={handleOnChange}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Materia</Form.Label>
              <Form.Control name="descMat" type="text" required  value={dataForm.descMat} onChange={handleOnChange}/>
              <Form.Control.Feedback type="invalid" maxLength="30" >
                Ingrese la Materia
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Carrera</Form.Label>
                <Form.Control name="descCarrera" type="text" required value={dataForm.descCarrera} onChange={handleOnChange}/>
              <Form.Control.Feedback type="invalid">
                  Ingrese la Carrera
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Numero Legajo Profesor Titular</Form.Label>
                <Form.Control name="nroLegajoP" as="select" type="text" required value={dataForm.nroLegajoP} onChange={handleOnChange}>
                {fetchedData.response.map((item) => (
                <option value={item.nroLegajoP} key={item.nroLegajoP}>{item.apeNomb}</option>
                ))}
                </Form.Control>
            </Form.Group>
            <div className="form-buttons-style">
              <BackButton props={{margin : '0px'}}/>
              <ADMButton background={'211, 114, 28'} text={'Modificar'} item={subjectData} type={'Materia'}/>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ModifySubjectForm;