import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterCompanies, hide } from '../../redux/actions';
import downIcon from '../../res/images/baseline_arrow_down_black_18dp.png';
import rightIcon from '../../res/images/baseline_arrow_forward_black_18dp.png';

function FilterOption(props) {
    var handleDegree = (e, deg) => {
        var filtered = {
            degree: [deg],
            position: [],
            sponsor: []
        };
        props.filterComp(filtered, e.target.checked);
    }

    var handlePosition = (e, pos) => {
        var filtered = {
            degree: [],
            position: [pos],
            sponsor: []
        };
        props.filterComp(filtered, e.target.checked);
    }

    var handleSponsor = (e, spons) => {
        var filtered = {
            degree: [],
            position: [],
            sponsor: [spons]
        };
        props.filterComp(filtered, e.target.checked);
    }

    var expandList = (e) => {
        var shouldHide = !props.shouldHide;
        props.hid(shouldHide);
    }
    var arrowIcon;
    if (props.shouldHide) {
        arrowIcon = downIcon;
    } else {
        arrowIcon = rightIcon;
    }

    return(
        <div className="FilterOption">
            <p>Filter <img src={arrowIcon} onClick={(e) => expandList(e)}></img></p>
            <div className={props.shouldHide ? '' : 'hidden'}>
                <form>
                    <table>
                        <tr>
                            <th>Degree Level</th>
                            <th>Position Type</th>
                            <th>Sponsorships</th>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="degree" onClick={(e) => handleDegree(e, "Bachelors")}></input>Bachelors</td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "Professional Full Time Position")}></input>Professional Full Time</td>
                            <td><input type="checkbox" name="sponsor" onClick={(e) => handleSponsor(e, "US Citizen")}></input>US Citizen</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="degree" onClick={(e) => handleDegree(e, "Masters")}></input>Masters</td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "Internship Position")}></input>Internship</td>
                            <td><input type="checkbox" name="sponsor" onClick={(e) => handleSponsor(e, "Permanent Resident (U.S.)")}></input>Permanent Resident (U.S.)</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="degree" onClick={(e) => handleDegree(e, "Phd")}></input>Phd</td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "Co-op Position")}></input>Co-op</td>
                            <td><input type="checkbox" name="sponsor" onClick={(e) => handleSponsor(e, "EAD - Employment Authorization")}></input>EAD - Employment Authorization</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="degree" onClick={(e) => handleDegree(e, "Post Doc")}></input>Post Doc</td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "Masters")}></input>Masters</td>
                            <td><input type="checkbox" name="sponsor" onClick={(e) => handleSponsor(e, "Student (F-1) Visa")}></input>Student (F-1) Visa</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="degree" onClick={(e) => handleDegree(e, "Doctorate")}></input>Doctorate</td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "PhD")}></input>PhD</td>
                            <td><input type="checkbox" name="sponsor" onClick={(e) => handleSponsor(e, "Employment (H-1) Visa")}></input>Employment (H-1) Visa</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="degree" onClick={(e) => handleDegree(e, "Special")}></input>Special</td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "MBA Internship/Co-op Position")}></input>MBA Internship/Co-op</td>
                            <td><input type="checkbox" name="sponsor" onClick={(e) => handleSponsor(e, "J-1 Visa")}></input>J-1 Visa</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="degree" onClick={(e) => handleDegree(e, "Non-Degree")}></input>Non-Degree</td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "Global Internship Position")}></input>Global Internship</td>
                            <td><input type="checkbox" name="sponsor" onClick={(e) => handleSponsor(e, "A")}></input>A</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "Undergraduate Research Position")}></input>Undergraduate Research</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "Professional Part Time Position Only")}></input>Professional Part Time</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="checkbox" name="position" onClick={(e) => handlePosition(e, "Non-Professional Part-Time/Seasonal Only")}></input>Non-Professional Part-Time/Seasonal</td>
                            <td></td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        shouldHide: state.shouldHide
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterComp: (filtered, check) => {
            dispatch(filterCompanies(filtered, check))
        },
        hid: (shouldHide) => {
            dispatch(hide(shouldHide))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterOption);