
export interface IPropsNextPageButton {
    pageLength: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
