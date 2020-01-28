import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { addFavorite, removeFavorite } from '../../redux/actions';
import heart from '../../res/images/baseline_favorite_black_18dp.png';
import backArrow from '../../res/images/baseline_arrow_back_black_18dp.png';
import default_company from '../../res/images/default_company.png';
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

    var addDefaultSrc = (e) => {
        e.target.src = default_company;
        console.log(e.target.src)
    }

    // handleEdit
    // handleDone
    // handleCancel

    return(
        <div className="CompanyView col-lg-8">
            
            <div className="CompanyViewInfo">
                <h3>{company.name}</h3>
                <h4>Day Attending</h4>
                <p>{company.day}</p>
                <h4>Degree Levels</h4>
                <p>{company.degree_levels}</p>
                <h4>Positions Offered</h4>
                <p>{company.positions_offered}</p>
                <h4>Sponsorships Offered</h4>
                <p>{company.sponsorships}</p>
                <h4>Company Overview</h4>
                <p>Overview: {company.overview}</p>
            </div>
            <div className="CompanyViewMedia">
                <div className="CompanyImageWrapper">
                    <img onError={(e) => addDefaultSrc(e)} src={company.image} className="CompanyImage" />
                </div>
                <div className="CompanyViewButtons">
                    <img src={backArrow} className={'backArrow'} onClick={() => props.history.goBack()} />
                    <img src={heart} className={heartClass} onClick={(e) => handleClick(e)} />
                </div>
            </div>  

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