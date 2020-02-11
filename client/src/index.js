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
    SEARCH_COMPANIES,
    FILTER_COMPANIES,
    HIDE,
    LOGIN,
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
    filter: {
        sponsor: [],
        position: [],
        degree: []
    },
    shouldHide: false
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

        case SEARCH_COMPANIES:
            //assign search object to variable
            var searched = action.search;

            //filter out companies that don't contain the search term in the title
            var filteredCompanies = [];
            for (var i = 0; i < state.companies.length; i++) {
                filteredCompanies.push(state.companies[i].filter(company => company.name.toLowerCase().includes(searched.name.toLowerCase()) 
                || company.positions_offered.toLowerCase().includes(searched.name.toLowerCase()) 
                || company.overview.toLowerCase().includes(searched.name.toLowerCase())
                || company.degree_levels.toLowerCase().includes(searched.name.toLowerCase())
                || company.sponsorships.toLowerCase().includes(searched.name.toLowerCase())));
            }
            

            //Using spread operator will not mutate
            return {...state, filteredCompanies: [...filteredCompanies], search: searched.name} 
        
        case FILTER_COMPANIES:
            //assign filter object to variable
            var ofilter = state.filter;
            var filter = action.filter;
            if (action.check) {
                filter.position = ofilter.position.concat(filter.position);
                filter.sponsor = ofilter.sponsor.concat(filter.sponsor);
                filter.degree = ofilter.degree.concat(filter.degree);
            } else {
                filter.position = ofilter.position.filter(pos => pos != filter.position[0]);
                filter.sponsor = ofilter.sponsor.filter(pos => pos != filter.sponsor[0]);
                filter.degree = ofilter.degree.filter(pos => pos != filter.degree[0]);
            }

            //filter out companies that don't match the filter
            var filteredCompanies = [];
            for (var i = 0; i < state.companies.length; i++) {
                filteredCompanies.push(state.companies[i].filter(company => (filter.position.find(pos => company.positions_offered.split(', ').includes(pos))
                || filter.position.length === 0) 
                && (filter.degree.find(deg => company.degree_levels.split(', ').includes(deg)) || filter.degree.length === 0)
                && (filter.sponsor.find(spons => company.sponsorships.split(', ').includes(spons)) || filter.sponsor.length === 0)));
            }
            

            //Using spread operator will not mutate
            return {...state, filteredCompanies: [...filteredCompanies], filter: filter}
            
        case HIDE:
            var shouldHide = action.shouldHide;
            return {...state, shouldHide: action.shouldHide}
        
        // TO-DO: Get and sort user favorites after login
        // Also go through the company list and set company.favorite to true
        case LOGIN:
            return state
        
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
