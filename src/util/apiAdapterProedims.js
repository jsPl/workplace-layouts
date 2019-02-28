import { getWorkplaces, getProductionHall } from '../selectors';
import { toFloat } from './utils';

const mapWorkplace = workplace => ({
    id: parseInt(workplace.id_system_object, 10) || 0,
    title: workplace.title || '',
    width: toFloat(workplace.version_fields.strefa_robocza_szerokosc, 10) || 100,
    height: toFloat(workplace.version_fields.strefa_robocza_dlugosc, 10) || 100,
    imgPath: workplace.imgPath,
    x: toFloat(workplace.polozenie_stanowiska_w_hali.x) || 0,
    y: toFloat(workplace.polozenie_stanowiska_w_hali.y) || 0
})

const mapWorkplaces = workplaces => workplaces.map(o => mapWorkplace(o));

const mapProductionHall = hall => ({
    id: parseInt(hall.id_system_object, 10) || 0,
    title: hall.title || ''
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