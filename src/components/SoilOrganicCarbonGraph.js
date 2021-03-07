import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useEffect, useState} from "react";



export const SoilOrganicCarbonGraph = (props) => {



    useEffect(() => {
        soilCarbonChart()
    },[]);



    const soilCarbonChart = () => {



        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("soilcarbon", am4charts.XYChart);
        chart.paddingRight = 20;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "geo";
        categoryAxis.renderer.minGridDistance = 40;
//categoryAxis.fontSize = 11;
        categoryAxis.renderer.labels.template.dy = 5;



        var series = chart.series.push(new am4charts.CandlestickSeries());
        series.dataFields.valueY = "upperquartile";
        series.dataFields.categoryX = "geo";

        series.dataFields.openValueY = "lowerquartile";
        series.dataFields.lowValueY = "min";
        series.dataFields.highValueY = "max";
        series.simplifiedProcessing = true;
        series.tooltipText = "Maximum: {highValueY.value}\nUpper quartile: {valueY.value}\nMedian: {median}\nLower quartile: {openValueY.value}\nMinimum: {lowValueY.value}\n";

        series.riseFromOpenState = undefined;
        series.dropFromOpenState = undefined;

        chart.cursor = new am4charts.XYCursor();

        var medianaSeries = chart.series.push(new am4charts.StepLineSeries());
        medianaSeries.noRisers = true;
        medianaSeries.startLocation = 0.1;
        medianaSeries.endLocation = 0.9;
        medianaSeries.dataFields.valueY = "median";
        medianaSeries.dataFields.categoryX = "geo";
        medianaSeries.strokeWidth = 2;
        medianaSeries.stroke = am4core.color("#fff");


        var topSeries = chart.series.push(new am4charts.StepLineSeries());
        topSeries.noRisers = true;
        topSeries.startLocation = 0.2;
        topSeries.endLocation = 0.8;
        topSeries.dataFields.valueY = "max";
        topSeries.dataFields.categoryX = "geo";
        topSeries.stroke = chart.colors.getIndex(0);
        topSeries.strokeWidth = 2;

        var bottomSeries = chart.series.push(new am4charts.StepLineSeries());
        bottomSeries.noRisers = true;
        bottomSeries.startLocation = 0.2;
        bottomSeries.endLocation = 0.8;
        bottomSeries.dataFields.valueY = "min";
        bottomSeries.dataFields.categoryX = "geo";
        bottomSeries.stroke = chart.colors.getIndex(0);
        bottomSeries.strokeWidth = 2;

        let array = [
            props.soilCarbonData.soilCarbon[1],
            props.soilCarbonData.soilCarbon[0],
        ]

        chart.data = array;

    }

    return (

        <div id="soilcarbon">
            {soilCarbonChart()}
        </div>


    );

}
