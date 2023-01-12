import { Route } from "react-router-dom";
import {
    DASHBOARD,
    FOOD_WASTE,
    GROCERY_STORE,
    UTILITY_BILL

} from "../shared/modules/url/publicUrl.const";
import { DashboardContainer } from "../container/dashboardContainer/DashboardContainer";
import { GroceryStoreContainer } from "../container/groceryStoreContainer/GroceryStoreContainer";
import { FoodWasteContainer } from "../container/foodWasteContainer/FoodWasteContainer";
import { UtilityBillContainer } from "../container/utilityBillContainer/UtilityBillContainer";

export const PublicNavigation = [  
    <Route index path={DASHBOARD} key={DASHBOARD} element={<DashboardContainer />} />,
    <Route path={GROCERY_STORE} key={GROCERY_STORE} element={<GroceryStoreContainer />} />,
    <Route path={FOOD_WASTE} key={FOOD_WASTE} element={<FoodWasteContainer />} />,
    <Route path={UTILITY_BILL} key={UTILITY_BILL} element={<UtilityBillContainer />} />,
]