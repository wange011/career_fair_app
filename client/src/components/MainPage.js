import React, { Component } from 'react';
import CompanyList from './company/CompanyList';
import CompanyView from './company/CompanyView';
import FavoritesSidebar from './favorite/FavoritesSidebar';
import AdminSidebar from './admin/AdminSidebar';
import NumFavorites from './admin/NumFavorites'
import CreateTempAdmin from './admin/CreateTempAdmin';
import TweetBox from './tweets/TweetBox';
import { connect } from 'react-redux';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { withRouter } from "react-router";
import './MainPage.css';

class MainPage extends Component {

    render() {

        return (

            <div className="MainPage col-lg-10 col-md-10 col-sm-10">

                <Switch>

                    {this.props.userType === 'admin' ?
                    <AdminSidebar/> : <FavoritesSidebar/> 
                    }

                    <Route exact path="/">
                        <CompanyList />
                    </Route>
                    <Route path="/view/:id">
                        <CompanyView />
                    </Route>
                    <Route path="/tempAdmin">
                        {this.props.userType === 'admin' ?
                        <CreateTempAdmin /> : null
                        }
                    </Route>
                    <Route path="/favorites">
                        <NumFavorites numFavorites={this.props.numFavorites}/>
                    </Route>
                    
                </Switch>

                <TweetBox />

            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        userType: state.userType,
        numFavorites: state.numFavorites
    }
}

export default withRouter(connect(mapStateToProps)(MainPage))