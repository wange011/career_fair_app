import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './AdminSidebar.css';


const items = [
    { name: 'home', label: 'Home', link: "/" },
    {
        name: 'users',
        label: 'Users',
        items: [
            { name: 'addUser', label: "Access Code", link: "/tempAdmin" },
            { name: 'deleteUser', label: "Delete User", link: "/" },
            { name: 'modifyUser', label: "Modify User", link: "/" },
        ], 
        link: "/"
    },
    {
        name: 'analytics',
        label: 'Analytics',
        items: [
            { name: 'favorites', label: 'Favorites', link: "/favorites" },
            { name: 'viewB', label: 'View B', link: "/" },
            { name: 'viewC', label: 'View C', link: "/" }
        ], 
        link: "/"
    },
    { name: 'settings', label: 'Settings', link: "/" },
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
                                            <Link to={subItem.link}>
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
                                            </Link>
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
