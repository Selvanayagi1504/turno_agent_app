import * as React from 'react';
import DrawerComponent from '../../layouts/header';
import LeadsList from '../../components/Leads/leads-list';
import Box from '@mui/material/Box';
import CheckAdmin from '../../utils/check-admin';
import DrawerComponentAdmin from '../../layouts/header-admin';

export const LeadsListMain = () => {

    return (
        <Box sx={{ display: 'flex' }}>
            {CheckAdmin().toLowerCase() !== "Admin" ? <DrawerComponent /> : <DrawerComponentAdmin />}
            <main>
                <div className="app-bar-margin-top">
                    <LeadsList />
                </div>
            </main> 
        </Box>
    );
  }

export default LeadsListMain
