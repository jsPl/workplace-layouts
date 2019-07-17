import { getProductionHall } from '../../redux/productionHall';
import { getWorkplaces } from '../../redux/workplace';
import { toFloat, metersToPixels } from '../utils/conversion';

const mapWorkplace = workplace => ({
    id: parseInt(workplace.id_system_object, 10) || 0,
    title: workplace.title || '',
    width: metersToPixels(workplace.version_fields.strefa_robocza_szerokosc) || 10,
    height: metersToPixels(workplace.version_fields.strefa_robocza_dlugosc) || 10,
    imgPath: workplace.imgPath,
    x: toFloat(workplace.polozenie_stanowiska_w_hali.x) || 0,
    y: toFloat(workplace.polozenie_stanowiska_w_hali.y) || 0,
    strefa_robocza_dlugosc: workplace.version_fields.strefa_robocza_dlugosc,
    strefa_robocza_szerokosc: workplace.version_fields.strefa_robocza_szerokosc,
    state: { code: workplace.version_fields.state || '', label: workplace.version_fields.state_label || '' },
    fixedPosition: workplace.version_fields.nie_zmienia_polozenia_w_hali === '1',
    //api: workplace.api,
    api: getMockApi(workplace),
})

const getMockApi = workplace => {
    if (!['UR 10', 'MIR 100'].includes(workplace.title)) {
        return null;
    }
    return {
        endpoint: 'ws://proedims:8080/ur10',
        type: 'ur',
        rtde_outputs: 'actual_q,actual_TCP_pose', //workplace.title === 'MIR 100' ? 'actual_q,actual_TCP_pose' : null,
        rtde_frequency: 5, //workplace.title === 'MIR 100' ? 3 : null,
    }
}

const mapWorkplaces = workplaces => workplaces.map(o => mapWorkplace(o));

const mapProcess = process => ({
    id: parseInt(process.id_system_object, 10) || 0,
    title: process.title || '',
})

export const mapOperation = operation => ({
    id: parseInt(operation.relation_id, 10) || 0,
    id_system_object: parseInt(operation.id_system_object, 10) || 0,
    position: parseInt(operation.ord, 10) || 0,
    title: operation.title || '',
    description: operation.version_fields.desc || '',
    default_workplace_id: parseInt(operation.version_fields.default_workplace, 10) || 0,
    default_workplace_title: operation.default_workplace_title || '',
    koszt_transportu: toFloat(operation.koszt_transportu) || 0
})

const mapProductionHall = hall => ({
    id: parseInt(hall.id_system_object, 10) || 0,
    title: hall.title || '',
    svgPath: hall.svgPath,
    svgScale: toFloat(hall.skalaRysunku) || 1,
    svgScaleAsString: hall.skalaRysunkuAsString
});

export const mapProductionHallWithWorkplacesResponseFromApi = responsefromApi => {
    const productionHall = mapProductionHall(responsefromApi.hala);
    const workplaces = mapWorkplaces(responsefromApi.hala.stanowiska);
    const processes = responsefromApi.hala.procesy.map(o => mapProcess(o));

    workplaces.forEach(o => {
        o.width = metersToPixels(o.strefa_robocza_szerokosc, productionHall.svgScale);
        o.height = metersToPixels(o.strefa_robocza_dlugosc, productionHall.svgScale);
    })

    return { productionHall, workplaces, processes }
}

export const mapStateToProductionHallWithWorkplacesApiRequest = state => {
    const workplaces = getWorkplaces(state).map(o => {
        const { x, y, ...wpProps } = o;
        return { ...wpProps, polozenie_stanowiska_w_hali: { x, y } }
    });

    return {
        hala: {
            ...getProductionHall(state),
            stanowiska: workplaces
        }
    }
}