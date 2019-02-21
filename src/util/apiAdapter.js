const workplaceDefaults = {
    id: 0,
    title: 'untitled workplace',
    width: 100,
    height: 100,
    x: 0,
    y: 0
}

export const mapWorkplace = workplace => ({
    ...workplaceDefaults,
    id: parseInt(workplace.id_system_object, 10),
    title: workplace.title,
    width: parseInt(workplace.version_fields.strefa_robocza_szerokosc, 10) || 0,
    height: parseInt(workplace.version_fields.strefa_robocza_dlugosc, 10) || 0,
})