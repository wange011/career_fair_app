import React from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite, setNumFavorites } from '../../redux/actions';
import { Link } from 'react-router-dom';
import heart from '../../res/images/baseline_favorite_black_18dp.png';
import default_company from '../../res/images/default_company.png';

function DayList(props) {

    //Get the list of all companies attending on a specific day
    const list = props.companies[props.day - 1];
    const favorites = props.favorites[props.day - 1]; 

    const updateUserFavorites = (company, updateType) => {

        fetch("http://localhost:5000/favorites_stat", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then( (response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("");
            }
        }).then( (numFavorites) => {
            switch(updateType) {
                case 'ADD':
                    numFavorites[company.name] += 1;
                    if (props.userID.length >= 1) {
                        props.setNumFavorites(numFavorites);
                    }
                    props.favorite(company);
                    break;
                case 'REMOVE':  
                    numFavorites[company.name] -= 1;
                    if (props.userID.length >= 1) {
                        props.setNumFavorites(numFavorites);
                    }
                    props.unfavorite(company);
                    break;
            }
        })

    }

    //Map each company into a CompanyEntry
    if (list) {
        var listHTML = list.map( (company) => {

            var inFavorites = false;

            // Check if the company is in favorites
            for (var i = 0; i < favorites.length; i++) {
                if (company.name === favorites[i].name) {
                    inFavorites = true;
                }
            }

            if(!inFavorites) {
                var handleClick = (e) => {
                    updateUserFavorites(company, 'ADD');
                    e.target.classList.add("active");
                }
                
                var heartClass = "heart";

            } else {
                var handleClick = (e) => {
                    updateUserFavorites(company, 'REMOVE');
                    e.target.classList.remove("active");
                }
                
                var heartClass = "heart active";
                
            }

            var addDefaultSrc = (e) => {
                e.target.src = default_company;
            }
            
            return(

                <div className="CompanyEntry">
                    <Link to={"/view/" + company._id}>
                        <div className="CompanyLogoWrapper">
                            <img onError={(e) => addDefaultSrc(e)} src="" className="CompanyLogo"></img>
                        </div>    
                        <div className="CompanyEntryInfo">
                            <h3>{company.name}</h3>
                            <p>Offering: {company.positions_offered}</p>
                        </div>
                    </Link>
                    <div className="heartWrapper">
                        <div className="tooltipwrapper">
                            <img src={heart} className={heartClass} onClick={(e) => handleClick(e)}></img>
                            <p className="tooltiptext">{props.numFavorites[company.name]}</p>
                        </div>
                    </div>

                </div>

            )
        })
    } else {
        var listHTML = null;
    }    

    return(
        <div className="DayListWrapper">
            <h2>Day {props.day}</h2>
            <div className="DayList">
                {listHTML}
            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        companies: state.filteredCompanies,
        favorites: state.favorites,
        numFavorites: state.numFavorites,
        userID: state.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        favorite: (company) => {
            dispatch(addFavorite(company))
        },
        unfavorite: (company) => {
            dispatch(removeFavorite(company))
        },
        setNumFavorites: (numFavorites) => {
            dispatch(setNumFavorites(numFavorites))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayList);