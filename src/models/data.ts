export interface Item {
  id: number;
  name: string;
  cost: number;
}

export interface IForm extends Item {
  quantity: number;
}
