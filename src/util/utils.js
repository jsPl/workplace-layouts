
export function generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getProductionHallIdFromUrl() {
    return new URL(window.location.href).searchParams.get('hala_id') || '';
}