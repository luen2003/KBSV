export type TableParam2Backend = {
    filters: {
        [key: string]: {
            value: any,
            matchMode: 'equals' | 'not' | 'contains' | 'startsWith' | 'endsWith' | 'inList' | 'notInList' | 'greaterThan' | 'greaterThanOrEquals' | 'lowersThan' | 'lowersThanOrEquals' | 'between';
            dataType?: 'datetime' | 'number' | 'string';
        }
    },
    rows?: number | null,
    first?: number | null,
    sortField?: string | null,
    sortOrder?: string | null,
}