import img1 from './images/b1.jpg';
import img2 from './images/b2.jpg';
import img3 from './images/b3.jpg';

function getPositions(randPos) {   
    const imagePositions = [];

    let i = randPos();

    imagePositions.push([(0 + i) % 9, null]);
    imagePositions.push([(1 + i) % 9, null]);
    imagePositions.push([(2 + i) % 9, img1]);
    imagePositions.push([(3 + i) % 9, null]);
    imagePositions.push([(4 + i) % 9, img2]);
    imagePositions.push([(5 + i) % 9, img3]);
    imagePositions.push([(6 + i) % 9, null]);
    imagePositions.push([(7 + i) % 9, null]);
    imagePositions.push([(8 + i) % 9, null]);

    return imagePositions;
}

export function observe(receive) {
    const randPos = () => Math.floor(Math.random() * 8)
    const myPositions = getPositions(randPos);
    setInterval(() => receive(getPositions(randPos)), 500)
  }

