import { getWorkplaces, getProductionHall } from '../selectors';
import { toFloat, metersToPixels, polygonPointsMetersToPixels } from './utils';

const mapWorkplace = workplace => ({
    id: parseInt(workplace.id_system_object, 10) || 0,
    title: workplace.title || '',
    width: metersToPixels(toFloat(workplace.version_fields.strefa_robocza_szerokosc, 10)) || 100,
    height: metersToPixels(toFloat(workplace.version_fields.strefa_robocza_dlugosc, 10)) || 100,
    imgPath: workplace.imgPath,
    x: toFloat(workplace.polozenie_stanowiska_w_hali.x) || 0,
    y: toFloat(workplace.polozenie_stanowiska_w_hali.y) || 0,
    strefa_robocza_dlugosc: workplace.version_fields.strefa_robocza_dlugosc,
    strefa_robocza_szerokosc: workplace.version_fields.strefa_robocza_szerokosc,
})

const mapWorkplaces = workplaces => workplaces.map(o => mapWorkplace(o));

const mapProductionHall = hall => ({
    id: parseInt(hall.id_system_object, 10) || 0,
    title: hall.title || '',
    polygonPoints: polygonPointsMetersToPixels(hall.version_fields.description)
});

export const mapProductionHallWithWorkplacesResponseFromApi = responsefromApi => {
    const workplaces = mapWorkplaces(responsefromApi.hala.stanowiska);
    const productionHall = mapProductionHall(responsefromApi.hala);

    return { productionHall, workplaces }
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