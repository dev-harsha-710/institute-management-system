import React, { useEffect } from "react";
import Card from "../../components/Cards/Card";
import { ICards } from "../../modals/CardModal";
import Modal from "../Modals/Modal";

const Cards: React.FC<ICards> = ({ cardData, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardData &&
        cardData.length > 0 &&
        cardData.map((card) => (
          <Card
            id={card.id}
            imageUrl={card.imageUrl}
            productName={card.productName}
            duration={card.duration}
            price={card.price}
            description={card.description}
            onClick={() => onCardClick(card)}
          />
        ))}
    </div>
  );
};

export default Cards;
