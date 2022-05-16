import * as React from 'react';
import DrawerComponent from '../../layouts/header';
import CreateLeads from '../../components/HomePage/check-eligiblity';
import Box from '@mui/material/Box';
import CheckAdmin from '../../utils/check-admin';
import DrawerComponentAdmin from '../../layouts/header-admin';

export const CheckEligiblity = () => {
  

    return (
        <Box sx={{ display: 'flex' }}>
            {
                CheckAdmin().toLowerCase() !== "admin" ? <DrawerComponent /> : <DrawerComponentAdmin />
            }
            <main>
                <div className="app-bar-margin-top">
                    <CreateLeads />
                </div>
            </main> 
        </Box>
    );
  }

export default CheckEligiblity
