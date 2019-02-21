import { ajax } from 'rxjs/ajax';
import { of, throwError } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { getProductionHallIdFromUrl } from './util/utils';

const httpHeaders = { 'Content-Type': 'application/json' };

//const API_URL = 'https://my-json-server.typicode.com/jsPl/workplace-layouts';
//const API_URL = 'http://localhost:3001';

const hala_id = getProductionHallIdFromUrl();
const API_URL = `/eoffice/resources/hala_produkcyjna/hala_produkcyjna_json_endpoint.xml?action=hala_produkcyjna&hala_id=${hala_id}`;

const throwErrorIfExistsInResponse = response => {
    return response.is_request_successful === false ?
        throwError({ message: response.error_message || 'Unspecified server error...' }) : of(response)
}

export const fetchWorkplace = id => {
    return ajax.getJSON(API_URL).pipe(
        flatMap(response => throwErrorIfExistsInResponse(response)),
        map(response => {
            const workplaces = response.stanowiska || [];
            return workplaces.find(o => parseInt(o.id_system_object, 10) === id)
        })
    );
}

export const updateWorkplace = (id, payload) => {
    return ajax.patch(`${API_URL}/workplaces/${id}`, payload, httpHeaders);
}

export const fetchWorkplaces = () => {
    return ajax.getJSON(API_URL).pipe(
        flatMap(response => throwErrorIfExistsInResponse(response)),
        map(response => response.stanowiska || [])
    );
}