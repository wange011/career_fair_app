/*
 * action types
 */

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const EDIT_COMPANY = 'EDIT_COMPANY'
export const FILTER_COMPANIES = 'FILTER_COMPANIES'
export const LOGIN = "LOGIN"
export const TOGGLE_LOGIN = "TOGGLE_LOGIN"
export const LOGOUT = "LOGOUT"

/*
 * action creators
 */

export function addFavorite(company) {
    return { type: ADD_FAVORITE, company }
}

export function removeFavorite(company) {
    return { type: REMOVE_FAVORITE, company }
}

export function editCompany(company) {
    return { type: EDIT_COMPANY, company }
}

export function filterCompanies(filter) {
    return { type: FILTER_COMPANIES, filter }
}

export function login(username, password) {
    return { type: LOGIN, username, password }
}

export function toggleLogin() {
    return { type: TOGGLE_LOGIN }
}

export function logout(company) {
    return { type: LOGOUT }
}
