import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { fetchReadData, REQUEST_TYPE } from '../../services/services';
import { host } from '../../services/API';
import { APP_THEME_COLOR } from '../../assets/themes/themes';
const status = {
    pending: '#2f9bf1',
    approved: "#8fd04e",
    rejected: "#f24728"

}
export const LeadsList = () => {
    const navigate = useNavigate();
    const [leadDetails, SetLeadDetails] = useState([]);

    useEffect(() => {
        fetchReadData(`${host}/leads`, REQUEST_TYPE.GET).then((response) => SetLeadDetails(response))
    }, [])
    useEffect(()=>{
        var cookieArr = document.cookie.split(";");
        var data = "";
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            if("token" === cookiePair[0].trim()) {
                data = decodeURIComponent(cookiePair[1]);
            }
        }
        if(data.length > 0){
        }
        else{
            navigate('/login');
        }
    },[])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box component="form" noValidate sx={{ mt: 5 }}>
                {leadDetails.length > 0 ? 
                <>
                    <h2 className='No-record pt-3 pb-3'>Customers List</h2>
                  {  leadDetails?.map((item, index) => {
                        return (
                            <Card key={index}
                                onClick={() => navigate(`/home/lead-details/?id=${item.uuid}`)}
                                sx={{ minWidth: 275, border: `1px solid ${APP_THEME_COLOR}`, marginBottom: 2, borderLeft: `5px solid ${APP_THEME_COLOR}` }}>
                                <CardContent sx={{padding:2}}>
                                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                                        {`${item.name.toUpperCase()}- ${item.pan}`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                <Button variant="contained" size="small" style={{ background: item.status === "PENDING" ? status['pending'] : item.status === "APPROVED" ? status['approved'] : status['rejected']}}>{item.status}</Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                    </>
                    :
                        <h2 className='No-record'>No records found</h2>
                }
            </Box>
        </Container>
    )
}

export default LeadsList


