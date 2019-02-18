// import { of, throwError } from 'rxjs';
// import { delay } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// const databaseWorkplaces = [
//     { id: 1, title: 'Frezarka Mytrunnion 7G', color: '#e5c8e7', width: 200, height: 100, y: 200, imgPath: '/img/frezarka-mytrunnion-7g.png' },
//     { id: 2, title: 'Frezarka CNC Cormak-Mill 300-ecoline', color: '#309EFF', imgPath: '/img/frezarka-cnc-cormak-mill-300-ecoline.png' },
//     { id: 3, title: 'Tokarka Nakamura-Tome WT-100', color: '#FFCF60', x: 300, width: 80, height: 80, imgPath: '/img/tokarka-nakamura-tome-wt-100.png' },
//     { id: 4, title: 'Tokarka Nomura NN-16SB7', color: '#46ccac', x: 200, imgPath: '/img/tokarka-nomura-NN-16SB7.png' }
// ]

//const latency = 1000; // ms
const API_URL = 'https://my-json-server.typicode.com/jsPl/workplace-layouts';

// export const fetchWorkplace = (id) => {
//     const workplace = databaseWorkplaces.find(o => o.id === id);
//     if (typeof workplace === 'undefined') {
//         return throwError({ message: 'Workplace not found, id: ' + id })
//     }
//     return of(workplace).pipe(delay(latency));
// }

export const fetchWorkplace = (id) => {
    return ajax.getJSON(`${API_URL}/workplaces/${id}`);
}

export const fetchWorkplaces = () => {
    return ajax.getJSON(`${API_URL}/workplaces`);
}