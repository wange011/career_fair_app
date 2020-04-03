import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import './NumFavorites.css';
import { packSiblings } from 'd3';

function nameToID(comps, name) {
    if (comps != undefined) {
        for (var i = 0; i < comps.length; i++) {
            for (var j in comps[i]) {
                if (comps[i][j].name === name) {
                    return comps[i][j]._id;
                }
            }
        }
    } else {return NaN}
}

class NumFavorites extends Component {
    
    componentDidMount() {
        this.refs.current && this.refs.current.focus();
        const sample_data = {
            "children": [{"Name": 'Agilysys, Inc.', "Count": 18},
            {"Name": 'ADP', "Count": 22},
            {"Name": 'American Express', "Count": 33},
            {"Name": 'Capital One', "Count": 41},
            {"Name": '402d Software Maintenance Group, Robins AFB', "Count": 18},
            {"Name": 'Accenture', "Count":  17},
            {"Name": 'Air Force Reserve', "Count": 20},
            {"Name": 'Apogee', "Count": 16},
            {"Name": 'AnswerRocket', "Count": 28},
            {"Name": 'Annapolis Micro Systems, Inc.', "Count": 23},
            {"Name": 'Cisco Systems', "Count": 19},
            {"Name": 'Citi Technology', "Count": 10},
            {"Name": 'Comentec LLC', "Count": 24},
            {"Name": 'CodeMettle', "Count": 8},
            {"Name": 'COUNTRY Financial', "Count": 30},
            {"Name": 'Cvent', "Count": 16},
            {"Name": 'DataScan', "Count": 5},
            {"Name": 'Daugherty Business Solutions', "Count": 10},
            {"Name": 'Datto Inc', "Count": 17},
            {"Name": 'Dispersive Networks', "Count": 40},
            {"Name": 'Dropbox', "Count": 2},
            {"Name": 'EPI-USE America Inc', "Count": 15},
            {"Name": 'General Dynamics Land Systems', "Count": 14},
            {"Name": 'Georgia Tech Research Institute (GTRI)', "Count": 13},
            {"Name": 'Goldman Sachs', "Count": 25},
            {"Name": "GT's Advanced Technology Development Center", "Count": 24},
            {"Name": 'Opendoor', "Count": 16},
            {"Name": 'OSIsoft', "Count": 21},
            {"Name": 'Stryker', "Count": 42},
            {"Name": 'Synamedia', "Count": 34},
            {"Name": 'The Home Depot', "Count": 32},
            {"Name": 'The Aerospace Corporation', "Count": 12},
            {"Name": 'Wayfair', "Count": 41},
            {"Name": 'XPO Logistics', "Count": 19},
            {"Name": 'Zuora', "Count": 37},
            {"Name": 'Yahoo/Tumblr', "Count": 36}]
        };

        if (Object.keys(this.props.numFavorites).length == 0) {
            this.drawBubbleChart(sample_data)
        } else {
            var children = []
            for (var name in this.props.numFavorites) {
                children.push({"Name": name, "Count": this.props.numFavorites[name]})
            }
    
            const data = {
                "children": children
            }
            this.drawBubbleChart(data, this.props.companies)
        }
    }
    
    componentDidUpdate() {
        this.refs.current && this.refs.current.focus();
        var children = []
        for (var name in this.props.numFavorites) {
            children.push({"Name": name, "Count": this.props.numFavorites[name]})
        }

        const data = {
            "children": children
        }
        this.removeData();
        this.drawBubbleChart(data, this.props.companies);
    }

    drawBubbleChart(data, companies)  {
        if (Object.keys(data.children).length === 0) {
            return NaN;
        }
        const canvasHeight = 400
        const canvasWidth = 600
        const scale = 20

        var diameter = 600;
        var color = d3.scaleOrdinal(["#B3A369","#F5D580","#404054","#003057","#005077"]);

        var bubble = d3.pack(data)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(data)
            .sum(function(d) { return d.Count; });

        var props = this.props

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .attr("xlink:href", function(d) {
                const name = d.data.Name;
                const id = nameToID(companies, name);
                if (id === NaN) {
                    return "";
                }
                return "/view/" + id;
            })
            .on("click", function(d) {
                const name = d.data.Name;
                const id = nameToID(companies, name);
                if (id === NaN) {
                    return;
                }
                props.history.push("/view/" + id);
            });

        node.append("title")
            .text(function(d) {
                return d.data.Name + ": " + d.data.Count;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .attr("href", function(d) {
                const name = d.data.Name;
                const id = nameToID(companies, name);
                if (id === NaN) {
                    return "";
                }
                return "/view/" + id;
            })
            .style("fill", function(d,i) {
                return color(i);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                const title = d.data.Name;
                if (d.r < 80) {
                    return title.substring(0, d.r / 3);
                } else {
                    return title.substring(0, d.r / 5);
                }
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                if (d.r < 80) {
                    return d.r/5;
                } else {
                    return d.r / 8;
                }
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Count;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                if (d.r < 80) {
                    return d.r/5;
                } else {
                    return d.r / 8;
                }
            })
            .attr("fill", "white");
    }

    removeData() {

        d3.select("svg").remove()

    }

    render() { 
        return <div ref="canvas" className="col-lg-8"></div>
    }
}

const mapStateToProps = (state) => {
    return {
        numFavorites: state.numFavorites,
        companies: state.companies
    }
}

export default withRouter(connect(mapStateToProps)(NumFavorites));