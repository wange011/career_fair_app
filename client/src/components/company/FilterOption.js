import React from 'react';
import { connect } from 'react-redux';
import { filterCompanies, hide } from '../../redux/actions';
import downIcon from '../../res/images/baseline_arrow_down_black_18dp.png';
import rightIcon from '../../res/images/baseline_arrow_forward_black_18dp.png';

function FilterOption(props) {

    // filters degree
    var handleDegree = (e, deg, id) => {
        var filtered = {
            degree: [deg],
            position: [],
            sponsor: []
        };
        props.filterComp(filtered, e.target.checked, id);
    }

    // filters position
    var handlePosition = (e, pos, id) => {
        var filtered = {
            degree: [],
            position: [pos],
            sponsor: []
        };
        props.filterComp(filtered, e.target.checked, id);
    }

    // filters sponsors
    var handleSponsor = (e, spons, id) => {
        var filtered = {
            degree: [],
            position: [],
            sponsor: [spons]
        };
        props.filterComp(filtered, e.target.checked, id);
    }

    // expands the filter list
    var expandList = (e) => {
        var shouldHide = !props.shouldHide;
        props.hid(shouldHide);
    }
    // determines whether it should show the down or right arrow
    var arrowIcon;
    if (props.shouldHide) {
        arrowIcon = downIcon;
    } else {
        arrowIcon = rightIcon;
    }

    // determines whether a checkbox is checked
    // document.getElementById("myCheck").checked = true;

    return(
        <div className="FilterOption">
            <p>Filter <img src={arrowIcon} onClick={(e) => expandList(e)}></img></p>
            <div className={props.shouldHide ? '' : 'hidden'}>
                <form>
                    <table>
                        <thead>
                        <tr>
                            <th>Degree Level</th>
                            <th>Position Type</th>
                            <th>Sponsorships</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input type="checkbox" id="db" onClick={(e) => handleDegree(e, "Bachelors", "db")} checked={props.checked["db"]}></input>Bachelors</td>
                            <td><input type="checkbox" id="ppft" onClick={(e) => handlePosition(e, "Professional Full Time Position", "ppft")} checked={props.checked["ppft"]}></input>Professional Full Time</td>
                            <td><input type="checkbox" id="susc" onClick={(e) => handleSponsor(e, "US Citizen", "susc")} checked={props.checked["susc"]}></input>US Citizen</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="dm" onClick={(e) => handleDegree(e, "Masters", "dm")} checked={props.checked["dm"]}></input>Masters</td>
                            <td><input type="checkbox" id="pi" onClick={(e) => handlePosition(e, "Internship Position", "pi")} checked={props.checked["pi"]}></input>Internship</td>
                            <td><input type="checkbox" id="sprus" onClick={(e) => handleSponsor(e, "Permanent Resident (U.S.)", "sprus")} checked={props.checked["sprus"]}></input>Permanent Resident (U.S.)</td>
                        </tr>
                        <tr> 
                            <td><input type="checkbox" id="dphd" onClick={(e) => handleDegree(e, "Phd", "dphd")} checked={props.checked["dphd"]}></input>Phd</td>
                            <td><input type="checkbox" id="pcop" onClick={(e) => handlePosition(e, "Co-op Position", "pcop")} checked={props.checked["pcop"]}></input>Co-op</td>
                            <td><input type="checkbox" id="sead" onClick={(e) => handleSponsor(e, "EAD - Employment Authorization", "sead")} checked={props.checked["sead"]}></input>EAD - Employment Authorization</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="dpd" onClick={(e) => handleDegree(e, "Post Doc", "dpd")} checked={props.checked["dpd"]}></input>Post Doc</td>
                            <td><input type="checkbox" id="pm" onClick={(e) => handlePosition(e, "Masters", "pm")} checked={props.checked["pm"]}></input>Masters</td>
                            <td><input type="checkbox" id="ssf1v" onClick={(e) => handleSponsor(e, "Student (F-1) Visa", "ssf1v")} checked={props.checked["ssf1v"]}></input>Student (F-1) Visa</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="dd" onClick={(e) => handleDegree(e, "Doctorate", "dd")} checked={props.checked["dd"]}></input>Doctorate</td>
                            <td><input type="checkbox" id="pphd" onClick={(e) => handlePosition(e, "PhD", "pphd")} checked={props.checked["pphd"]}></input>PhD</td>
                            <td><input type="checkbox" id="seh1v" onClick={(e) => handleSponsor(e, "Employment (H-1) Visa", "seh1v")} checked={props.checked["seh1v"]}></input>Employment (H-1) Visa</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="ds" onClick={(e) => handleDegree(e, "Special", "ds")} checked={props.checked["ds"]}></input>Special</td>
                            <td><input type="checkbox" id="pmbaico" onClick={(e) => handlePosition(e, "MBA Internship/Co-op Position", "pmbaico")} checked={props.checked["pmbaico"]}></input>MBA Internship/Co-op</td>
                            <td><input type="checkbox" id="sj1v" onClick={(e) => handleSponsor(e, "J-1 Visa", "sj1v")} checked={props.checked["sj1v"]}></input>J-1 Visa</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" id="dnd" onClick={(e) => handleDegree(e, "Non-Degree", "dnd")} checked={props.checked["dnd"]}></input>Non-Degree</td>
                            <td><input type="checkbox" id="pgip" onClick={(e) => handlePosition(e, "Global Internship Position", "pgip")} checked={props.checked["pgip"]}></input>Global Internship</td>
                            <td><input type="checkbox" id="sa" onClick={(e) => handleSponsor(e, "A", "sa")} checked={props.checked["sa"]}></input>A</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="checkbox" id="purp" onClick={(e) => handlePosition(e, "Undergraduate Research Position", "purp")} checked={props.checked["purp"]}></input>Undergraduate Research</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="checkbox" id="ppptpo" onClick={(e) => handlePosition(e, "Professional Part Time Position Only", "ppptpo")} checked={props.checked["ppptpo"]}></input>Professional Part Time</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="checkbox" id="pnpptso" onClick={(e) => handlePosition(e, "Non-Professional Part-Time/Seasonal Only", "pnpptso")} checked={props.checked["pnpptso"]}></input>Non-Professional Part-Time/Seasonal</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        shouldHide: state.shouldHide,
        checked: state.checked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterComp: (filtered, check, id) => {
            dispatch(filterCompanies(filtered, check, id))
        },
        hid: (shouldHide) => {
            dispatch(hide(shouldHide))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterOption);