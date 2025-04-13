import { useEffect, useState } from 'react';
import ContentCard from '../components/ContentCard';
import { getCards } from '../services/api';

type Card = {
  id: string;
  title: string;
  description: string;
};

function Home() {
  const [cards, setCards] = useState<Card[]>([]); // Update the type here
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCards(page).then((data) => setCards(data));
  }, [page]);

  return (
    <div>
      <h1>Knowledge Feed</h1>
      <div className='card-grid'>
        {cards.map((card) => (
          <ContentCard
            key={card.id}
            card={card} // Pass the full card object
          />
        ))}
      </div>
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
}

export default Home;
