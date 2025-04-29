
export interface ProductDescription {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
  userId?: string;
  history?: DescriptionHistory[];
}

export interface DescriptionHistory {
  date: string;
  version: number;
  changes: string;
}
