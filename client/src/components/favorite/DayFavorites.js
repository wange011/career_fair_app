import React from 'react';
import { connect } from 'react-redux';
import { removeFavorite } from '../../redux/actions';
import { Link } from 'react-router-dom';
import delIcon from '../../res/images/baseline_clear_black_18dp.png';

function DayFavorites(props) {

    //Get the list of favorited companies attending on a specific day
    const favorites = props.list;

    var handleClick = (company) => {
        props.unfavorite(company);
    }

    if (favorites) {

        //Map each company into a FavoriteEntry
        var favoritesHTML = favorites.map( (company) => {
            return(
                <div className="FavoriteEntry">
                    <Link to={"/view/" + company.id}>
                        <div className="FavoriteEntryName">
                            <p>{company.name}</p>
                        </div>
                    </Link>
                    <div className="FavoriteEntryRemove">
                        <img src={delIcon} onClick={(e) => handleClick(company)}></img>
                    </div>       
                </div>
            )
        });
    } else {
        var favoritesHTML = null;
    }

    return(
        <div className="DayFavorites">
            <h2>Day {props.day}</h2>
            {favoritesHTML}
        </div>
    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        unfavorite: (company) => {
            dispatch(removeFavorite(company))
        }
    }
}

export default connect(null, mapDispatchToProps)(DayFavorites);