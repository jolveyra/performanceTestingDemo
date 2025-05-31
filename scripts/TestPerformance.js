// import necessary module
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    // Se pueden definir thresholds para service-level objectives (SLOs) (en consola nos aparece si se cumplen o no)
    thresholds: {
        http_req_failed: ['rate<0.01'], // aca los errores http tienen que ser menos del 1%
        http_req_duration: ['p(99)<1000'], // y 99% de las requests tienen que demorar menos de 1000ms
    },
    // Se pueden definir escenarios de ejecucion dentro de la prueba
    scenarios: {
        // nombre del escenario:
        average_load: {
            executor: 'ramping-vus', // tipo de executor que permite simular una carga que va cambiando hsata llegar a un target
            stages: [
                // ramp up to average load of 20 virtual users
                { duration: '10s', target: 20 },
                // maintain load
                { duration: '50s', target: 20 },
                // ramp down to zero
                { duration: '5s', target: 0 },
            ],
        }
    }
};

export default function () {
    // define URL and payload
    const url = 'https://quickpizza.grafana.com/api/users/token/login';
    const payload = JSON.stringify({
        username: 'default',
        password: '12345678',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // send a post request and save response as a variable
    const res = http.post(url, payload, params);

    // Agrega una verificación de que el código sea 200 para el log
    check(res, {
        'response code was 200': (res) => res.status == 200,
    });

    // Sleep time is 500ms. Total iteration time is sleep + time to finish request.
    sleep(0.5);
}