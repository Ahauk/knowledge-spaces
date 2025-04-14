type CardProps = {
  card: {
    id: string;
    title: string;
    description: string;
  };
  onClick?: () => void;
};

export const Card = ({ card, onClick }: CardProps) => (
  <div
    className='bg-white p-4 rounded-xl shadow-md hover:shadow-lg cursor-pointer'
    onClick={onClick}
  >
    <h3 className='text-xl font-semibold'>{card.title}</h3>
    <p className='text-gray-600 text-sm'>{card.description}</p>
  </div>
);

export default Card;
