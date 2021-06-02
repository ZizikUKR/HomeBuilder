import { UtilityBillNameEnum } from "../enums/utility-bill-name-enum";

export interface UtilityBillGetAllViewItem{
    id:string;
    creationDate: Date;
    month: number;
    year: number;
    price: number;
    name : UtilityBillNameEnum;
}