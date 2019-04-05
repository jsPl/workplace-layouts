export function generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getProductionHallIdFromUrl() {
    return new URL(window.location.href).searchParams.get('hala_id') || '';
}

export function ensureElementIsInView(container, element) {
    //console.log('ensureElementIsInView', element, container)
    if (!container || !element) {
        return;
    }

    // Determine container top and bottom
    let cTop = container.scrollTop;
    let cBottom = cTop + container.clientHeight;

    //Determine element top and bottom
    let eTop = element.offsetTop;
    let eBottom = eTop + element.clientHeight;

    //Check if out of view
    if (eTop < cTop) {
        container.scrollTop -= (cTop - eTop);
    }
    else if (eBottom > cBottom) {
        container.scrollTop += (eBottom - cBottom);
    }
}

export function openPopup(url, w = 1000, h = 600) {
    const aw = window.screen.availWidth - 30;
    const ah = window.screen.availHeight - 30;

    const windowFeatures =
        "left=" + (aw - w) / 2 + ","
        + "top=" + (ah - h) / 2 + ","
        + "screenX=" + (aw - w) / 2 + ","
        + "screenY=" + (ah - h) / 2 + ","
        + "width=" + w + ","
        + "height=" + h + ","
        + "toolbar=no,"
        + "location=no,"
        + "directories=no,"
        + "status=no,"
        + "menubar=no,"
        + "scrollbars=yes,"
        + "resizable=yes";

    return window.open(url, '', windowFeatures);
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 * @param {[]} elements 
 * @param {String} propName 
 */
export const parseIdsFromDataset = (elements, propName) => {
    return elements.map(o => parseInt(o.dataset[propName])).filter(value => !isNaN(value));
}

export const isNullOrEmpty = value => value === null || !value || value.trim() === '';