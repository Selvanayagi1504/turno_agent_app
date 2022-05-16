import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import CheckToken from '../../utils/check-token';
import CheckAdmin from '../../utils/check-admin'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PeopleIcon from '@mui/icons-material/People';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../assets/css/dashboard-admin.module.css'

export const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        var data = CheckToken();
        if(data.length > 0){
        }
        else{
            navigate('/login');
        }
        data = CheckAdmin();
        if(data.toLowerCase() !== 'admin'){
            navigate('/home');
        }
    },[navigate])
    return (
        <>
            <Box component="form" noValidate sx={{ mt: 5}}>
                <h2 className='No-record pt-3 pb-3'>Dashboard</h2>
                <div className='d-flex justify-content-center'>
                    <div className={styles.card_dashboard} onClick={()=>{ window.location.href = '/admin/leads-list' }}>
                        <RecentActorsIcon />
                        <br/>
                        Leads
                    </div>
                    <div className={`${styles.card_dashboard} ${styles.ml_3}`} onClick={()=>{ window.location.href = '/admin/users-list' }}>
                        <PeopleIcon />
                        <br/>
                        Users
                    </div>
                </div>
            </Box>
        </>
    )
}

export default Dashboard