import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import data from './data.json'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    EDIT_COMPANY,
    FILTER_COMPANIES,
    LOGIN,
    TOGGLE_LOGIN,
    LOGOUT
} from './redux/actions'
import * as serviceWorker from './serviceWorker';

// Maybe include this logic in the back-end instead
var companies = [];
var favorites = [];

for (let i = 0; i < data.companies.length; i++) {

    let company = data.companies[i];
    company.id = i;
    let dayNum = parseInt(company.day.charAt(4), 10);

    // Ensure that there are enough days added
    while(dayNum > companies.length) {
        companies.push([]);
        favorites.push([]);
    }

    companies[dayNum - 1].push(company);

}

// Remember to always use filteredCompanies to display 
const initialState = {
    companies: companies,
    filteredCompanies: companies,
    favorites: favorites,
    numDays: companies.length,
    search: "",
    username: "",
    userID: "",
    userType: "student",
    showLogin: false,
    incorrectLogin: false
}

// TO-DO: Seperate Reducers
function reducer(state = initialState, action) {
    
    switch (action.type) {
        
        case ADD_FAVORITE:

            // Add the company to the correct day in the list of favorites
            var company = action.company;
            var dayNum = parseInt(company.day.charAt(4), 10);
            // Reminder: ensure state is not mutated
            var favorites = state.favorites;

            favorites[dayNum - 1] = favorites[dayNum - 1].concat(company);

            // Using spread operator will not mutate
            return {...state, favorites: [...favorites]}
        
        case REMOVE_FAVORITE:
            
            // Add the company to the correct day in the list of favorites
            company = action.company;
            dayNum = parseInt(company.day.charAt(4), 10);
             // Reminder: ensure state is not mutated
            favorites = state.favorites;

            // Remove company from specified day
            favorites[dayNum - 1] = favorites[dayNum - 1].filter(favorite => !(favorite.name === company.name));

            // Using spread operator will not mutate
            return {...state, favorites: [...favorites]}
        
        case EDIT_COMPANY:
            return state
        
        case FILTER_COMPANIES:
            //assign filter object to variable
            var filter = action.filter;

            //filter out companies that don't contain the search term in the title- To be changed; this is just for testing.
            var filteredCompanies = [];
            for (var i = 0; i < state.companies.length; i++) {
                filteredCompanies.push(state.companies[i].filter(company => company.name.toLowerCase().includes(filter.name.toLowerCase()) 
                || company.positions_offered.toLowerCase().includes(filter.name.toLowerCase()) 
                || company.overview.toLowerCase().includes(filter.name.toLowerCase())
                || company.degree_levels.toLowerCase().includes(filter.name.toLowerCase())
                || company.sponsorships.toLowerCase().includes(filter.name.toLowerCase())));
            }
            

            //Using spread operator will not mutate
            return {...state, filteredCompanies: [...filteredCompanies], search: filter.name} 
        
        // TO-DO: Get and sort user favorites after login
        case LOGIN:

            if (action.userID === undefined) {
                return {...state, incorrectLogin: true}
            }

            var favorites = state.favorites;

            for (let i = 0; i < action.favorites.length; i++) {

                let company = action.favorites[i];
                let dayNum = parseInt(company.day.charAt(4), 10);

                favorites[dayNum - 1].push(company);

            }

            return {...state, favorites: [...favorites], username: action.username, 
                userID: action.id, userType: action.userType, showLogin: false, incorrectLogin: false}
        
        case TOGGLE_LOGIN:
            return {...state, showLogin: !state.showLogin}

        case LOGOUT:
            return state
        
        default:
            return state
    }

}

const store = createStore(reducer);

ReactDOM.render(<Provider store = {store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
