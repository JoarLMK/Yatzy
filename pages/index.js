import React, { useState } from 'react';
import Dice from '../components/Dice';
import Scores from '../components/Scores';
import * as scoring from '../utils/scoring';

export default function Home() {
  const emptyScores = {
    ones: null, twos: null, threes: null, fours: null, fives: null, sixes: null,
    pair: null, twoPairs: null, threeKind: null, fourKind: null,
    fullHouse: null, small: null, large: null, chance: null, yatzy: null
  };

  const [dice, setDice]     = useState([1,1,1,1,1]);
  const [held, setHeld]     = useState([false,false,false,false,false]);
  const [rolls, setRolls]   = useState(0);
  const [scores, setScores] = useState({ ...emptyScores });

  const turnsCount = Object.values(scores).filter(v => v != null).length;
  const totalScore = Object.values(scores).reduce((sum, v) => sum + (v||0), 0);

  function rollDice() {
    if (rolls >= 3 || turnsCount >= 15) return;
    setDice(dice.map((d,i) => held[i] ? d : Math.ceil(Math.random()*6)));
    setRolls(r => r + 1);
  }

  function toggleHold(idx) {
    if (rolls === 0) return;
    setHeld(h => {
      const copy = [...h];
      copy[idx] = !copy[idx];
      return copy;
    });
  }

  function handleScore(category) {
    if (rolls === 0 || turnsCount >= 15) return;

    const val = (() => {
      switch(category) {
        case 'ones':   return scoring.oneThroughSix(dice, 1);
        case 'twos':   return scoring.oneThroughSix(dice, 2);
        case 'threes': return scoring.oneThroughSix(dice, 3);
        case 'fours':  return scoring.oneThroughSix(dice, 4);
        case 'fives':  return scoring.oneThroughSix(dice, 5);
        case 'sixes':  return scoring.oneThroughSix(dice, 6);
        case 'pair':      return scoring.pair(dice);
        case 'twoPairs':  return scoring.twoPairs(dice);
        case 'threeKind': return scoring.threeOfKind(dice);
        case 'fourKind':  return scoring.fourOfKind(dice);
        case 'fullHouse': return scoring.fullHouse(dice);
        case 'small':     return scoring.smallStraight(dice);
        case 'large':     return scoring.largeStraight(dice);
        case 'chance':    return scoring.chance(dice);
        case 'yatzy':     return scoring.yatzy(dice);
        default: return 0;
      }
    })();

    setScores(s => ({ ...s, [category]: val }));
    setDice([1,1,1,1,1]);
    setHeld([false,false,false,false,false]);
    setRolls(0);
  }

  function resetGame() {
    setScores({ ...emptyScores });
    setDice([1,1,1,1,1]);
    setHeld([false,false,false,false,false]);
    setRolls(0);
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Yatzy</h1>
      {turnsCount < 15 ? (
        <h2>Runda {turnsCount + 1} av 15</h2>
      ) : (
        <div>
          <h2>Spelet är över!</h2>
          <h3>Din poäng: {totalScore}</h3>
          <button onClick={resetGame} style={{ marginTop: 10, padding: '8px 16px' }}>
            Ny omgång
          </button>
        </div>
      )}

      <div>
        {dice.map((d,i) => (
          <Dice
            key={i}
            value={d}
            held={held[i]}
            onClick={() => toggleHold(i)}
          />
        ))}
      </div>

      {turnsCount < 15 && (
        <button
          onClick={rollDice}
          disabled={rolls >= 3}
          style={{ marginTop: 10, padding: '10px 20px' }}
        >
          {rolls === 0
            ? 'Börja kasta'
            : rolls < 3
            ? `Kasta igen (${rolls}/3)`
            : 'Inga fler kast'}
        </button>
      )}

      <Scores
        scores={scores}
        rolls={rolls}
        turnsCount={turnsCount}
        onScore={handleScore}
      />

      {turnsCount < 15 && (
        <h2>Total: {totalScore}</h2>
      )}
    </div>
  );
}
