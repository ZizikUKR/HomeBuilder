import { UtilityBillNameEnum } from "../enums/utility-bill-name-enum";

export interface UpdateUtilityBillView {
    id: string;
    month: number;
    year: number;
    price: number;
    name: UtilityBillNameEnum;
}