import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { addFavorite, removeFavorite } from '../../redux/actions';
import heart from '../../res/images/baseline_favorite_black_18dp.png';
import './CompanyView.css';

// Link to an id when clicked
// Needs to be connected to store (edit)
// useParams(), wrap export in withRouter()
// Use the :id parameter to find the company that is being viewed

function CompanyView(props) {

    const id = parseInt(props.match.params.id);

    var company = null;
    var companies = props.companies;

    // Find the company being viewed
    // break both loops if company is found
    loop:
    for (var i = 0; i < companies.length; i++) {
        for (var j = 0; j < companies[i].length; j++) {

            if (companies[i][j].id === id) {
                company = companies[i][j];
                console.log(company)
                break loop;
            }    

        }
    }

    const day = parseInt(company.day.charAt(4), 10);
    console.log(props.favorites)
    var inFavorites = false;
    var favorites = props.favorites[day - 1];
    
    // Check if the company is in favorites
    for (var i = 0; i < favorites.length; i++) {
        if (company.name === favorites[i].name) {
            inFavorites = true;
        }
    }


    if(!inFavorites) {
        var handleClick = (e) => {
            props.favorite(company);
            e.target.classList.add("active");
        }
        
        var heartClass = "heart";

    } else {
        var handleClick = (e) => {
            props.unfavorite(company);
            e.target.classList.remove("active");
        }
        
        var heartClass = "heart active";
        
    }

    return(
        <div className="CompanyView col-lg-9">

            <div className="CompanyImageWrapper">
                <img src={company.image} className="CompanyImageWrapper"></img>
            </div>    
            <div className="CompanyViewInfo">
                <h3>{company.name}</h3>
                <p>Offering: {company.positions_offered}</p>
                <p>Day: {company.day}</p>
                <p>Overview: {company.overview}</p>
                <p>Degree Levels: {company.degree_levels}</p>
                <p>Sponsorships: {company.sponsorships}</p>
            </div>
            <div className="CompanyFavorite">
                <img src={heart} className={heartClass} onClick={(e) => handleClick(e)}></img>
            </div>
            
            <button onClick={(e) => props.history.goBack()}>
            </button>    

        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        companies: state.companies,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        favorite: (company) => {
            dispatch(addFavorite(company))
        },
        unfavorite: (company) => {
            dispatch(removeFavorite(company))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyView));