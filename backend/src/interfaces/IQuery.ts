export interface IQuery {
    pageSize: number;
    page: number;
    search?: string;
    order?: string;
}
export interface IPizzaQuery extends IQuery {
    name?: string;
    price?: number;
    size?: number;
}
