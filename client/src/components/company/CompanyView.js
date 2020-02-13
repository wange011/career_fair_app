import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { addFavorite, removeFavorite, editCompany, filterCompanies } from '../../redux/actions';
import heart from '../../res/images/baseline_favorite_black_18dp.png';
import backArrow from '../../res/images/baseline_arrow_back_black_18dp.png';
import default_company from '../../res/images/default_company.png';
import './CompanyView.css';

function CompanyView(props) {

    const id = props.match.params.id;
    var company = null;
    var companies = props.companies;

    // Find the company being viewed
    // break both loops if company is found
    loop:
    for (var i = 0; i < companies.length; i++) {
        for (var j = 0; j < companies[i].length; j++) {

            if (companies[i][j]._id === id) {
                company = companies[i][j];
                break loop;
            }    

        }
    }

    var day = undefined;

    try {
        day = parseInt(company.day.charAt(4), 10);
    } catch (error) {
        
        setTimeout( () => { 
            CompanyView(props);
        }, 3000);
        
        return(
            <div></div>
        );
    }
    
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

    const addDefaultSrc = (e) => {
        e.target.src = default_company;
    }

    // handleEdit
    const handleEdit = () => {
        const p = document.getElementsByClassName('CompanyView')[0].getElementsByTagName('p');

        for (var i = 0; i < p.length; i++) {
            p[i].style.visibility = 'hidden';
            p[i].style.position = 'absolute';
        }

        document.getElementsByClassName('CompanyView')[0].getElementsByTagName('h3')[0].style.visibility = 'hidden';
        const input = document.getElementsByClassName('CompanyView')[0].getElementsByTagName('textarea');

        for (var i = 0; i < input.length; i++) {
            input[i].style.width = input[i].value.length + "ch";
            input[i].style.visibility = 'visible';
            input[i].style.position = 'relative';
        }

        document.getElementById('editButton').style.visibility = 'hidden';
        document.getElementById('doneButton').style.visibility = 'visible';
    }

    // handleDone
    const handleDone = () => {

        const inputs = document.getElementsByClassName('CompanyView')[0].getElementsByTagName('textarea');

        const company = {
            "name": inputs[0].value,
            "day": inputs[1].value,
            "degree_levels": inputs[2].value,
            "positions_offered": inputs[3].value,
            "sponsorships": inputs[4].value,
            "overview": inputs[5].value,
        }

        const update = {
            company: JSON.stringify(company)
        }

        fetch("http://localhost:5000/edit_company", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        }).then( (response) => {
            
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Company Does Not Exist");
            }

        }).then( (company) => {

            props.editCompany(company);

        }).catch( (error) => {

        });

        document.getElementById('editButton').style.visibility = 'visible';
        document.getElementById('doneButton').style.visibility = 'hidden';

        const p = document.getElementsByClassName('CompanyView')[0].getElementsByTagName('p');

        for (var i = 0; i < p.length; i++) {
            p[i].style.visibility = 'visible';
            p[i].style.position = 'relative';
        }

        document.getElementsByClassName('CompanyView')[0].getElementsByTagName('h3')[0].style.visibility = 'visible';
        const input = document.getElementsByClassName('CompanyView')[0].getElementsByTagName('textarea');

        for (var i = 0; i < input.length; i++) {
            input[i].style.visibility = 'hidden';
            input[i].style.position = 'absolute';
        }
    }    

    return(
        <div className="CompanyView col-lg-8">
            
            <div className="CompanyViewInfo">
                <h3>{company.name}</h3>
                <textarea id="companyName" defaultValue={company.name}/>
                <h4>Day Attending</h4>
                <p>{company.day}</p>
                <textarea id="companyDay" rows='1' defaultValue={company.day}/>
                <h4>Degree Levels</h4>
                <p>{company.degree_levels}</p>
                <textarea id="companyDegree" rows='1' defaultValue={company.degree_levels}/>
                <h4>Positions Offered</h4>
                <p>{company.positions_offered}</p>
                <textarea id="companyPositions" defaultValue={company.positions_offered}/>
                <h4>Sponsorships Offered</h4>
                <p>{company.sponsorships}</p>
                <textarea id="companySponsorships" rows='1' defaultValue={company.sponsorships}/>
                <h4>Company Overview</h4>
                <p>Overview: {company.overview}</p>
                <textarea id="companyOverview" rows='5' defaultValue={company.overview}/>

                {(props.userType === "admin" || props.userType === "tempAdmin") ? 
                <div> 
                    <button id="editButton" onClick={() => handleEdit()}>EDIT</button> 
                    <button id="doneButton" onClick={() => handleDone()}>DONE</button> 
                </div> : null}

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
        companies: state.filteredCompanies,
        favorites: state.favorites,
        filter: state.filter,
        userType: state.userType
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
        filterComp: (filtered, check) => {
            dispatch(filterCompanies(filtered, check))
        },
        editCompany: (company) => {
            dispatch(editCompany(company))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyView));