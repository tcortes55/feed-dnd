import { deleteImageFromStorage, updateImagePositions } from './firebase/firebase';
import { Boards } from './constants';

let imagePositions = {};
let observer = null;
const NUM_COLUMNS = 4;

export function observe(args, o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }
  
    imagePositions = args;
    observer = o;
    emitChange();
}

function emitChange() {
    updateImagePositions(imagePositions);
    return observer(imagePositions);
}

function addToFeed(imagePositions, target, image) {
    imagePositions[Boards.FEED][target] = image;
}

function removeFromFeed(imagePositions, origin) {
    imagePositions[Boards.FEED][origin] = null;
}

function addToDeck(imagePositions, target, image) {
    let numberOfPositions = Object.keys(imagePositions[Boards.DECK]).length;

    if (imagePositions[Boards.DECK][target] === null) {
        for (var i = 0; i <= target; i++) {
            if (imagePositions[Boards.DECK][i] === null) {
                imagePositions[Boards.DECK][i] = image;
                break;
            }
        }
    }
    else {
        for (var i = numberOfPositions; i > target; i--) {
            if (imagePositions[Boards.DECK][i - 1] !== null) {
                imagePositions[Boards.DECK][i] = imagePositions[Boards.DECK][i - 1];
            }
        }
        
        imagePositions[Boards.DECK][target] = image;
    }
}

function removeFromDeck(imagePositions, origin) {
    let numberOfPositions = Object.keys(imagePositions[Boards.DECK]).length;

    for (var i = origin; i < numberOfPositions - 1; i++) {
        imagePositions[Boards.DECK][i] = imagePositions[Boards.DECK][i + 1];
    }

    if (numberOfPositions > NUM_COLUMNS) {
        delete imagePositions[Boards.DECK][numberOfPositions - 1];
    }
    else {
        imagePositions[Boards.DECK][numberOfPositions - 1] = null;
    }
}

export function moveImage(positions, originBoard, origin, targetBoard, target) {
    if (!canMoveImage(positions, originBoard, origin, targetBoard, target)) {
        return;
    }

    imagePositions = Object.assign({}, positions);

    if (originBoard === Boards.DECK && targetBoard === Boards.DECK) {
        if (imagePositions[targetBoard][target] === null) {
            return;
        }
    }

    if (targetBoard === Boards.FEED) {
        addToFeed(imagePositions, target, imagePositions[originBoard][origin]);
    }
    else {
        let positionToInsert = target;
        if (targetBoard === Boards.DECK && origin < target) {
            positionToInsert++;
        }
        addToDeck(imagePositions, positionToInsert, imagePositions[originBoard][origin]);
    }

    if (originBoard === Boards.FEED) {
        removeFromFeed(imagePositions, origin);
    }
    else {
        let positionToRemove = origin;
        if (targetBoard === Boards.DECK && target < origin) {
            positionToRemove++;
        }
        removeFromDeck(imagePositions, positionToRemove);
    }

    emitChange();
}

export function canMoveImage(positions, originBoard, origin, targetBoard, target) {
    if (targetBoard === Boards.DECK) {
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

export function deleteImage(imagePositions, board, position) {
    let imageUrl = imagePositions[board][position];
    deleteImageFromStorage(imageUrl);
    
    if (board === Boards.DECK) {
        removeFromDeck(imagePositions, position);
    }
    else {
        removeFromFeed(imagePositions, position);
    }

    emitChange();
}