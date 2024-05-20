import './style.css'

type CardComponentType = {
  icon: string;
  texts: string[];
  alt: string;
}

function Card({ icon, texts, alt }: CardComponentType) {
  return (
    <div className='card-container'>
      <img src={icon} alt={alt} />
      <div>
        {
          texts.map((text, index) => <p key={index}>{text}</p>)
        }
      </div>
    </div>
  );
}

export default Card;
