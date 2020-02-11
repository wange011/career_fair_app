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
                {items.map(({ label, name, items: subItems, ...rest }) => {
                    return (
                        <React.Fragment key={name}>
                            <ListItem style={{ paddingLeft: 18 }} button {...rest}>
                                <ListItemText class="RootButton">{label}</ListItemText>
                            </ListItem>
                            {Array.isArray(subItems) ? (
                                <List disablePadding dense>
                                    {subItems.map((subItem) => {
                                        return (
                                            <ListItem
                                                key={subItem.name}
                                                style={{ paddingLeft: 36 }}
                                                button
                                                dense
                                            >
                                                <ListItemText>
                                                    <span className='sidebar-subitem-text'>
                                                        {subItem.label}
                                                    </span>
                                                </ListItemText>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            ) : null}
                        </React.Fragment>
                    )
                })}
            </List>

        </div>

    )
}

export default AdminSidebar
