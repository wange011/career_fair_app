/*
 * action types
 */

export const GET_COMPANIES = 'GET_COMPANIES'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const SET_NUM_FAVORITES = 'GET_NUM_FAVORITES'
export const EDIT_COMPANY = 'EDIT_COMPANY'
export const SEARCH_COMPANIES = 'SEARCH_COMPANIES'
export const FILTER_COMPANIES = 'FILTER_COMPANIES'
export const HIDE = 'HIDE'
export const LOGIN = 'LOGIN'
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN'
export const LOGOUT = 'LOGOUT'

/*
 * action creators
 */
export function getCompanies(companies) {
    return { type: GET_COMPANIES, companies }
}

export function addFavorite(company) {
    return { type: ADD_FAVORITE, company }
}

export function removeFavorite(company) {
    return { type: REMOVE_FAVORITE, company }
}

export function setNumFavorites(numFavorites)  {
    return { type: SET_NUM_FAVORITES, numFavorites }
}

export function editCompany(company) {
    return { type: EDIT_COMPANY, company }
}

export function searchCompanies(search) {
    return { type: SEARCH_COMPANIES, search }
}

export function filterCompanies(filter, check, id) {
    return { type: FILTER_COMPANIES, filter, check, id }
}

export function hide(shouldHide) {
    return { type: HIDE, shouldHide }
}

export function login(favorites, username, userID, userType) {
    return { type: LOGIN, favorites, username, userID, userType }
}

export function toggleLogin() {
    return { type: TOGGLE_LOGIN }
}

export function logout() {
    return { type: LOGOUT }
}
