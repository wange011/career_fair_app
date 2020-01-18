import React from 'react';
import delIcon from '../../res/images/baseline_clear_black_18dp.png'

function DayFavorites(props) {

    //Get the list of favorited companies attending on a specific day
    const favorites = props.list;

    var handleClick = (company) => {
        props.onUnfavorite(company);
    }

    if (favorites) {
        //Map each company into a FavoriteEntry
        var favoritesHTML = favorites.map( (company) => {
            return(
                <div className="FavoriteEntry">
                    <div className="FavoriteEntryName">
                        <p>{company.name}</p>
                    </div>
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

export default DayFavorites;