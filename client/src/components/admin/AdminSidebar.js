import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './AdminSidebar.css';


const items = [
    { name: 'home', label: 'Home' },
    { name: 'analytics', label: 'Analytics' },
    { name: 'settings', label: 'Settings' },
]


function AdminSidebar() {
    return (
        <div className="AdminSideBar col-lg-2 col-md-2 col-sm-2">

            <List disablePadding dense>
                {items.map(({ label, name, ...rest }) => (
                    <ListItem key={name} button {...rest}>
                        <ListItemText>{label}</ListItemText>
                    </ListItem>
                ))}
            </List>

        </div>

    )
}

export default AdminSidebar
