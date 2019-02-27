import { getWorkplaces, getProductionHall } from '../selectors';

export const mapWorkplace = workplace => ({
    id: parseInt(workplace.id_system_object, 10) || 0,
    title: workplace.title || '',
    width: parseInt(workplace.version_fields.strefa_robocza_szerokosc, 10) || 100,
    height: parseInt(workplace.version_fields.strefa_robocza_dlugosc, 10) || 100,
    imgPath: workplace.imgPath,
    x: workplace.polozenie_stanowiska_w_hali.x || 0,
    y: workplace.polozenie_stanowiska_w_hali.y || 0
})

export const mapWorkplaces = workplaces => workplaces.map(o => mapWorkplace(o));

export const mapProductionHall = hall => ({
    id: parseInt(hall.id_system_object, 10) || 0,
    title: hall.title || ''
});

export const mapResponseFromApi = responsefromApi => {
    const workplaces = mapWorkplaces(responsefromApi.hala.stanowiska);
    const productionHall = mapProductionHall(responsefromApi.hala);

    return { productionHall, workplaces }
}

export const mapStateToApiRequest = state => {
    const workplaces = getWorkplaces(state).map(o => {
        const { x, y, ...wpData } = o;
        return { ...wpData, polozenie_stanowiska_w_hali: { x, y } }
    });

    return {
        hala: {
            ...getProductionHall(state),
            stanowiska: workplaces
        }
    }
}