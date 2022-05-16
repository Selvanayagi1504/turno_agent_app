import React from "react";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import '../../App.css'
import styles from '../../assets/css/loader.module.css'


export const Loader = (props) => {

    return (
        <div className={styles.loader}>
            <div classNamw={styles.circle_loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div style={{ margin: '0px 20%' }}>
                {props.showMessage && <Typography >
                    It Usually takes up to 10 mins  Go to
                    <Link href='/home/customers-list'>
                        {"   Leads Page"}
                    </Link>
                </Typography>}
            </div>
        </div>
    );
}
export default Loader

Loader.propTypes = {
    showMessage: PropTypes.string
}