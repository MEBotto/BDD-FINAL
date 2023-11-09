import React, { useState, useEffect } from "react";
import ApiFetcher from "../../../Api/ApiFetcher";
import { Container, Row, Col , Form} from 'react-bootstrap';
import BackButton from "../../Buttons/BackButton/BackButton";
import ADMButton from "../../Buttons/ADMButton/ADMButton";
import "../Styles/FormsStyle.css";

const AddProfessorForm = () => {

  const endpointDoc = "type_docs/list_all";
  const endpointTit = "degree/list_all";

  const [fetchedDataDoc, setFetchedDataDoc] = useState({ response: [] });
  const [fetchedDataTit, setFetchedDataTit] = useState({ response: [] });
  const [professorData, setProfessorData] = useState({
    apeNomb: '',
    fecNac: '',
    codDoc: '',
    nroDoc: '',
    direccion: '',
    email: '',
    sexo: '',
    telefono: '',
    estCivil: '',
    codTitulo: '',
  });

  const handleDataFetchedDoc = (data) => {
    setFetchedDataDoc(data);
  };

  const handleDataFetchedTit = (data) => {
    setFetchedDataTit(data);
  };

  const [dataForm,setDataForm] = useState({
    ape : '',
    nom : '',
    apeNomb: '',
    fNacimiento : '',
    sexo : '',
    tipoDoc : '',
    nroDoc : '',
    dir : '',
    email : '',
    tel : '',
    estCivil : '',
    codTitulo : ''
  });

  const handleOnChange = (evt) => {
    const { name, value, type } = evt.target;
    if (type === "radio") {
      setDataForm({
        ...dataForm,
        sexo: value,
      });
    } else if (name === "ape" || name === "nom") {
      setDataForm({
        ...dataForm,
        [name]: value,
        apeNomb: name === "apellido" ? value + " " + dataForm.nom : dataForm.ape + " " + value,
      });
    } else {
      setDataForm({
        ...dataForm,
        [name]: value,
      });
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setProfessorData({
      apeNomb: dataForm.apeNomb,
      fecNac: dataForm.fNacimiento,
      codDoc: dataForm.tipoDoc,
      nroDoc: dataForm.nroDoc,
      direccion: dataForm.dir,
      email: dataForm.email,
      sexo: dataForm.sexo,
      telefono: dataForm.tel,
      estCivil: dataForm.estCivil,
      codTitulo: dataForm.codTitulo,
    })
  };

  useEffect(()=>{
    console.log(professorData)
    setProfessorData({...professorData})
  },[professorData])

  return (
    <Container>
      <ApiFetcher endpoint={endpointDoc} onDataFetched={handleDataFetchedDoc} />
      <ApiFetcher endpoint={endpointTit} onDataFetched={handleDataFetchedTit} />
      <Row className="justify-content-center">
        <Col md={6}>
          <div className='form-title-style' style={{backgroundColor : 'rgb(52, 199, 0)', marginBottom : '20px'}}>
            Profesor
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="ape" required maxLength="30" value={dataForm.ape} onChange={handleOnChange}/>
              <Form.Control.Feedback type="invalid">
                Ingrese su Apellido
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nom" required maxLength="30" value={dataForm.nom} onChange={handleOnChange}/>
              <Form.Control.Feedback type="invalid">
                Ingrese su Nombre
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" name="fNacimiento"required value={dataForm.fNacimiento} onChange={handleOnChange}/>
              <Form.Control.Feedback type="invalid">
                Ingrese su Fecha de nacimiento
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Sexo</Form.Label>
              <div className='d-flex '>
                <Form.Check
                  type="radio"
                  label="Masculino"
                  name="sexo"  // Cambiado de "M" a "sexo"
                  value={"M"}
                  className="form-check-inline mr-2"
                  onChange={handleOnChange}
                  required/>
                <Form.Check
                  type="radio"
                  label="Femenino"
                  name="sexo"  // Cambiado de "F" a "sexo"
                  value={"F"}
                  className="form-check-inline"
                  onChange={handleOnChange}
                  required/>
              </div>
              <Form.Control.Feedback type="invalid">
                Seleccione al menos una opción.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tipo de Documento</Form.Label>
              <Form.Control as="select" name="tipoDoc" value={dataForm.tipoDoc} onChange={handleOnChange}>
              <option name="tipoDoc" value="seleccionar_algo" key="seleccionar_algo">Seleccione el tipo de documento</option>
              {fetchedDataDoc.response.map((item) => (
                <option name="tipoDoc" value={item.codDoc} key={item.codDoc}>{item.descDoc}</option>
              ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Numero de documento</Form.Label>
              <Form.Control type="text" name="nroDoc" required value={dataForm.nroDoc} onChange={handleOnChange}/>
              <Form.Control.Feedback type="invalid" pattern="[0-9]+">
                Ingrese su Nro Documento (solo numeros permitidos)
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Direccion </Form.Label>
              <Form.Control type="text" name="dir" placeholder='(Opcional)' maxLength="50" value={dataForm.dir} onChange={handleOnChange}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="Email" name="email" required value={dataForm.email} onChange={handleOnChange}/>
              <Form.Control.Feedback type="invalid" maxLength="50">
                Ingrese una direccion de correo valida
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" name="tel"placeholder='(Opcional)' maxLength="20" value={dataForm.tel} onChange={handleOnChange}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Estado civil</Form.Label>
              <Form.Control as="select" name="estCivil" value={dataForm.estCivil} onChange={handleOnChange}>
                <option name="estCivil" value="seleccionar_algo" key="seleccionar_algo">Seleccione el estado civil</option>
                <option name="estCivil" value="SOLTERO/A" key="SOLTERO/A">SOLTERO/A</option>
                <option name="estCivil" value="CASADO/A" key="CASADO/A">CASADO/A</option>
                <option name="estCivil" value="OTRO" key="OTRO">OTRO</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control as="select" name="codTitulo" value={dataForm.codTitulo} onChange={handleOnChange}>
              <option name="codTitulo" value="seleccionar_algo" key="seleccionar_algo">Seleccione el titulo</option>
              {fetchedDataTit.response.map((item) => (
                <option name="codTitulo" value={item.codTitulos} key={item.codTitulos}>{item.descTitulo}</option>
              ))}
              </Form.Control>
            </Form.Group>

            <div className="form-buttons-style">
              <BackButton props={{margin : '0px'}}/>
              <ADMButton background={'52, 199, 0'} text={'Agregar'} item={professorData} type={'Profesor'}/>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProfessorForm