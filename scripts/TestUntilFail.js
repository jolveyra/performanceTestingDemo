// import necessary module
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  thresholds: {
    // abortOnFail: true permite que si se rompe un threshold, se detenga la prueba
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    http_req_duration: [{ threshold:'p(99)<160', abortOnFail: true}]
  },
  scenarios: {
    breaking: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 100 },
        { duration: '20s', target: 200 },
        { duration: '30s', target: 300 }
      ],
    },
  },
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