// Módulos necesarios
import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check } from 'k6';

export const RateCreatedOK = new Rate('CreatedOk');
export const options = {
    iterations: 10, // Define el número de iteraciones que se ejecutarán thresholds: 
    thresholds: {
        CreatedOk: [{ threshold: 'rate>0.99', abortOnFail: true }],
    },
};

export default function () {
    // Definir URL donde vamos a ejecutar y el payload que vamos a enviar
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
        'response code was 200': (res) => res.status == 200,
    });

    RateCreatedOK.add(success);
}