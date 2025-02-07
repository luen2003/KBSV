export default interface TableParam {
    filters?: {field: string, operator: string, value: any}[],
    sorting?: {field: string, direction: string}[],
    pageSize?: number,
    page?: number,
}