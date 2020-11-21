function incrementPosition(positions) {
    let numberOfPositions = Object.keys(positions).length;
    let newPositions = Object.assign({}, positions);

    for (var i = 0; i < numberOfPositions; i++) {
        if (i + 1 < numberOfPositions) {
            positions[i] = newPositions[i + 1];
        }
        else {
            positions[numberOfPositions - 1] = newPositions[0];
        }
    }

    return positions;
}

export function observe(args, receive) {
    setInterval(() => receive(incrementPosition(args)), 500)
}


// let imagePositions = [...Array(9)];
// let observer = null;

// function emitChange() {
//     return observer(imagePositions);
// }

// export function observe(o) {
//     if (observer) {
//       throw new Error('Multiple observers not implemented.');
//     }
  
//     observer = o;
//     emitChange();
//   }

//   export function moveImage(positions, origin, target) {
//     imagePositions = positions;

//     if (positions)

//     emitChange();
//   }