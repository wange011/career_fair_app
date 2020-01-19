import React from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/actions';
import heart from '../../res/images/baseline_favorite_black_18dp.png'

function DayList(props) {

    //Get the list of all companies attending on a specific day
    const list = props.list;
    const favorites = props.favorites; 

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
                <div className="CompanyEntry">

                    <div className="companyLogoWrapper">
                        <img src={company.image} className="companyLogo"></img>
                    </div>    
                    <div className="CompanyEntryInfo">
                        <h3>{company.name}</h3>
                        <p>Offering: {company.positions_offered}</p>
                    </div>
                    <div className="heartWrapper">
                        <img src={heart} className={heartClass} onClick={(e) => handleClick(e)}></img>
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

export default connect(null, mapDispatchToProps)(DayList);