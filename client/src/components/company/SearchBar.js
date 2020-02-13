import React from 'react';
import { connect } from 'react-redux';
import { searchCompanies } from '../../redux/actions';

function SearchBar(props) {

    // updates the search value and companies present
    var handleChange = (e) => {
        var value = e.target.value;
        var searched = {
            name: value
        };
        props.searchComp(searched);
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
        searchComp: (searched) => {
            dispatch(searchCompanies(searched))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);