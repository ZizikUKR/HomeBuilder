import { NgSelectionView } from "../ng-selection-view";

export interface GetAllFoodCategoriesViewItem {
    id: string;
    name: string;
}

export interface GetAllFoodCategoriesView {
    // categories: Array<NgSelectionView>;
    categories: string[];
}