import { ajax } from 'rxjs/ajax';
import { of, throwError } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { getProductionHallIdFromUrl } from '../utils/utils';
import * as apiAdapter from './apiAdapterProedims';

const httpHeaders = { 'Content-Type': 'application/json' };

//const API_URL = 'https://my-json-server.typicode.com/jsPl/workplace-layouts';
//const API_URL = 'http://localhost:3001';

const hala_id = getProductionHallIdFromUrl();
const API_URL = `/eoffice/resources/hala_produkcyjna/hala_produkcyjna_json_endpoint.xml?hala_id=${hala_id}`;
const API_URL_LOAD = `${API_URL}&action=hala_produkcyjna`;
const API_URL_LOAD_PROCESS_OPERATIONS = processId => `${API_URL}&action=pobierz_operacje_procesu&proces_id=${processId}`;
const API_URL_SAVE = `${API_URL}&action=zapisz`;

const throwErrorIfExistsInResponse = response => {
    return response.is_request_successful === false ?
        throwError({ type: 'error', message: response.error_message || 'Unspecified server error...' }) : of(response)
}

// export const fetchWorkplace = id => {
//     return ajax.getJSON(API_URL_LOAD).pipe(
//         flatMap(response => throwErrorIfExistsInResponse(response)),
//         map(response => {
//             const workplaces = response.stanowiska || [];
//             return workplaces.find(o => parseInt(o.id_system_object, 10) === id)
//         })
//     );
// }

// export const updateWorkplace = (id, payload) => {
//     return ajax.post(API_URL_SAVE, { id, ...payload }, httpHeaders);
// }

// export const fetchWorkplaces = () => {
//     return ajax.getJSON(API_URL_LOAD).pipe(
//         flatMap(response => throwErrorIfExistsInResponse(response)),
//         map(response => response.stanowiska || [])
//     );
// }

export const fetchProductionHallWithWorkplaces = () => {
    return ajax.getJSON(API_URL_LOAD).pipe(
        flatMap(response => throwErrorIfExistsInResponse(response)),
        map(response => apiAdapter.mapProductionHallWithWorkplacesResponseFromApi(response))
    );
}

export const postProductionHallWithWorkplaces = state => {
    return ajax.post(API_URL_SAVE, apiAdapter.mapStateToProductionHallWithWorkplacesApiRequest(state), httpHeaders).pipe(
        flatMap(({ response }) => throwErrorIfExistsInResponse(response))
    );
}

export const fetchOperationsByProcess = processId => {
    return ajax.getJSON(API_URL_LOAD_PROCESS_OPERATIONS(processId)).pipe(
        flatMap(response => throwErrorIfExistsInResponse(response)),
        map(response => {
            const operations = response.operacje || [];
            return operations.map(o => apiAdapter.mapOperation(o));
        })
    )
}