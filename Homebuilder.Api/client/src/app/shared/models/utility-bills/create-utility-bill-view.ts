import { UtilityBillNameEnum } from "../enums/utility-bill-name-enum";

export interface CreateUtilityBillView {
    month: number;
    year: number;
    price: number;
    name: UtilityBillNameEnum;
}