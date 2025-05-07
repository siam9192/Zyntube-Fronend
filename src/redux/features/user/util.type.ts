

export enum ECardViewType {
  GRID = "grid",
  LIST = "list",
}

export type TCardViewType = `${ECardViewType}`;

export type TPricing = {
  price: number;
  offerPrice?: number;
};

export interface IParam {
  name: string;
  value: string | number | null;
}

export type TSearchKeywordData = {
  type: "product" | "category";
  name: string;
  imageUrl: string;
  price?: number;
  stock?: number;
  hierarchySte?: string;
};


export interface IResponse<T> {
  data: T;
  meta: TMeta;
  error?: TError;
  success: boolean;
  message: string;
}

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  totalResult: number;
  total: number;
};

export type TParma = {
  name: string;
  value: string | number | null | undefined;
};
