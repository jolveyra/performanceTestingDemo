import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  thresholds: {
    // thresholds son condiciones que se deben cumplir para que el test sea exitoso
    // si no se verifica un threshold, el test falla (nos va a servir para Action)
    // abortOnFail: true permite que si se rompe un threshold, se detenga la prueba
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    http_req_duration: [{ threshold:'p(99)<150', abortOnFail: true}]
  },
  // Los escenarios son para simular varias cargas en la misma prueba
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
    // definir URL y payload
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

    const res = http.post(url, payload, params);

    check(res, {
        'response code was 200': (res) => res.status == 200,
    });

    sleep(0.5);
}