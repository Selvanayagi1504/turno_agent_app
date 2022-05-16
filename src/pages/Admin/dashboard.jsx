import * as React from 'react';
import Box from '@mui/material/Box';
import Dashboard from '../../components/Admin/dashboard';
import DrawerComponentAdmin from '../../layouts/header-admin';

export const DashboardMain = () => {

    
    return (
        <Box sx={{ display: 'flex' }} className="box-block">
            <DrawerComponentAdmin />
            <main>
                <div className="app-bar-margin-top">
                    <Dashboard />
                </div>
            </main> 
        </Box>
    );
  }

export default DashboardMain
