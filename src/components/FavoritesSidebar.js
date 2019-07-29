import React, { Component } from 'react';
import DayFavorites from './DayFavorites'

class FavoritesSidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            favorites: this.props.favorites,
            numDays: 4
        };
    }

    onUnfavorite = (company) => {
        this.props.onUnfavorite(company);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            favorites: nextProps.favorites
        });
    }    

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render(){
        
        //Get the list of favorited companies at the fair
        const favorites = this.state.favorites;

        //Sort the favorites list into an array (one array entry for each day of the fair)
        //May be a more efficient way to write this: each time props is changed, the entire list is resorted
        //Use shouldComponentUpdate()
        var fairDays = []

        for (var i = 0; i < this.state.numDays; i++) {
            fairDays.push({
                companies: [],
                dayNum: i + 1
            })
        }

        for (var i = 0; i < favorites.length; i++) {
            
            var company = favorites[i];
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
        var favoritesHTML = fairDays.map( (fairDay) => {
            return(
                <DayFavorites list={fairDay.companies} onUnfavorite={this.onUnfavorite} day={fairDay.dayNum} key={fairDay.day}/>
            )
        })

        return (
            <div className="FavoritesSideBar col-lg-2 col-md-2 col-sm-2">
                
                <h1>Favorites</h1>
                {favoritesHTML}

            </div>
        );

    }  

}

export default FavoritesSidebar;
