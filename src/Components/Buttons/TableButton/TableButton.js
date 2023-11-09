import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ADMButton from "../../Buttons/ADMButton/ADMButton";

import "./TableButton.css";

const TableButton = ({ link, background, text, type, item }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container-fluid">
      {text === "Modificar" ? (
        <div className="d-flex justify-content-center">
          <Link to={link} state={{ data: item }}>
            <Button
              className="table-button-style"
              style={{ backgroundColor: `rgb(${background})` }}
            >
              {text}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <Button
            className="table-button-style"
            style={{ backgroundColor: `rgb(${background})` }}
            onClick={handleShow}
          >
            {text}
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header className="modal-header-style">
              <Modal.Title>Eliminar {type}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-style">
              Esta seguro de eliminar el registro seleccionado?
            </Modal.Body>
            <Modal.Footer className="modal-footer-style">
              <Button
                className="table-button-style"
                variant="secondary"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <ADMButton background={'238, 22, 35'} text={'Eliminar'} item={item} type={type}/>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default TableButton;
