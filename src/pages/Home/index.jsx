import * as React from 'react';
import DrawerComponent from '../../layouts/header';
import Box from '@mui/material/Box';
import HomeWelcome from '../../components/HomePage';
import CheckAdmin from '../../utils/check-admin';
import DrawerComponentAdmin from '../../layouts/header-admin';

export const Home = () => {
    
    return (
        <Box sx={{ display: 'flex' }}>
            {CheckAdmin().toLocaleLowerCase !== "Admin" ? <DrawerComponent /> : <DrawerComponentAdmin /> }
            <main>
                <div className="app-bar-margin-top">
                    <HomeWelcome />
                </div>
            </main> 
        </Box>
    );
  }

export default Home
