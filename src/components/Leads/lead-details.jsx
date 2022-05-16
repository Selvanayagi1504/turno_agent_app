import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { fetchReadData, REQUEST_TYPE } from '../../services/services';
import { host } from '../../services/API';
import { APP_THEME_COLOR } from '../../assets/themes/themes';
const colorStatus = {
    pending: '#2f9bf1',
    approved: "#8fd04e",
    rejected: "#f24728"
}

export const LeadDetails = (props) => {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    const [Error, setError] = useState('');
    const [leadDetails, SetLeadDetails] = useState();
    useEffect(()=>{
        fetchReadData(`${host}/leads/${id}`, REQUEST_TYPE.GET)
        .then((response) => {
            if(response?.message){
                setError(response.message)
            }
            else{
                SetLeadDetails(response)
            }
        })
    },[id])
    const navigate = useNavigate();
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
    },[navigate])
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {
                Error.length > 0
                ?
                <div className="error">{Error}</div>
                :
                <>
                    {
                        leadDetails && 
                        <Box component="form" noValidate sx={{ mt: 1, pt: 5 }}>
                            <Card sx={{ minWidth: 275, height: 50, border: `1px solid ${APP_THEME_COLOR}`, marginBottom: 1, }}>

                                <Typography sx={{ padding: "0px 10px", fontSize: 14, textAlign: "center", marginTop: 2 }} color="text.primary" gutterBottom>
                                    UUID: {leadDetails.uuid}
                                </Typography>
                            </Card>
                            <Card sx={{ minWidth: 275, height: 50, border: `1px solid ${APP_THEME_COLOR}`, marginBottom: 1, }}>

                                <Typography sx={{ padding: "0px 10px", fontSize: 14, textAlign: "center", marginTop: 2 }} color="text.primary" gutterBottom>
                                    Name: {leadDetails.name}
                                </Typography>
                            </Card>
                            <Card sx={{ minWidth: 275, height: 50, border: `1px solid ${APP_THEME_COLOR}`, marginBottom: 1, }}>

                                <Typography sx={{ padding: "0px 10px", fontSize: 14, textAlign: "center", marginTop: 2 }} color="text.primary" gutterBottom>
                                    PAN: {leadDetails.pan}
                                </Typography>
                            </Card>
                            <Card sx={{ minWidth: 275, height: 50, border: `1px solid ${APP_THEME_COLOR}`, marginBottom: 1, }}>
                                <Typography sx={{ padding: "0px 10px", fontSize: 14, textAlign: "center", marginTop: 2 }} color="text.primary" gutterBottom>
                                    DOB: {(new Date(leadDetails.dob).toISOString().split('T')[0]).split("-").reverse().join("-")}
                                </Typography>

                            </Card>
                            <Card sx={{ minWidth: 275, height: 50, border: `1px solid ${APP_THEME_COLOR}`, marginBottom: 1, }}>

                                <Typography sx={{ padding: "0px 10px", fontSize: 14, textAlign: "center", marginTop: 2 }} color="text.primary" gutterBottom>
                                    Phone: {leadDetails.phone}
                                </Typography>

                            </Card>
                            <Card sx={{ minWidth: 275, height: 50, border: `1px solid ${APP_THEME_COLOR}`, marginBottom: 1, }}>

                                <Typography sx={{ padding: "0px 10px", fontSize: 14, textAlign: "center",verticalAlign:'baseline'}} color="text.primary" gutterBottom>
                                    Status: <Button style={{padding: "10px 0px", color : leadDetails.status === "PENDING" ? colorStatus['pending'] : leadDetails.status === "APPROVED" ? colorStatus['approved'] : colorStatus['rejected']}}>{leadDetails.status}</Button>
                                </Typography>

                            </Card>

                        </Box>
                    }
                </>
            }
        </Container>
    )
}

export default LeadDetails


