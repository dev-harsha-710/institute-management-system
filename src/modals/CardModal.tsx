export interface ICard {
  imageUrl: string;
  productName: string;
  duration: number;
  price: number;
  description: string;
  onClick: () => void;
}

export interface ICards {
  cardData: ICard[];
}
