export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date;
  lastUpdated: Date;
}

export interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
