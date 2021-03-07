import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useEffect, useState,useRef} from "react";

import styles from './NdviGraph.css'




export const NdviGraph = (props) => {


    const [countryHidden, setCountryHidden] = useState(true);
    const [step2hidden, setStep2Hidden] = useState(true);

    const op1 = useRef(null);
    const op2 = useRef(null);


    useEffect(() => {
        ndviChart()
    },[]);




    const ndviChart = () => {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("ndvi", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.exporting.menu = new am4core.ExportMenu();
        chart.data = props.ndviData;

        chart.dateFormatter.dateFormat = "yyyy";
        chart.dateFormatter.inputDateFormat = "yyyy";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 45;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;
        dateAxis.baseInterval = {
            timeUnit: "year",
            count: 1
        }

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.opposite = true;

        // Create series
        var series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = "country";
        //------------
        series1.dataFields.dateX = "year";
        series1.strokeWidth = 1;
        series1.minBulletDistance = 10;
        series1.tooltipText = "[bold]{dateX}[/]\n[font-size: 20] {valueY}";
        series1.fillOpacity = 0.1;
        series1.tooltip.pointerOrientation = "vertical";
        series1.tooltip.background.cornerRadius = 20;
        series1.tooltip.background.fillOpacity = 0.5;
        series1.tooltip.label.padding(12, 12, 12, 12);
        series1.stroke = am4core.color("#46a084");
        series1.fill = am4core.color("#46a084");


        var seriesRange1 = dateAxis.createSeriesRange(series1);
        seriesRange1.contents.strokeWidth = 0;
        seriesRange1.contents.fillOpacity = 0;

        // Create series
        var series2 = chart.series.push(new am4charts.LineSeries());
        //------------
        series2.dataFields.valueY = "roi";
        //------------
        series2.dataFields.dateX = "year";
        series2.strokeWidth = 0;
        series2.minBulletDistance = 10;
        series2.tooltipText = "{valueY}";
        series2.fillOpacity = 0;
        series2.tooltip.pointerOrientation = "vertical";
        series2.tooltip.background.cornerRadius = 20;
        series2.tooltip.background.fillOpacity = 0.5;
        series2.tooltip.label.padding(12, 12, 12, 12)

        var seriesRange2 = dateAxis.createSeriesRange(series2);
        seriesRange2.contents.strokeWidth = 1;
        seriesRange2.contents.fillOpacity = 0.1;
        seriesRange2.contents.stroke = am4core.color("#0e62bd");
        seriesRange2.contents.fill = am4core.color("#0e62bd");


        //chart.cursor = new am4charts.XYCursor();
        //chart.cursor.lineY.opacity = 0;
        // Add scrollbar
        //chart.scrollbarX = new am4core.Scrollbar();

        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series1);

        var firstTime =  Number(chart.data[0].year);
        var lastTime =  Number(chart.data[chart.data.length - 1].year);

        var lTime = Number(chart.data[chart.data.length - 2].year);
        var ldate = new Date(lTime,0,0);

        var sTime = Number(chart.data[2].year);
        var sdate = new Date(sTime,0,0);

        var qTime = (lastTime + firstTime) / 2;

        var qdate = new Date(qTime,0,0);

        // add range
        var range = dateAxis.axisRanges.push(new am4charts.DateAxisDataItem());
        range.grid.stroke = chart.colors.getIndex(0);
        range.grid.strokeOpacity = 1;
        range.bullet = new am4core.ResizeButton();
        range.bullet.background.fill = chart.colors.getIndex(0);
        range.bullet.background.states.copyFrom(chart.zoomOutButton.background.states);
        range.bullet.minX = 0;
        range.bullet.adapter.add("minY", function(minY, target) {
            target.maxY = chart.plotContainer.maxHeight;
            target.maxX = chart.plotContainer.maxWidth;
            return chart.plotContainer.maxHeight;
        })


        range.bullet.events.on("dragged", function() {

            range.value = dateAxis.xToValue(range.bullet.pixelX);

            seriesRange1.value = range.value;
            seriesRange2.value = range.value;

            if (range.value > ldate) {
                document.getElementById("ndvi_roi").style.display = "none";
                document.getElementById("ndvi_country").style.display = "block";

                op1.current.hidden=false;
            }
            else {

                if (range.value < sdate) {
                    document.getElementById("ndvi_roi").style.display = "block";
                    op2.current.hidden=false;
                    document.getElementById("ndvi_country").style.display = "none";
                }
                else {
                    op1.current.hidden=true;
                    op2.current.hidden=true;
                    document.getElementById("ndvi_roi").style.display = "none";
                    document.getElementById("ndvi_country").style.display = "none";
                }

            }

        })

        range.date = qdate;

        seriesRange1.date = qdate;
        seriesRange1.endDate =  new Date(lastTime+1,0,0);

        seriesRange2.date = qdate;
        seriesRange2.endDate =  new Date(lastTime+1,0,0);

        var roicurCNT = 0;
        var roicurSUM = 0;
        var countrycurCNT = 0;
        var countrycurSUM = 0;
        //-------

        for (var i = 1; i < (chart.data.length - 1); i++) {
            roicurCNT += 1;
            roicurSUM += chart.data[i].roi;
            countrycurCNT += 1;
            countrycurSUM += chart.data[i].country;
        }
        //-------
        var roicurAVG       = (roicurSUM / roicurCNT);
        var countrycurAVG   = (countrycurSUM / countrycurCNT);

        //-------
        //document.getElementById("ndvi_roi_val").innerHTML = roicurAVG.toFixed(2);
        //document.getElementById("ndvi_country_val").innerHTML = countrycurAVG.toFixed(2);
        //-------
        //document.getElementById("ndvi_roi").style.display = "none";
        //document.getElementById("ndvi_country").style.display = "none";

    }

    return (
        <div className="p-grid">
            <div className="range-legend">
                <h2 className="range-legend-title">
                    <span>Vegetation Productivity</span>
                    <div className="range-legend-subtitle">
                        <span>Normalized Difference Vegetation Index (NDVI) Annual Average</span>
                    </div>
                </h2>
                <div ref={op1} id="ndvi_country" className="panel" hidden={true}>
                    <div className="panel-title-container">
                        <div className="first-panel-title">
                            <span>COUNTRY</span>
                        </div>
                    </div>

                    <div className="panel-content-container">
                        <div className="panel-title-container">
                            <span>Historical Average</span>
                            <div className="first-panel-title">
                                <span>from 2001 to 2018</span>
                            </div>
                        </div>
                        <div className="first-panel-subtitle" >
                            <span id="ndvi_country_val" ></span>
                        </div>
                    </div>
                </div>
                <div ref={op2} id="ndvi_roi" className="panel" hidden={true}>
                    <div className="panel-title-container">
                        <div className="second-panel-title">
                            ROI
                        </div>
                    </div>

                    <div className="panel-content-container">
                        <div className="panel-title-container">
                            <span>Historical Average</span>
                            <div className="second-panel-title">
                                <span>from 2001 to 2018</span>
                            </div>
                        </div>
                        <div className="second-panel-subtitle">
                            <span id="ndvi_roi_val"></span>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 style={{fontWeight:"300"}}>Move slider to switch regions <i className="fad fa-chevron-double-right"/></h5>
                </div>
            </div>
            <div id="ndvi" className="p-col">
                {ndviChart()}

            </div>
        </div>
    );

}
