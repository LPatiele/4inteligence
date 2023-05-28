import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
    scenarios: {
        k6_workshop: {
          executor: 'ramping-arrival-rate',
          startRate: 10,
          stages: [
            { target: 5, duration: "6s" },
            { target: 30, duration: "3s" },
            { target: 30, duration: "5s" },
            { target: 10, duration: "8s" },
            { target: 10, duration: "8s" },
          ],
          preAllocatedVUs: 30,
        },
    },
    thresholds: {
        http_req_failed: ['rate<=0.20'],
        http_req_duration: ['p(95)<30000'],
    },
}

export default function () {
    let url = 'https://serverest.dev/usuarios'
    let response = http.get(url)
   
}