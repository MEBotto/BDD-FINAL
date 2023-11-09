import React from 'react';
import Button from 'react-bootstrap/Button';
import './ADMButton.css';


const ADMButton = ({background, text, item, type}) => {
    console.log(item)
    function handleOnClick() {
        let metodo = '';
        let url = '';
        if (text === "Agregar")
        {
            metodo = 'POST';
            if (type ==="Profesor"){
                url = 'http://www.trabajofinalbdd.somee.com/api/professors/save';

            }else if (type === "Alumno"){
                url = 'http://www.trabajofinalbdd.somee.com/api/students/save';
            }else if (type === "Materia"){
                url = 'http://www.trabajofinalbdd.somee.com/api/subjects/save';
            }else if (type === "Exámen"){
                url = 'http://www.trabajofinalbdd.somee.com/api/exams/save';
            }
        }else if( text === "Eliminar"){
            metodo = 'DELETE';
            if (type ==="Profesor"){
                url = `http://www.trabajofinalbdd.somee.com/api/professors/delete/${item.nroLegajoP}`;
            }else if (type === "Alumno"){
                url = `http://www.trabajofinalbdd.somee.com/api/students/delete/${item.nroLegajoA}`;
            }else if (type === "Materia"){
                url = `http://www.trabajofinalbdd.somee.com/api/subjects/delete/${item.codMateria}`;
            }else{
                url = `http://www.trabajofinalbdd.somee.com/api/exams/delete?legajo=${item.nroLegajoA}&materia=${item.codMateria}&turno=${item.codTurno}&year=${item.año}`;
            }
        }else {
            metodo = 'PUT';
            if (type ==="Profesor"){
                url = 'http://www.trabajofinalbdd.somee.com/api/professors/update';
            }else if (type === "Alumno"){
                url = 'http://www.trabajofinalbdd.somee.com/api/students/update';
            }else if (type === "Materia"){
                url = 'http://www.trabajofinalbdd.somee.com/api/subjects/update';
            }else{
                url = 'http://www.trabajofinalbdd.somee.com/api/exams/update';
            }
        }
        let options;
        if(metodo === "DELETE"){
            options = {
                method: metodo, // Método de la solicitud
                headers: {
                  'Content-Type': 'application/json', // Tipo de contenido del cuerpo de la solicitud
                  // Puedes agregar más encabezados según sea necesario
                },
            };
        }else{
            options = {
                method: metodo, // Método de la solicitud
                headers: {
                  'Content-Type': 'application/json', // Tipo de contenido del cuerpo de la solicitud
                  // Puedes agregar más encabezados según sea necesario
                },
                body: JSON.stringify(item) // Convierte los datos a formato JSON y los envía como cuerpo de la solicitud
            };
        }    
        fetch(url, options)
        .then(response => {
            if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
            }
            return response.json(); // Puedes cambiar esto según el tipo de respuesta esperada
        })
        .then(data => {
            // Maneja la respuesta exitosa aquí
            console.log('Respuesta exitosa:', data);
            alert('Cambios Realizados con Exito');
        })
        .catch(error => {
            // Maneja errores de red o errores de la aplicación
            alert(`Error : ${error}`);
            console.error('Error en la solicitud:', error);
        });      
    }
    return (
    <div className='container-fluid'>
        <div className='d-flex justify-content-center'>
            <Button className='adm-button-style' style={{ backgroundColor : `rgb(${background})`}} type='submit' onClick={handleOnClick}>{text}</Button>
        </div>
    </div>
    )
}

export default ADMButton