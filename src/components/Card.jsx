
export const Card = ({ card, onClick }) => {
    return (
        // checking if card is flipped, if so flipped class is added
        <div 
            className={`card 
                ${card.isFlipped ? "flipped" : ""} 
                ${card.isMatched ? "matched" : ""}`
            } 
            onClick={() => onClick(card)}
        >
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
        </div>
    );
}