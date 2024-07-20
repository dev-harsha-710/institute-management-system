export interface ICourse {
  //ICourse
  imageUrl: string;
  productName: string;
  duration: number;
  price: number;
  description: string;
  onClick: (data: any) => void;
}

export interface ICards {
  cardData: ICourse[];
  onCardClick: (data: any) => void;
}
