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

export function moveImage(positions, originBoard, origin, targetBoard, target) {
    if (!canMoveImage(positions, originBoard, origin, targetBoard, target)) {
        return;
    }

    imagePositions = Object.assign({}, positions);
    imagePositions[targetBoard][target] = imagePositions[originBoard][origin];
    imagePositions[originBoard][origin] = null;

    emitChange();
}

export function canMoveImage(positions, originBoard, origin, targetBoard, target) {
    if (positions[originBoard][origin] === null || positions[targetBoard][target] != null) {
        return false;
    }

    return true;
}