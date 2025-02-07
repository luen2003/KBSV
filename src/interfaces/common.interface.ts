export interface IDataRes<T> {
  code: number;
  transactionTime: number;
  value: T;
  message: string;
}
