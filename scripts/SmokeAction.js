import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check } from 'k6';

// Metrica custom para el rate de respuestas exitosas
export const RateCreatedOK = new Rate('CreatedOk');
export const options = {
    iterations: 10,
    thresholds: {
        CreatedOk: [{ threshold: 'rate>0.99', abortOnFail: true }],
    },
};

export default function () {
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

    const res = http.post(url, payload, params);

    const success = check(res, {
        'response code was 201': (res) => res.status == 201,
    });

    // si se verifica el check, se agrega a la métrica de rate
    RateCreatedOK.add(success);
}