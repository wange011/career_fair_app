import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import './NumFavorites.css';


class NumFavorites extends Component {
    
    componentDidMount() {
        // const data = [ 2, 4, 2, 6, 8 ]
        this.refs.current && this.refs.current.focus();
        console.log(this.props.numFavorites)
        const data = {
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
        this.drawBubbleChart(data)
    }
    drawBubbleChart(data)  {
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
            });

        node.append("title")
            .text(function(d) {
                return d.data.Name + ": " + d.data.Count;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
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
                return d.r/5;
            })
            .attr("fill", "white");

        
        console.log(this.props)
        console.log(this)
    }
    render() { 
        return <div ref="canvas" className="col-lg-8"></div> 
    }
}

const mapStateToProps = (state) => {
    return {
        numFavorites: state.numFavorites
    }
}

export default connect(mapStateToProps)(NumFavorites);