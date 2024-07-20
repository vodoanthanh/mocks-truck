export interface Tag {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagQuery {
  query?: string;
  ids?: number[];
}
