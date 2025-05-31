// import necessary module
import http from 'k6/http';
import { check } from 'k6';

export const RateCreatedOK = new Rate('CreatedOk');
export const options = {
    iterations: 10, // Define el número de iteraciones que se ejecutarán thresholds: 
    thresholds: {
        RateCreatedOK: [{ threshold: 'rate>1', abortOnFail: true }],
    },
};

export default function () {
    // define URL and payload
    const url = 'http://localhost:3000/tasks';
    const payload = JSON.stringify({
        title: 'default',
        description: '12345678',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // send a post request and save response as a variable
    const res = http.post(url, payload, params);

    // Agrega una verificación de que el código sea 200 para el log
    const success = check(res, {
        'response code was 201': (res) => res.status == 200,
    });

    RateContentOK.add(success);
}