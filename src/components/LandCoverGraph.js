import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useEffect, useState} from "react";



export const LandCoverGraph = (props) => {


    const [chartData, setChartData] = useState();

    useEffect(() => {
        landCoverChart()
    },[props.year]);



    const landCoverChart = () => {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // create chart
        var chart = am4core.create("landcover", am4charts.TreeMap);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        chart.colors.step = 2;
        // define data fields
        chart.dataFields.value = "tval";
        chart.dataFields.name = "name";
        chart.dataFields.color = "color";

        chart.zoomable = false;
        var bgColor = new am4core.InterfaceColorSet().getFor("background");

        // level 0 series template
        var level0SeriesTemplate = chart.seriesTemplates.create("0");
        var level0ColumnTemplate = level0SeriesTemplate.columns.template;

        level0SeriesTemplate.tooltip.animationDuration = 0;
        level0SeriesTemplate.strokeOpacity = 1;

        level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
        level0ColumnTemplate.fillOpacity = 1;
        level0ColumnTemplate.strokeWidth = 4;
        level0ColumnTemplate.stroke = bgColor;

        level0ColumnTemplate.tooltipText = "{name}\n{tval} ha ({tperc}%)";


        var bullet1 = level0SeriesTemplate.bullets.push(new am4charts.LabelBullet());
        bullet1.locationY = 0.5;
        bullet1.locationX = 0.5;
        bullet1.label.text = "{name}";
        bullet1.label.fill = am4core.color("#ffffff");


        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end


        chart.data = props.landCoverData[props.year];

    }

    return (

        <div id="landcover">
        </div>


    );

}
