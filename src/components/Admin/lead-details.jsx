import React, { useEffect, useState } from 'react';
import { fetchReadData, REQUEST_TYPE } from '../../services/services';
import { host } from '../../services/API';
import Box from '@mui/material/Box';
import styles from '../../assets/css/lead-edit.module.css'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import CheckToken from '../../utils/check-token';
import CheckAdmin from '../../utils/check-admin'
import { useNavigate } from 'react-router-dom';

const status = {
    pending: '#2f9bf1',
    approved: "#8fd04e",
    rejected: "#f24728"

}

export const LeadDetails = () => {
    const navigate = useNavigate();
    const [Error, setError] = useState('');
    const [leadDetails, SetLeadDetails] = useState([]);
    const [leadDetailsOriginal, SetLeadDetailsOriginal] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchReadData(`${host}/leads`, REQUEST_TYPE.GET)
        .then((response) => {
            if(response?.message){
                setError(response.message)
            }
            else{
                SetLeadDetails(response); 
                SetLeadDetailsOriginal(response);
            }
        })
    }, [])

    useEffect(()=>{
        if(searchText === ''){
            SetLeadDetails(leadDetailsOriginal)
        }
        else{
            SetLeadDetails(leadDetailsOriginal.filter(function (el) {
                return JSON.stringify(el).toLowerCase().includes(searchText.toLowerCase())
            }))
        }
    },[searchText])
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
            <Box component="form" noValidate sx={{ mt: 5 }}>
                <h2 className='No-record pt-3 pb-3'>Lead Details</h2>
                {
                    Error.length > 0
                    ?
                        <div className="error text-center">{Error}</div>
                    :
                        <>
                            <div className={styles.input_table}>
                                <TextField
                                    label="Search"
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                            <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                    }}
                                    onChange={(e) => {setSearchText(e.target.value)}} value={searchText}
                                />
                            </div>
                            <div className={styles.table_leads_main}>
                                <table className={styles.table_leads}>
                                    <tr>
                                        <th>UUID</th>
                                        <th>Name</th>
                                        <th>PAN</th>
                                        <th>DOB</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                    </tr>
                                    {
                                        leadDetails && leadDetails.map((lead, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{lead.uuid}</td>
                                                    <td>{lead.name}</td>
                                                    <td>{lead.pan}</td>
                                                    <td>{(new Date(lead.dob).toISOString().split('T')[0]).split("-").reverse().join("-")}</td>
                                                    <td>{lead.phone}</td>
                                                    <td style={{fontWeight: "bold", color : lead.status === "PENDING" ? status['pending'] : lead.status === "APPROVED" ? status['approved'] : status['rejected']}}>{lead.status}</td>
                                                    <td><a href={`/admin/edit-lead?id=${lead.uuid}`}><EditIcon /></a></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>        
                        </>
                }
            </Box>
        </>
    )
}

export default LeadDetails