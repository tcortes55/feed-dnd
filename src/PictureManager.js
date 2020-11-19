function incrementPosition(positions) {
    positions.forEach(element => {
        if (element[0] + 1 < 9) {
            element[0] = element[0] + 1;
        }
        else {
            element[0] = element[0] + 1 - 9;
        }
    });

    return positions;
}

export function observe(args, receive) {
    setInterval(() => receive(incrementPosition(args)), 500)
}

