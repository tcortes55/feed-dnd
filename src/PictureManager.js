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
    if (positions[origin] === null || positions[target] != null) {
        return;
    }

    imagePositions = Object.assign({}, positions);
    imagePositions[target] = imagePositions[origin];
    imagePositions[origin] = null;

    emitChange();
}