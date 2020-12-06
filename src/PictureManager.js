let imagePositions = {};
let observer = null;


export function observe(args, o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }
  
    imagePositions = args;
    observer = o;
    emitChange();
}

function emitChange() {
    return observer(imagePositions);
}

function addToFeed(imagePositions, target, image) {
    imagePositions["feed"][target] = image;
}

function removeFromFeed(imagePositions, origin) {
    imagePositions["feed"][origin] = null;
}

export function moveImage(positions, originBoard, origin, targetBoard, target) {
    if (!canMoveImage(positions, originBoard, origin, targetBoard, target)) {
        return;
    }

    imagePositions = Object.assign({}, positions);

    if (targetBoard === "feed") {
        addToFeed(imagePositions, target, imagePositions[originBoard][origin]);
    }
    else {//TODO: handle deck behavior
        imagePositions[targetBoard][target] = imagePositions[originBoard][origin];    
    }

    if (originBoard === "feed") {
        removeFromFeed(imagePositions, origin);
    }
    else {//TODO: handle deck behavior
        imagePositions[originBoard][origin] = null;
    }

    emitChange();
}

export function canMoveImage(positions, originBoard, origin, targetBoard, target) {
    if (targetBoard === "deck") {
        return true;
    }
    
    if (positions[originBoard][origin] === null || positions[targetBoard][target] != null) {
        return false;
    }

    return true;
}