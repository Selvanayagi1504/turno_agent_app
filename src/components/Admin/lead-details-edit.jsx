import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { APP_THEME_COLOR } from '../../assets/themes/themes';
import { REQUEST_TYPE, fetchPutData, fetchReadData } from '../../services/services';
import { host } from '../../services/API';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../../utils/check-token';
import CheckAdmin from '../../utils/check-admin'
import FormControl from '@mui/material/FormControl';

export const EditLeads = () => {
    const [Status, setStatus] = React.useState('');
    const [Error, setError] = React.useState('');
    const handleChange = (event) => {
      setStatus(event.target.value);
    };
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    const [leadDetails, SetLeadDetails] = useState();
    useEffect(()=>{
        fetchReadData(`${host}/leads/${id}`, REQUEST_TYPE.GET)
        .then((response) => {
            if(response?.message){
                SetLeadDetails({
                    "id": "",
                    "uuid": "",
                    "createdBy": "",
                    "createdAt": "",
                    "modifiedAt": "",
                    "name": "",
                    "phone": "",
                    "dob": "",
                    "pan": "",
                    "status": ""
                })
                setError(response.message)
            }
            else{
                SetLeadDetails(response); 
                setStatus(response.status)
            }
        })
    },[id])

    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const userDetails = {
            "name": leadDetails.name,
            "phone" : leadDetails.phone,
            "pan" : leadDetails.pan,
            "dob": leadDetails.dob,
            "status": Status
        };
        fetchPutData(`${host}/leads/${id}1`, userDetails, REQUEST_TYPE.PUT).then((response) => {
            if(response?.message){
                setError(response.message)
            }
            else{
                window.location.href = '/admin/leads-list';
            }
        }).catch(() => {});
    }

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
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            
            <h2 className="Head_text_form">Edit Loan Eligiblity</h2>
            {
                Error.length > 0
                ?
                    <div className='error'>{Error}</div>
                :
                <>
                    {
                        leadDetails && 
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Name"
                            name="username"
                            autoComplete="off"
                            disabled
                            autoFocus
                            value={leadDetails.name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled
                            name="pan_number"
                            label="PAN Card"
                            type="text"
                            autoComplete="off"
                            id="pan_number"
                            value={leadDetails.pan}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled
                            type='number'
                            id="phonenumber"
                            autoComplete="off"
                            label="Phone number"
                            name="phonenumber"
                            value={leadDetails.phone}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DatePicker
                                autoComplete = "false"
                                disabled
                                label="Date of Birth"
                                value={leadDetails.dob}
                                onChange={() => {
                                    // do nothing
                                }}
                                renderInput={(params) => <TextField style={{marginTop: "10px"}} fullWidth {...params} name="dob" id="dob" />}
                            />
                        </LocalizationProvider>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pincode"
                            disabled
                            // value={leadDetails.pin}
                            autoComplete="off"
                            label="Pincode"
                            name="pincode"
                            type='number'
                        />
                        <FormControl sx={{ m: 1 }}>
                        <InputLabel id="demo-multiple-name-label">Status</InputLabel>
                        <Select
                            // labelId="demo-multiple-name-label"   
                            id="status"
                            value={Status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value={"PENDING"}>PENDING</MenuItem>
                            <MenuItem value={"APPROVED"}>APPROVED</MenuItem>
                            <MenuItem value={"REJECTED"}>REJECTED</MenuItem>
                        </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: APP_THEME_COLOR }}
                        >
                            Check
                        </Button>
                    </Box>
                    }
                </>
            }
        </Container>
    )
}

export default EditLeads