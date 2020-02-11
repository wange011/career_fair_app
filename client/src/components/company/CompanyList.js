import React from 'react';
import DayList from './DayList';
import SearchBar from './SearchBar';
import FilterOption from'./FilterOption';
import { connect } from 'react-redux';
import './CompanyList.css';

function CompanyList(props) {

    var fairDays = props.companies;
    console.log(props)
    var favorites = props.favorites;

    //Map each day of the fair into a DayList component
    var listHTML = fairDays.map( (fairDay, index) => {
        return(
            <DayList list={fairDay} favorites={favorites[index]} day={index + 1}/>
        )
    })

    return(
        <div className="CompanyListWrapper col-lg-8">
            <SearchBar /> 
            <FilterOption />
            <div className="CompanyList">
                <h1>COMPANIES ATTENDING</h1>
                {listHTML}
            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        companies: state.filteredCompanies,
        favorites: state.favorites
    }
}

export default connect(mapStateToProps)(CompanyList);