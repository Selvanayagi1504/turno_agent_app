import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { APP_THEME_COLOR } from '../../assets/themes/themes';
import { REQUEST_TYPE, fetchData } from '../../services/services';
import { host } from '../../services/API';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../../utils/check-token'

export const CreateLeads = () => {
    const [value, setValue] = useState(null);
    const [ErrorFailed, setErrorFailed] = useState('');
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState({
        name: "",
        pan: "",
        phonenumber: "",
        dob: "",
        pin: ""
    })
    

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        let pass = true;
        const data = new FormData(event.currentTarget);
        const userDetails = {
            name: data.get('username'),
            phone : data.get('phonenumber'),
            pan : data.get('pan_number'),
            pincode : data.get('pincode'),
            status : "PENDING",
            createdBy : data.get('username'),
            dob : value?.toISOString().split('T')[0]
        };
        if(userDetails.name.length <= 0 ){
            setError((prevState) => ({
                ...prevState,
                name: 'Name is required.'
            }))
            pass = false;
        }
        if(userDetails.pan.length <= 0 ){
            setError((prevState) => ({
                ...prevState,
                pan: 'Pan number is required.'
            }))
            pass = false;
        }
        if(userDetails.phone.length <= 0 ){
            setError((prevState) => ({
                ...prevState,
                phonenumber: 'Phone number is required.'
            }))
            pass = false;
        }
        if( userDetails.phone.length > 10 ){
            setError((prevState) => ({
                ...prevState,
                phonenumber: 'Phone number should not be greater than 10'
            }))
            pass = false;
        }
        if( userDetails.pincode.length <= 0 ){
            setError((prevState) => ({
                ...prevState,
                pin: 'Pincode is required'
            }))
            pass = false;
        }
        if( userDetails.pincode.length > 6 ){
            setError((prevState) => ({
                ...prevState,
                pin: 'Pincode should not be greater than 6'
            }))
            pass = false;
        }
        if(!userDetails.dob){
            setError((prevState) => ({
                ...prevState,
                dob: 'Date of birth is required'
            }))
            pass = false;
        }
        if(pass){
            setIsFetching(!isFetching);
            localStorage.setItem('userDetails', JSON.stringify(userDetails))
            fetchData(`${host}/leads`, userDetails, REQUEST_TYPE.POST).then((response) => {
                if(!response?.message){
                    window.setTimeout(function(){
                        setIsFetching(false);
                        navigate('/home/customers-list');
                    }, 5000); 
                }
                else{
                    setErrorFailed(response.message);
                    setIsFetching(!isFetching);
                }
            }).catch(() => setIsFetching(!isFetching));
        }
    };

    useEffect(()=>{
        var data = CheckToken();
        if(data.length > 0){
            navigate('/home/check-eligibility');
        }
        else{
            navigate('/login');
        }
    },[navigate])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            {isFetching &&
                <Loader showMessage />
            }
                
            {!isFetching && 
            <>
            <h2 className="Head_text_form">Check Loan Eligiblity</h2>
            {ErrorFailed && <div className="error text-center">{ErrorFailed}</div>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Name"
                    name="username"
                    autoComplete="off"
                    autoFocus
                    onChange = {(e) => { if(e.target.value.length > 0 ){
                    setError((prevState) => ({
                        ...prevState,
                        name: ''
                    }))
                    } }}
                />
                {error.name && <span className="error">{error.name}</span>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="pan_number"
                    label="PAN Card"
                    type="text"
                    autoComplete="off"
                    id="pan_number"
                    onChange = {(e) => { if(e.target.value.length > 0 ){
                        setError((prevState) => ({
                          ...prevState,
                          pan: ''
                        }))
                      } }}
                />
                {error.pan && <span className="error">{error.pan}</span>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type='number'
                    id="phonenumber"
                    autoComplete="off"
                    label="Phone number"
                    name="phonenumber"
                    onChange = {(e) => { if(e.target.value.length > 0 ){
                        setError((prevState) => ({
                          ...prevState,
                          phonenumber: ''
                        }))
                      } }}
                />
                {error.phonenumber && <span className="error">{error.phonenumber}</span>}
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        autoComplete = "false"
                        label="Date of Birth"
                        value={value}
                        maxDate = {new Date()}
                        onChange={(newValue) => {
                            setValue(newValue);
                            if(newValue > 0 ){
                                setError((prevState) => ({
                                  ...prevState,
                                  dob: ''
                                }))
                              }
                        }}
                        renderInput={(params) => <TextField style={{marginTop: "10px"}} fullWidth {...params} name="dob" id="dob" />}
                    />
                </LocalizationProvider>
                {error.dob && <span className="error">{error.dob}</span>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="pincode"
                    autoComplete="off"
                    label="Pincode"
                    name="pincode"
                    type='number'
                    onChange = {(e) => { if(e.target.value.length > 0 ){
                        setError((prevState) => ({
                          ...prevState,
                          pin: ''
                        }))
                      } }}
                />
                {error.pin && <span className="error">{error.pin}</span>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: APP_THEME_COLOR }}
                >
                    Check
                </Button>
            </Box></>}
        </Container>
    )
}

export default CreateLeads