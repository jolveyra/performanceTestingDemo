import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,            // Virtual users
    duration: '10s',    // Duración total del test
};

// Define la lógica del VU - ejecuta tantas veces como lo configuremos en las options
export default function () {
    let res = http.post('http://host.docker.internal:3000/tasks', JSON.stringify({
        title: 'Test Task',
        description: 'This is a test task description.',
    }), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
        'status es 201': (r) => r.status === 201,
    });
    sleep(1);
}