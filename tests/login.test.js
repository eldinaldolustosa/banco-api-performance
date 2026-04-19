import http from 'k6/http';
import { sleep, check } from 'k6';


export const options = {
  iterations: 60,
  thresolds:{
    http_req_duration: ['p(90)<10', 'max<1'],
    http_req_failed: ['rate<0.01']
  }
};

export default function (){
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify({
        username: 'julio.lima',
        senha: '123456',
    });
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const res = http.post(url, payload, params);
    check(res, {
        'Validar status 200' : (r) => r.status === 200,
        'Validar Token String' : (r) => typeof(r.json().token) === 'string'
    })
    sleep(1);
}