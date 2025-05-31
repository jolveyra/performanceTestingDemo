import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

// Define la lógica del VU - ejecuta tantas veces como lo configuremos en las options
export default function () {
    let res = http.post('http://localhost:3000/tasks', JSON.stringify({
        title: 'Test Task',
        description: 'This is a test task description.',
    }), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
        'status es 200': (r) => r.status === 200,
    });
    sleep(1);
}