import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  stages: [
    { duration: '5s', target: 40 },
    { duration: '10s', target: 40 },
    { duration: '2s', target: 0 },
  ],
  thresholds: {
        http_req_failed: ['rate<=0.20'],
        http_req_duration: ['p(95)<30000'],
  },
}

export default function () {
  let url = 'https://serverest.dev/usuarios'
  let response = http.get(url)
  
  sleep(Math.random() * 2);
}