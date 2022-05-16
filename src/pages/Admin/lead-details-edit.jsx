import * as React from 'react';
import Box from '@mui/material/Box';
import EditLeads from '../../components/Admin/lead-details-edit';
import DrawerComponentAdmin from '../../layouts/header-admin';

export const EditLeadDetailsAdmin = () => {
  

    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerComponentAdmin />
            <main>
                <div className="app-bar-margin-top">
                    <EditLeads />
                </div>
            </main> 
        </Box>
    );
  }

export default EditLeadDetailsAdmin
