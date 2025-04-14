import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { getCardById, getRelatedCards } from '../services/api';

function CardDetail() {
  const { id } = useParams();
  const [card, setCard] = useState<{ title: string; content: string } | null>(
    null
  );
  const [relatedCards, setRelatedCards] = useState([]);

  useEffect(() => {
    if (id) {
      getCardById(id).then(setCard);
      getRelatedCards(Number(id)).then(setRelatedCards);
    }
  }, [id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{card.title}</h1>
      <p>{card.content}</p>
      <h2>Related Cards</h2>
      <div className='card-grid'>
        {relatedCards
          .filter((relatedCard) => relatedCard !== undefined)
          .map(
            (relatedCard: {
              id: string;
              title: string;
              description: string;
            }) => (
              <Card
                key={relatedCard.id}
                card={relatedCard}
              />
            )
          )}
      </div>
    </div>
  );
}

export default CardDetail;
