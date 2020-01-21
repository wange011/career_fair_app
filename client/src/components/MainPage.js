import React, { Component } from 'react';
import CompanyList from './company/CompanyList';
import CompanyView from './company/CompanyView';
import FavoritesSidebar from './favorite/FavoritesSidebar';
import TweetBox from './tweets/TweetBox';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import './MainPage.css';

class MainPage extends Component {

    render(){
    
        return (
            
            <div className="MainPage col-lg-10 col-md-10 col-sm-10">
                
                <FavoritesSidebar/> 
                
                    <Switch>
                        <Route exact path="/">
                            <CompanyList/>   
                        </Route>
                        <Route path="/view/:id">
                            <CompanyView/>
                        </Route>
                    </Switch>        

                <TweetBox/>

            </div>
        );

    }  

}

export default MainPage;
