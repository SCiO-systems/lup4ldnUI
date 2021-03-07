import React, {useEffect, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export const PopulationGraph = (props) => {


    useEffect(() => {
        populationChart()
    },[]);


    const populationChart = () => {
        //https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/BFA_population.csv

        var DATA_URL1 = "";
        var DATA_URL2 = "";

        if(props.data != undefined){
            DATA_URL1 = props.data.ageGroups;
            DATA_URL2 = props.data.population;
        }

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var MaxData=0;


        /**
         * Create container for charts
         */
        var container = am4core.create("population", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";

        /**
         * Population pyramid chart
         */

        var pyramidChart = container.createChild(am4charts.XYChart);

        pyramidChart.cursor = new am4charts.XYCursor();
        pyramidChart.cursor.behavior = "none";
        //pyramidChart.arrangeTooltips = false;

        pyramidChart.numberFormatter.numberFormat = "#,###.#a";
        pyramidChart.numberFormatter.bigNumberPrefixes = [
            { "number": 1e+3, "suffix": "M" }
        ];

        pyramidChart.dataSource.url = DATA_URL1;
        pyramidChart.dataSource.parser = new am4core.CSVParser();
        pyramidChart.dataSource.parser.options.numberFields = ["col5", "col6", "col7"];
        pyramidChart.dataSource.events.on("parseended", function(ev) {
            sourceData = ev.target.data;
            ev.target.data = getCurrentData();

            if (ev.target.data.length == 0) {
                return;
            }
            var MaxData=0;
            am4core.array.each(ev.target.data, function(row, i) {
                if (!ev.target.data[i]) {
                }
                else {

                    if (Math.max(ev.target.data[i].col5)>MaxData) {
                        MaxData = Math.max(ev.target.data[i].col5);
                    }
                    if (Math.max(ev.target.data[i].col6)>MaxData) {
                        MaxData = Math.max(ev.target.data[i].col6);
                    }
                }

            });


            var MaxLimit = 1.5 * MaxData;
            pyramidXAxisMale.max = MaxLimit;
            pyramidXAxisFemale.max = MaxLimit;

        });

        function getCurrentData() {
            var currentData = [];
            am4core.array.each(sourceData, function(row, i) {
                if (row.col3 == currentYear) {
                    currentData.push(row);
                }
            });
            currentData.sort(function(a, b) {
                var a1 = Number(a.col4.replace(/[^0-9]+.*$/, ""));
                var b1 = Number(b.col4.replace(/[^0-9]+.*$/, ""));
                if (a1 > b1) {
                    return 1;
                }
                else if (a1 < b1) {
                    return -1;
                }
                return 0;
            });
            return currentData;
        }

        function updateData() {
            var data = getCurrentData();
            if (data.length == 0) {
                return;
            }
            am4core.array.each(pyramidChart.data, function(row, i) {
                if (!data[i]) {
                    pyramidChart.data[i].col5 = 0;
                    pyramidChart.data[i].col6 = 0;
                }
                else {
                    pyramidChart.data[i].col5 = data[i].col5;
                    pyramidChart.data[i].col6 = data[i].col6;

                    if (Math.max(data[i].col5)>MaxData) {
                        MaxData = Math.max(data[i].col5);
                    }
                    if (Math.max(data[i].col6)>MaxData) {
                        MaxData = Math.max(data[i].col6);
                    }

                }
            });
            pyramidChart.invalidateRawData();

            // Set title
            pyramidChart.titles.getIndex(0).text = currentYear;

            var MaxLimit = 1.5 * MaxData;

            pyramidXAxisMale.max = MaxLimit;
            pyramidXAxisFemale.max = MaxLimit;

        }

        // An adapter which filters data for the current year
        var currentYear = new Date().getFullYear().toString();
        var sourceData = [];

        var pyramidXAxisMale = pyramidChart.xAxes.push(new am4charts.ValueAxis());
        pyramidXAxisMale.min = 0;
        //pyramidXAxisMale.max = 20000;
        pyramidXAxisMale.strictMinMax = true;

        var pyramidXAxisFemale = pyramidChart.xAxes.push(new am4charts.ValueAxis());
        pyramidXAxisFemale.min = 0;
        //pyramidXAxisFemale.max = 20000;
        pyramidXAxisFemale.renderer.inversed = true;
        pyramidXAxisFemale.strictMinMax = true;


        var label1 = pyramidChart.createChild(am4core.Label);
        label1.text = "Males";
        label1.fontSize = 20;
        label1.fill = am4core.color("#257fc8");
        label1.isMeasured = false;
        label1.x = am4core.percent(75);
        label1.horizontalCenter = "middle";
        label1.y = 20;

        var label2 = pyramidChart.createChild(am4core.Label);
        label2.text = "Females";
        label2.fontSize = 20;
        label2.fill = am4core.color("#257fc8");
        label2.isMeasured = false;
        label2.x = am4core.percent(25);
        label2.horizontalCenter = "middle";
        label2.y = 20;


        pyramidChart.bottomAxesContainer.layout = "horizontal";

        var pyramidYAxis = pyramidChart.yAxes.push(new am4charts.CategoryAxis());
        pyramidYAxis.dataFields.category = "col4";
        pyramidYAxis.renderer.minGridDistance = 10;
        pyramidYAxis.renderer.grid.template.location = 0;
        pyramidYAxis.renderer.inside = true;
        pyramidYAxis.title.text = "Age groups";


        var pyramidSeriesMale = pyramidChart.series.push(new am4charts.ColumnSeries());
        pyramidSeriesMale.dataFields.categoryY = "col4";
        pyramidSeriesMale.dataFields.valueX = "col5";
        pyramidSeriesMale.tooltipText = "{valueX}";
        pyramidSeriesMale.name = "Male";
        pyramidSeriesMale.xAxis = pyramidXAxisMale;
        pyramidSeriesMale.clustered = false;
        pyramidSeriesMale.columns.template.strokeOpacity = 0;

        var pyramidSeriesFemale = pyramidChart.series.push(new am4charts.ColumnSeries());
        pyramidSeriesFemale.dataFields.categoryY = "col4";
        pyramidSeriesFemale.dataFields.valueX = "col6";
        pyramidSeriesFemale.tooltipText = "{valueX}";
        pyramidSeriesFemale.name = "Female";
        pyramidSeriesFemale.xAxis = pyramidXAxisFemale;
        pyramidSeriesFemale.clustered = false;
        pyramidSeriesFemale.columns.template.strokeOpacity = 0;

        var pyramidTitle = pyramidChart.titles.create();
        pyramidTitle.text = currentYear;
        pyramidTitle.fontSize = 20;
        pyramidTitle.marginBottom = 22;


        /**
         * Create population chart
         */
        var popChart = container.createChild(am4charts.XYChart);
        popChart.marginLeft = 15;
        popChart.data = [{}];

        var popSubtitle = popChart.titles.create();
        popSubtitle.text = "(hover to see breakdown)";
        //popSubtitle.fill = am4core.color("#daa520");

        var popTitle = popChart.titles.create();

        popTitle.text = "Population";
        popTitle.fontSize = 20;

        popChart.numberFormatter.numberFormat = "#,###.#a";
        popChart.numberFormatter.bigNumberPrefixes = [
            { "number": 1e+3, "suffix": "M" }
        ];

        popChart.dateFormatter.dateFormat = "yyyy";

        var popXAxis = popChart.xAxes.push(new am4charts.DateAxis());
        popXAxis.renderer.minGridDistance = 40;

        var popYAxis = popChart.yAxes.push(new am4charts.ValueAxis());
        popYAxis.renderer.opposite = true;

        var popSeriesMale = popChart.series.push(new am4charts.LineSeries());
        popSeriesMale.dataFields.dateX = "col3";
        popSeriesMale.dataFields.valueY = "col4";
        popSeriesMale.propertyFields.strokeDasharray = "dash";
        popSeriesMale.propertyFields.fillOpacity = "opacity";
        popSeriesMale.stacked = true;
        popSeriesMale.strokeWidth = 2;
        popSeriesMale.fillOpacity = 0.5;
        popSeriesMale.name = "Male";

        var popSeriesFemale = popChart.series.push(new am4charts.LineSeries());
        popSeriesFemale.dataFields.dateX = "col3";
        popSeriesFemale.dataFields.valueY = "col5";
        popSeriesFemale.propertyFields.strokeDasharray = "dash";
        popSeriesFemale.propertyFields.fillOpacity = "opacity";
        popSeriesFemale.stacked = true;
        popSeriesFemale.strokeWidth = 2;
        popSeriesFemale.fillOpacity = 0.5;
        popSeriesFemale.tooltipText = "[bold]Population in {dateX}[/]\n[font-size: 20] Male: {col4}\nFemale: {col5}";
        popSeriesFemale.name = "Female";

        popChart.dataSource.url = DATA_URL2;
        popChart.dataSource.parser = new am4core.CSVParser();
        popChart.dataSource.parser.options.numberFields = ["col4", "col5", "col6"];
        popChart.dataSource.adapter.add("parsedData", function(data) {
            am4core.array.each(data, function(item) {
                if (item.col3.getFullYear() == currentYear) {
                    item.dash = "3,3";
                    item.opacity = 0.3;
                }
            });
            return data;
        });

        popChart.cursor = new am4charts.XYCursor();
        popChart.snapToSeries = popSeriesFemale;
        popChart.cursor.events.on("cursorpositionchanged", function(ev) {
            currentYear = popXAxis.positionToDate(popXAxis.toAxisPosition(ev.target.xPosition)).getFullYear().toString();
            updateData();
        });

        popChart.cursor.events.on("hidden", function(ev) {
            var currentYear = new Date().getFullYear().toString();
            updateData();
        });

    }

    return (

        <div id="population">
            {populationChart()}

        </div>


    );

}
