const workplaceDefaults = {
    title: 'untitled workplace',
    x: 0,
    y: 0
}

export const mapWorkplace = workplace => ({
    ...workplaceDefaults,
    id: parseInt(workplace.id_system_object, 10) || 0,
    title: workplace.title,
    width: parseInt(workplace.version_fields.strefa_robocza_szerokosc, 10) || 100,
    height: parseInt(workplace.version_fields.strefa_robocza_dlugosc, 10) || 100,
    imgPath: workplace.imgPath
})

export const mapWorkplaces = workplaces => workplaces.map(o => mapWorkplace(o));