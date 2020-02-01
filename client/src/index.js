import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
    GET_COMPANIES,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    EDIT_COMPANY,
    FILTER_COMPANIES,
    LOGIN,
    TOGGLE_LOGIN,
    LOGOUT
} from './redux/actions'
import * as serviceWorker from './serviceWorker';

var companies = [[], [], []];
var favorites = [[], [], []];

const updateUserFavorites = (state, favorites) => {

    if (state.userID.length < 1) {
        return;
    }

    var favoritesList = []

    for (var i = 0; i < favorites.length; i++) {
        favoritesList = favoritesList.concat(favorites[i]);
    }

    const user = {
        favorites: favoritesList,
        id: state.userID
    }

    const update = {
        user: JSON.stringify(user)
    }

    fetch("http://localhost:5000/favorites", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    })

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
        
        case GET_COMPANIES:
        
            var favorites = state.favorites;

            // Make sure there are enough days allocated
            while (favorites.length < action.companies.length) {
                favorites.push([]);
            }

            return {...state, companies: [...action.companies], filteredCompanies: [...action.companies], favorites: [...favorites] }

        case ADD_FAVORITE:

            // Add the company to the correct day in the list of favorites
            var company = action.company;
            var dayNum = parseInt(company.day.charAt(4), 10);
            // Reminder: ensure state is not mutated
            var favorites = state.favorites;
            
            favorites[dayNum - 1] = favorites[dayNum - 1].concat(company);

            // Update database
            updateUserFavorites(state, favorites);

            // Using spread operator will not mutate
            return {...state, favorites: [...favorites]}
        
        case REMOVE_FAVORITE:
            
            // Add the company to the correct day in the list of favorites
            var company = action.company;
            var dayNum = parseInt(company.day.charAt(4), 10);
             // Reminder: ensure state is not mutated
            var favorites = state.favorites;

            // Remove company from specified day
            favorites[dayNum - 1] = favorites[dayNum - 1].filter(favorite => !(favorite.name === company.name));

            // Update database
            updateUserFavorites(state, favorites);
            
            // Using spread operator will not mutate
            return {...state, favorites: [...favorites]}
        
        case EDIT_COMPANY:

            var company = action.company;
            var dayNum = parseInt(company.day.charAt(4), 10);
            
            var companies = state.companies;
            
            // Edit the company in the state
            for (var i = 0; i < companies[dayNum].length; i++) {
                if (companies[dayNum - 1][i].name === company.name) {
                    
                    companies[dayNum - 1][i] = company;
                    
                }
            }

            // Find if the company is also in filteredCompanies
            var filteredCompanies = state.filteredCompanies;

            for (var i = 0; i < filteredCompanies[dayNum - 1].length; i++) {
                if (filteredCompanies[dayNum - 1][i].name === company.name) {
                    
                    filteredCompanies[dayNum - 1][i] = company;
                    
                }
            }

            return {...state, companies: [...companies], filteredCompanies: [...filteredCompanies]}
        
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

            var favorites = state.favorites;

            for (let i = 0; i < action.favorites.length; i++) {

                let company = action.favorites[i];
                let dayNum = parseInt(company.day.charAt(4), 10);

                favorites[dayNum - 1].push(company);

            }

            return {...state, favorites: [...favorites], username: action.username, 
                userID: action.userID, userType: action.userType, showLogin: false}
        
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
