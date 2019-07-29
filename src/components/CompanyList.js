import React from 'react';
import DayList from './DayList'
import SearchBar from './SearchBar'

function CompanyList(props) {

    var onFavorite = (company) => {
        props.onFavorite(company);
    }

    var onUnfavorite = (company) => {
        props.onUnfavorite(company);
    }

    var companyInFavorites = (company) => {
        
        for (var i  = 0; i < props.favorites.length; i++) {
            if (company.name === props.favorites[i].name) {
                return true;
            }
        }

        return false;

    }

    //Get the list of all companies at the fair
    const list = props.list;

    //Sort the company list into an array (one array entry for each day of the fair)
    //May be a more efficient way to write this: each time props is changed, the entire list is resorted
    var fairDays = []

    for (var i = 0; i < props.numDays; i++) {
        fairDays.push({
            companies: [],
            dayNum: i + 1
        })
    }

    for (var i = 0; i < list.length; i++) {
        var company = list[i];

        if(companyInFavorites(company)){
            company.favorite = true; 
        } else {
            company.favorite = false;
        }

        var dayNum = parseInt(company.day.charAt(4), 10);
        
        if(dayNum < fairDays.length) {
            
            fairDays[dayNum - 1].companies.push(company);

        } else {

            while(dayNum > fairDays.length) {
                fairDays.push({
                    companies: [],
                    dayNum: fairDays.length + 1
                })
            }

            fairDays[dayNum - 1].companies.push(company);

        }
    }

    //Map each day of the fair into a DayList component
    var listHTML = fairDays.map( (fairDay) => {
        return(
            <DayList list={fairDay.companies} day={fairDay.dayNum} onFavorite={onFavorite} onUnfavorite={onUnfavorite}/>
        )
    })

    return(
        <div className="CompanyListWrapper col-lg-9">
            <SearchBar /> 
            <div className="CompanyList">
                <h1>COMPANIES ATTENDING</h1>
                {listHTML}
            </div>
        </div>
    );

}

export default CompanyList;