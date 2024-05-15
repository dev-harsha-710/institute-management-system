export interface ICard {
  imageUrl: string;
  productName: string;
  duration: number;
  price: number;
  description: string;
  onClick: (data: any) => void;
}

export interface ICards {
  cardData: ICard[];
  onCardClick: (data: any) => void;
}
