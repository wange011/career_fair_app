import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterCompanies } from '../../redux/actions';
import { Link } from 'react-router-dom';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        var filter = {
            name: this.state.value
        };
        this.props.filterComp(filter);
        console.log(this.props);
    }

    render(){
       

        return (
            <div className="SearchBar">
                <form>
                    <input 
                    type="text" 
                    placeholder="Search.." 
                    value = {this.state.value} 
                    onChange= {this.handleChange}
                    />
                </form>
            </div>
        );

    }  

}

/* function SearchBar(props) {

    var state = {
        value: ''
    }
    var handleChange = (e) => {
        state.value = e.target.value;
        var filter = {
            name: state.value
        };
        props.filterComp(filter);
    }
    
    return(
        <div className="SearchBar">
            <form>
                <input 
                type="text" 
                //placeholder="Search.." 
                value = {state.value} 
                onChange={(e) => handleChange(e)}
                />
            </form>    
            <p>{state.value}</p>
        
        </div>
    );

} */

const mapDispatchToProps = (dispatch) => {
    return {
        filterComp: (filter) => {
            dispatch(filterCompanies(filter))
        }
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);