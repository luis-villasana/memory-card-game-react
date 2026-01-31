import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";
import { WinMessage } from "./components/WinMessage"
import { useGameLogic } from "./hooks/useGameLogic"

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function App() {
  // order of properties do not matter because it's obj not array
  const {
    cards, 
    score,
    moves, 
    handleCardClick,
    initializeGame,
    isGameComplete,
  } = useGameLogic (cardValues) // pass cardValues to hook file


  return ( 
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {isGameComplete && <WinMessage moves={moves}/>}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div> 
  );
} // END App() fn

export default App
