//execution with reports: K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=./reports/login-html-report.html k6 run tests/login.test.js

import http from 'k6/http';
import { sleep, check } from 'k6';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
  //vus : 10,
  //duration: '30s',
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '5s', target: 0 }
  ],  
  thresolds:{
    http_req_duration: ['p(90)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01']
  }
};

export default function (){
    const url = pegarBaseURL()  + '/login';
    //__ENV.BASE_URL + '/login' -> Terminal: k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000

    const payload = JSON.stringify(postLogin);
    
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