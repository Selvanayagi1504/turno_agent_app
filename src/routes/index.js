import React, { Suspense} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import LoginMain from '../pages/Login'
import Home from '../pages/Home';
import CheckEligiblity from '../pages/Home/check-eligiblity';
import LeadDetailsMain from '../pages/Home/lead-details-main';
import LeadsListMain from '../pages/Home/leads-list-main';
import { DashboardMain } from '../pages/Admin/dashboard';
import LeadDetailsAdmin from '../pages/Admin/lead-details';
import EditLeadDetailsAdmin from '../pages/Admin/lead-details-edit';

const AppRouter = () => {
    return(
        <>
            <Router>
                <Suspense fallback={<div></div>}>
                    <Routes>
                      <Route exact path={"/login"} element={<LoginMain />} />
                      <Route exact path={"/home"} element={<Home />} />
                      <Route exact path={"/home/check-eligibility"} element={<CheckEligiblity />} />
                      <Route exact path={"/home/customers-list"} element={<LeadsListMain />} />
                      <Route exact path={"/home/lead-details/"} element={<LeadDetailsMain/>} />
                      <Route exact path={"/admin/dashboard/"} element={<DashboardMain />} />
                      <Route exact path={"/admin/leads-list/"} element={<LeadDetailsAdmin />} />
                      <Route exact path={"/admin/edit-lead"} element={<EditLeadDetailsAdmin />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    )
}

export default AppRouter;