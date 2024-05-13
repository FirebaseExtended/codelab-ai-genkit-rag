import { useState, useRef, useEffect } from 'react';

export function useCardScroll() {
  const [currentCard, setCurrentCard] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardsRef.current) {
        const container = cardsRef.current;
        const cards = Array.from(container.children) as HTMLElement[];
        const containerMidpoint =
          container.scrollLeft + container.offsetWidth / 2;

        let closestIndex = 0;
        let smallestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardMidpoint = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(cardMidpoint - containerMidpoint);

          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = index;
          }
        });

        setCurrentCard(closestIndex);
      }
    };

    const current = cardsRef.current;
    if (current) {
      current.addEventListener('scroll', handleScroll, { passive: true });
      return () => current.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return { cardsRef, currentCard };
}
