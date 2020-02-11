import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './AdminSidebar.css';


const items = [
    { name: 'home', label: 'Home' },
    {
        name: 'users',
        label: 'Users',
        items: [
            { name: 'addUser', label: "Add User" },
            { name: 'deleteUser', label: "Delete User" },
            { name: 'modifyUser', label: "Modify User" },
        ]
    },
    {
        name: 'analytics',
        label: 'Analytics',
        items: [
            { name: 'viewA', label: 'View A' },
            { name: 'viewB', label: 'View B' },
            { name: 'viewC', label: 'View C' }
        ]
    },
    { name: 'settings', label: 'Settings' },
]


function AdminSidebar() {
    return (
        <div className="AdminSideBar col-lg-2 col-md-2 col-sm-2">

            <List disablePadding dense>
                {items.map(({ label, name, items: subItems, ...rest }) => (
                    <ListItem key={name} button {...rest}>
                        <ListItemText>{label}</ListItemText>
                        {Array.isArray(subItems) ? (
                            <List disablePadding>
                                {subItems.map((subItem) => (
                                    <ListItem key = {subItem.name} button>
                                        <ListItemText className="sidebar-item-text">
                                            {subItem.label}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        ) : null}

                    </ListItem>
                ))}
            </List>

        </div>

    )
}

export default AdminSidebar
