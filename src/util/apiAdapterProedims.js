import { getWorkplaces, getProductionHall } from '../selectors';
import { toFloat, metersToPixels } from './conversion';

const mapWorkplace = workplace => ({
    id: parseInt(workplace.id_system_object, 10) || 0,
    title: workplace.title || '',
    width: metersToPixels(workplace.version_fields.strefa_robocza_szerokosc) || 10,
    height: metersToPixels(workplace.version_fields.strefa_robocza_dlugosc) || 10,
    imgPath: workplace.imgPath,
    x: toFloat(workplace.polozenie_stanowiska_w_hali.x) || 0,
    y: toFloat(workplace.polozenie_stanowiska_w_hali.y) || 0,
    strefa_robocza_dlugosc: workplace.version_fields.strefa_robocza_dlugosc,
    strefa_robocza_szerokosc: workplace.version_fields.strefa_robocza_szerokosc
})

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