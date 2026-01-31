import React, { useState, useEffect } from "react";

export const useGameLogic = (cardValues) => {
    
    // to keep a track of empty list called cards, and give fn to change
    const [cards, setCards] = useState([]); // useState is a hook
    // keep track of flipped cards
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const shuffleArray = (array) => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const initializeGame = () => {
        // SHUFFLE THE CARDS
        const shuffled = shuffleArray(cardValues);

        // to turn each emoji into card object and store in new array finalCards
        const finalCards = shuffled.map((value, index) => ({
            id: index, // identifier
            value, // emoji
            isFlipped: false,
            isMatched: false,
        }));

        setCards(finalCards); // set cards empty array to finalCards

        // reset values
        setMoves(0);
        setIsLocked(false);
        setScore(0);
        setMatchedCards([]);
        setFlippedCards([]);
    }; // END initializeGame() fn

    useEffect(() => {
        initializeGame();
    }, []);

    const handleCardClick = (card) => {
        // don't allow click if card is already flipped or already matched
        if (
        card.isFlipped || 
        card.isMatched || 
        isLocked || 
        flippedCards.length === 2
        ) {
        return;
        }

        // make array of clicked on cards objects flipped = true
        const newCards = cards.map((c) => {
        if (c.id === card.id) {
            return { ...c, isFlipped: true };
        } else {
            return c;
        }
        });
        
        // set cards array to new array with modified state to true if clicked
        setCards(newCards);

        // equal to already flipped cards id and current card id
        const newFlippedCards = [...flippedCards, card.id]
        setFlippedCards(newFlippedCards)

        // MATCH
        // check for match if two cards are flipped
        if (flippedCards.length === 1) {
        setIsLocked(true);
        const firstCard = cards[flippedCards[0]];

        if (firstCard.value === card.value) {
            setTimeout(() => {
            // array of ids that were matched
            setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
            setScore((prev) => prev + 1);
            
            // set cards array to new array with modified state to true if clicked
            setCards((prev) => 
                prev.map((c) => {
                if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
                } else {
                return c;
                }
                })
            );

            setFlippedCards([]);
            setIsLocked(false);
        }, 500);

        } else { // if not match
            // flip back card 1, card 2
            setTimeout(() => {
            const flippedBackCard = newCards.map((c) => {
                if (newFlippedCards.includes(c.id) || c.id === card.id) {
                return {...c, isFlipped: false };
                } else {
                return c;
                }
            });
            
            setCards(flippedBackCard);

            setFlippedCards([])
            setIsLocked(false);
            }, 1000); // 1 sec delay before flippedBackCard() runs
        }
        }
        // prev is the most current state given to set fn
        setMoves((prev) => prev + 1);

    }; // END handleCardClick

    const isGameComplete = matchedCards.length === cardValues.length;

    return {
        cards, 
        score, 
        moves, 
        isGameComplete, 
        initializeGame, 
        handleCardClick,
    };
};