import http from 'k6/http';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));
import { pegarBaseURL } from '../utils/variaveis.js';

export function obterToken(){
    const url = pegarBaseURL() + '/login';
    //__ENV.BASE_URL + '/login' -> Terminal: k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000
        const payload = JSON.stringify(postLogin);
        
        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    
    const res = http.post(url, payload, params);
    return res.json('token');
}