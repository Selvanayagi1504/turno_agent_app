import * as React from 'react';
import Box from '@mui/material/Box';
import LeadDetails from '../../components/Admin/lead-details';
import DrawerComponentAdmin from '../../layouts/header-admin';

export const LeadDetailsAdmin = () => {
  

    return (
        <Box sx={{ display: 'flex' }} className="Edit-details-box">
            <DrawerComponentAdmin />
            <main className='Edit-details-main'>
                <div className="app-bar-margin-top">
                    <LeadDetails />
                </div>
            </main> 
        </Box>
    );
  }

export default LeadDetailsAdmin
