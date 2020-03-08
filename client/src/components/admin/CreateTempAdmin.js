import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import backArrow from '../../res/images/baseline_arrow_back_black_18dp.png';
import './CreateTempAdmin.css';

function CreateTempAdmin(props) {

    fetch("http://localhost:5000/get_access_code", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: props.username})
    }).then( (response) => {
        
        if (response.ok) {
            return response.json();
        } else {
            throw new Error();
        }

    }).then((userCode) => {
        try {
            document.getElementsByClassName('CreateTempAdmin')[0].getElementsByTagName('input')[0].value = userCode.code;
        } catch (error) {

        }
    })

    const handleGenerateCode = () => {
        const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const username = props.username;
        const userType = props.userType;

        const userCode = {
            username: username,
            userType: userType,
            code: code
        }

        fetch("http://localhost:5000/access_code", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCode)
        }).then( (response) => {
            
            if (response.ok) {
                return response.json();
            } else {
                throw new Error();
            }

        })

        document.getElementsByClassName('CreateTempAdmin')[0].getElementsByTagName('input')[0].value = code;

    }

    return (
        <div className="CreateTempAdmin col-lg-8">
            <h2>TEMP ADMIN ACCESS CODE</h2>
            <input disabled></input>
            <div className="CreateTempAdminButtons">
                <img src={backArrow} className={'backArrow'} onClick={() => props.history.goBack()} />
                <button className='generateCode' onClick={(e) => handleGenerateCode()}>Generate New Code</button>
            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        userType: state.userType,
        username: state.username
    }
}

export default connect(mapStateToProps)(withRouter(CreateTempAdmin))