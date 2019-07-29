import React, { Component } from 'react';
import CompanyList from './CompanyList';
import TweetBox from './TweetBox';
import data from '../data.json'

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

                <CompanyList list={this.state.filteredCompanies} numDays={this.state.numDays} favorites={this.state.favorites} onFavorite={this.onFavorite} onUnfavorite={this.onUnfavorite}/>
                <TweetBox />

            </div>
        );

    }  

}

export default MainPage;
