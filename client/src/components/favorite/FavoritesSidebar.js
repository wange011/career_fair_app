import React from 'react';
import DayFavorites from './DayFavorites';
import './FavoritesSidebar.css';
import { connect } from 'react-redux';

function FavoritesSidebar(props) {

        
    //Map favorites from each day of the fair into a DayList component
    var favoritesHTML = props.favorites.map( (fairDay, index) => {
        return(
            <DayFavorites list={fairDay} day={index + 1}/>
        )
    })

    return (
        <div className="FavoritesSideBar col-lg-2 col-md-2 col-sm-2">
            
            <h1>Favorites</h1>
            {favoritesHTML}

        </div>
    );

}  



const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    }
}

export default connect(mapStateToProps)(FavoritesSidebar);
