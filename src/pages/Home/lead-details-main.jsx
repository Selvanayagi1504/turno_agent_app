import * as React from 'react';
import LeadDetails from '../../components/Leads/lead-details';
import DrawerComponent from '../../layouts/header';
import Box from '@mui/material/Box';
import CheckAdmin from '../../utils/check-admin';
import DrawerComponentAdmin from '../../layouts/header-admin';

export const LeadDetailsMain = () => {
  

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                {CheckAdmin().toLowerCase() !== "admin" ? <DrawerComponent /> : <DrawerComponentAdmin />}
                <main>
                    <div className="app-bar-margin-top">
                        <LeadDetails />
                    </div>
                </main> 
            </Box>
        </>
    );
  }

export default LeadDetailsMain
