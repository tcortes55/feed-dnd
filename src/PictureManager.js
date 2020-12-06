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

export function moveImage(positions, origin, target) {
    if (!canMoveImage(positions, origin, target)) {
        return;
    }

    imagePositions.feed = Object.assign({}, positions);
    imagePositions.feed[target] = imagePositions.feed[origin];
    imagePositions.feed[origin] = null;

    emitChange();
}

export function canMoveImage(positions, origin, target) {
    if (positions[origin] === null || positions[target] != null) {
        return false;
    }

    return true;
}