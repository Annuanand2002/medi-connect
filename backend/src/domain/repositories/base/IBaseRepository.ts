export interface PaginationResult<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  findAll(
    page: number,
    limit: number,
    query: Record<string, unknown>,
  ): Promise<PaginationResult<T>>;
}
