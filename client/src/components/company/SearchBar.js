import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterCompanies } from '../../redux/actions';
import { Link } from 'react-router-dom';  

function SearchBar(props) {

    var handleChange = (e) => {
        var value = e.target.value;
        var filter = {
            name: value
        };
        props.filterComp(filter);
    }
    
    return(
        <div className="SearchBar">
            <form>
                <input 
                type="text" 
                placeholder = "Search..."
                value= {props.search} 
                onChange={(e) => handleChange(e)}
                />
            </form>    
        
        </div>
    );

} 
const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterComp: (filter) => {
            dispatch(filterCompanies(filter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);