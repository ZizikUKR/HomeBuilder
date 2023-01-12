import React from "react";
import { Route, Routes } from "react-router-dom";
import { Page404 } from "../shared/components/page-404/Page404";
import { DASHBOARD } from "../shared/modules/url/publicUrl.const";
import { PublicNavigation } from "./PublicNavigation";

export const AppNavigation = () => (
    <Routes>
        <Route path={DASHBOARD}>
            {PublicNavigation}
        </Route>

        <Route path="*" element={<Page404 />} />
    </Routes>
)
