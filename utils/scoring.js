export function countDice(dice) {
    const counts = [0,0,0,0,0,0,0];
    dice.forEach(d => counts[d]++);
    return counts;
  }
  
  export function sumOfKind(dice, n) {
    const counts = countDice(dice);
    for (let face = 6; face >= 1; face--) {
      if (counts[face] >= n) {
        return face * n;
      }
    }
    return 0;
  }
  
  export function oneThroughSix(dice, face) {
    return dice.filter(d => d === face).reduce((a, b) => a + b, 0);
  }
  
  export function pair(dice) {
    return sumOfKind(dice, 2);
  }
  
  export function twoPairs(dice) {
    const counts = countDice(dice);
    let pairs = [];
    for (let face = 6; face >= 1; face--) {
      if (counts[face] >= 2) pairs.push(face*2);
      if (pairs.length === 2) break;
    }
    return pairs.length === 2 ? pairs[0] + pairs[1] : 0;
  }
  
  export function threeOfKind(dice) {
    return sumOfKind(dice, 3);
  }
  
  export function fourOfKind(dice) {
    return sumOfKind(dice, 4);
  }
  
  export function fullHouse(dice) {
    const counts = countDice(dice);
    const has3 = counts.findIndex(c => c === 3);
    const has2 = counts.findIndex(c => c === 2);
    if (has3 > 0 && has2 > 0) {
      return has3*3 + has2*2;
    }
    return 0;
  }
  
  export function smallStraight(dice) {
    const needed = [1,2,3,4,5];
    return needed.every(n => dice.includes(n)) ? 15 : 0;
  }
  
  export function largeStraight(dice) {
    const needed = [2,3,4,5,6];
    return needed.every(n => dice.includes(n)) ? 20 : 0;
  }
  
  export function chance(dice) {
    return dice.reduce((a,b) => a + b, 0);
  }
  
  export function yatzy(dice) {
    return countDice(dice).includes(5) ? 50 : 0;
  }
  