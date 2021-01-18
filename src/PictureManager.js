let imagePositions = {};
let observer = null;
const FEED = "feed";
const DECK = "deck";
const NUM_COLUMNS = 3;

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
    imagePositions[FEED][target] = image;
}

function removeFromFeed(imagePositions, origin) {
    imagePositions[FEED][origin] = null;
}

function addToDeck(imagePositions, target, image) {
    let numberOfPositions = Object.keys(imagePositions[DECK]).length;

    if (imagePositions[DECK][target] === null) {
        for (var i = 0; i <= target; i++) {
            if (imagePositions[DECK][i] === null) {
                imagePositions[DECK][i] = image;
                break;
            }
        }
    }
    else {
        for (var i = numberOfPositions; i > target; i--) {
            if (imagePositions[DECK][i - 1] !== null) {
                imagePositions[DECK][i] = imagePositions[DECK][i - 1];
            }
        }
        
        imagePositions[DECK][target] = image;
    }
}

function removeFromDeck(imagePositions, origin) {
    let numberOfPositions = Object.keys(imagePositions[DECK]).length;

    for (var i = origin; i < numberOfPositions - 1; i++) {
        imagePositions[DECK][i] = imagePositions[DECK][i + 1];
    }

    if (numberOfPositions > NUM_COLUMNS) {
        delete imagePositions[DECK][numberOfPositions - 1];
    }
    else {
        imagePositions[DECK][numberOfPositions - 1] = null;
    }
}

export function moveImage(positions, originBoard, origin, targetBoard, target) {
    if (!canMoveImage(positions, originBoard, origin, targetBoard, target)) {
        return;
    }

    imagePositions = Object.assign({}, positions);

    if (originBoard === DECK && targetBoard === DECK) {
        if (imagePositions[targetBoard][target] === null) {
            return;
        }
    }

    if (targetBoard === FEED) {
        addToFeed(imagePositions, target, imagePositions[originBoard][origin]);
    }
    else {
        let positionToInsert = target;
        if (targetBoard === DECK && origin < target) {
            positionToInsert++;
        }
        addToDeck(imagePositions, positionToInsert, imagePositions[originBoard][origin]);
    }

    if (originBoard === FEED) {
        removeFromFeed(imagePositions, origin);
    }
    else {
        let positionToRemove = origin;
        if (targetBoard === DECK && target < origin) {
            positionToRemove++;
        }
        removeFromDeck(imagePositions, positionToRemove);
    }

    emitChange();
}

export function canMoveImage(positions, originBoard, origin, targetBoard, target) {
    if (targetBoard === DECK) {
        return true;
    }
    
    if (positions[originBoard][origin] === null || positions[targetBoard][target] != null) {
        return false;
    }

    return true;
}

export function initialLoadDeck(imagePositions, target, image) {
    addToDeck(imagePositions, target, image);
    emitChange();
}