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
    SET_NUM_FAVORITES,
    EDIT_COMPANY,
    SEARCH_COMPANIES,
    FILTER_COMPANIES,
    HIDE,
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
    numFavorites: {},
    numDays: companies.length,
    search: "",
    filter: {
        sponsor: [],
        position: [],
        degree: []
    },
    shouldHide: false,
    checked: {
        "db": false, "ppft": false, "susc": false,
        "dm": false, "pi": false, "sprus": false,
        "dphd": false, "pcop": false, "sead": false,
        "dpd": false, "pm": false, "ssf1v": false,
        "dd": false, "pphd": false, "seh1v": false,
        "ds": false, "pmbaico": false, "sj1v": false,
        "dnd": false, "pgip": false, "sa": false,
        "purp": false, "ppptpo": false, "pnpptso": false
    },
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
        
        case SET_NUM_FAVORITES:
            return {...state, numFavorites: action.numFavorites}

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

        case SEARCH_COMPANIES:
            //assign search object to variable
            var searched = action.search;
            var filter = state.filter;

            //filter out companies that don't contain the search term in the title
            var filtCompanies = [];
            for (var j = 0; j < state.companies.length; j++) {
                // loops through companies and checks if any section contains the search term
                filtCompanies.push(state.companies[j].filter(company => (company.name.toLowerCase().includes(searched.name.toLowerCase()) 
                || company.positions_offered.toLowerCase().includes(searched.name.toLowerCase()) 
                || company.overview.toLowerCase().includes(searched.name.toLowerCase())
                || company.degree_levels.toLowerCase().includes(searched.name.toLowerCase())
                || company.sponsorships.toLowerCase().includes(searched.name.toLowerCase()))
                &&
                // checks pre-existing filter 
                ((filter.position.find(pos => company.positions_offered.split(', ').includes(pos))
                || filter.position.length === 0) 
                && (filter.degree.find(deg => company.degree_levels.split(', ').includes(deg)) || filter.degree.length === 0)
                && (filter.sponsor.find(spons => company.sponsorships.split(', ').includes(spons)) || filter.sponsor.length === 0))));
            }
            

            //Using spread operator will not mutate
            return {...state, filteredCompanies: [...filtCompanies], search: searched.name} 
        
        case FILTER_COMPANIES:
            //assign filter object to variable
            var ofilter = state.filter;
            var nfilter = action.filter;
            var searcher = state.search;
            var id = action.id;
            var checked = state.checked;
            // check if the box input was being checked or unchecked
            if (action.check === true) {
                // adds new filter with previous filter
                nfilter.position = ofilter.position.concat(nfilter.position);
                nfilter.sponsor = ofilter.sponsor.concat(nfilter.sponsor);
                nfilter.degree = ofilter.degree.concat(nfilter.degree);
                checked[id] = true;
            } else if (action.check === false) {
                // remove the uncheck option from filter
                nfilter.position = ofilter.position.filter(pos => pos !== nfilter.position[0]);
                nfilter.sponsor = ofilter.sponsor.filter(pos => pos !== nfilter.sponsor[0]);
                nfilter.degree = ofilter.degree.filter(pos => pos !== nfilter.degree[0]);
                checked[id] = false;
            }

            //filter out companies that don't match the filter
            var filCompanies = [];
            // if there isn't a pre-existing search term
            if (searcher === "") {
                for (i = 0; i < state.companies.length; i++) {
                    filCompanies.push(state.companies[i].filter(company => (nfilter.position.find(pos => company.positions_offered.split(', ').includes(pos))
                    || nfilter.position.length === 0) 
                    && (nfilter.degree.find(deg => company.degree_levels.split(', ').includes(deg)) || nfilter.degree.length === 0)
                    && (nfilter.sponsor.find(spons => company.sponsorships.split(', ').includes(spons)) || nfilter.sponsor.length === 0)));
                }
            } else { // if there is a pre-existing search term (will do this more efficiently soon.)
                for (i = 0; i < state.companies.length; i++) {
                    filCompanies.push(state.companies[i].filter(company => (nfilter.position.find(pos => company.positions_offered.split(', ').includes(pos))
                    || nfilter.position.length === 0) 
                    && (nfilter.degree.find(deg => company.degree_levels.split(', ').includes(deg)) || nfilter.degree.length === 0)
                    && (nfilter.sponsor.find(spons => company.sponsorships.split(', ').includes(spons)) || nfilter.sponsor.length === 0)
                    && (company.name.toLowerCase().includes(searcher.toLowerCase()) 
                    || company.positions_offered.toLowerCase().includes(searcher.toLowerCase()) 
                    || company.overview.toLowerCase().includes(searcher.toLowerCase())
                    || company.degree_levels.toLowerCase().includes(searcher.toLowerCase())
                    || company.sponsorships.toLowerCase().includes(searcher.toLowerCase()))));
                }
            }
            

            //Using spread operator will not mutate
            return {...state, filteredCompanies: [...filCompanies], filter: nfilter, checked: checked}
            
        case HIDE:
            // updates shouldHide for the filter table
            return {...state, shouldHide: action.shouldHide}
        
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
