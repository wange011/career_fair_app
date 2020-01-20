import React, { Component } from 'react';
import CompanyList from './company/CompanyList';
import CompanyView from './company/CompanyView';
import TweetBox from './tweets/TweetBox';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import data from '../data.json';
import './MainPage.css';

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: [],
            companies: [],
            filteredCompanies: [],
            favorites: this.props.favorites,
            numDays: 3
        };
    }

    componentDidMount() {
        this.setState({
            companies: data.companies,
            filteredCompanies: data.companies
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            favorites: nextProps.favorites
        });
    }    

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    //To-do handle filter

    onFavorite = (company) => {
        this.props.onFavorite(company);
    }

    onUnfavorite = (company) => {
        this.props.onUnfavorite(company);
    }

    render(){
    
        return (
            
            <div className="MainPage col-lg-10 col-md-10 col-sm-10">
                        
                <Route exact path="/">
                    <CompanyList/>   
                </Route>
                <Route path="/view/:id">
                    <CompanyView/>
                </Route>    

                <TweetBox />  

            </div>
        );

    }  

}

export default MainPage;
