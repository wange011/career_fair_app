/*
 * action types
 */

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const EDIT_COMPANY = 'EDIT_COMPANY'
export const SEARCH_COMPANIES = 'SEARCH_COMPANIES'
export const FILTER_COMPANIES = 'FILTER_COMPANIES'
export const HIDE = 'HIDE'
export const LOGIN = "LOGIN"
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

export function searchCompanies(search) {
    return { type: SEARCH_COMPANIES, search }
}

export function filterCompanies(filter, check) {
    return { type: FILTER_COMPANIES, filter, check }
}

export function hide(shouldHide) {
    return { type: HIDE, shouldHide }
}

export function login(username, password) {
    return { type: LOGIN, username, password }
}

export function logout(company) {
    return { type: LOGOUT }
}
