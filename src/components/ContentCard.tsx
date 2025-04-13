import { Link } from 'react-router-dom';
import '../styles/ContentCard.css';

type Props = {
  card: {
    id: string;
    title: string;
    description: string;
  };
};

function ContentCard({ card }: Props) {
  return (
    <Link
      to={`/card/${card.id}`}
      className='content-card'
    >
      <h3>{card.title}</h3>
      <p>{card.description.slice(0, 100)}...</p>
    </Link>
  );
}

export default ContentCard;
