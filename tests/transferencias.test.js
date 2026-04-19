import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';

export const options = {
  interations: 10,
};

export default function() {
  const token = obterToken();
  const url = 'http://localhost:3000/transferencias';

  const payload = JSON.stringify({
    contaOrigem: 1,
    contaDestino: 2,
    valor: 100.00,
    token: ""
  });
      const params = {
          headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`
          },
      }
  
  const res = http.post(url, payload, params);
  

  let resposta = http.get('https://quickpizza.grafana.com');
  check(res, { 
    "status is 201": (resposta) => res.status === 201 
  }); 
  sleep(1);
}
