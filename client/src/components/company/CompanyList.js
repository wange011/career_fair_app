import React from 'react';
import DayList from './DayList';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import './CompanyList.css';

function CompanyList(props) {

    var fairDays = props.companies;

    //Map each day of the fair into a DayList component
    var listHTML = fairDays.map( (fairDay, index) => {
        return(
            <DayList day={index + 1}/>
        )
    })

    return(
        <div className="CompanyListWrapper col-lg-8">
            <SearchBar /> 
            <div className="CompanyList">
                <h1>COMPANIES ATTENDING</h1>
                {listHTML}
            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        companies: state.filteredCompanies
    }
}

export default connect(mapStateToProps)(CompanyList);