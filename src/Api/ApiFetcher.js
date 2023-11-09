import React, { useEffect, useState } from 'react';
import { ClockLoader} from 'react-spinners';
import './Loader.css'

const apiUrl = 'http://www.trabajofinalbdd.somee.com/api';

function ApiFetcher({ endpoint, onDataFetched }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/${endpoint}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
            return response.json();
        })
        .then((jsonData) => {
            setData(jsonData);
            setLoading(false);
            onDataFetched(jsonData); 
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, [endpoint]);

    return (
    <div>
        {loading ? (
        <div className='container-fluid'>
            <div className='row d-flex align items-center justify-content-center loader-style'>
                <ClockLoader color="#4DBDFC" size={160}/>
            </div>
        </div>
        ) : (
        <div>
        </div>
        )}
    </div>
    );
}

export default ApiFetcher;