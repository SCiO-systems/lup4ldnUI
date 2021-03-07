import React, {useEffect, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Dialog} from "primereact/components/dialog/Dialog";
import {Button} from "primereact/components/button/Button";



export const ClimateProspectsSpectralIndicesGraph = (props) => {


    const [displayNDVIDialog, setDisplayNDVIDialog] = useState(false);


    useEffect(() => {
        climateProspectsChart()
    },[]);

    const climateProspectsChart = () => {

        //------- TEMPERATURE

        var COUNTRY_CODE = "BF";

        //var DATA_URL = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/clim_BFA_prec.csv";

        var DATA_URL = "";

        if(props.data != undefined){
            DATA_URL = props.data.ndvi;
        }

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("spectralindices", am4charts.XYChart);

        chart.exporting.menu = new am4core.ExportMenu();

        // Add data

        chart.data = [{}];
        chart.dateFormatter.dateFormat = "yyyy";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 45;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.opposite = true;

        // Create series
        var series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = "col1";
        series1.dataFields.dateX = "col0";
        series1.strokeWidth = 1;
        series1.minBulletDistance = 10;
        series1.tooltipText = "[bold]{dateX}[/]\n[font-size: 20] {valueY}";
        series1.fillOpacity = 0.1;
        series1.tooltip.pointerOrientation = "vertical";
        series1.tooltip.background.cornerRadius = 20;
        series1.tooltip.background.fillOpacity = 0.5;
        series1.tooltip.label.padding(12, 12, 12, 12);
        series1.stroke = am4core.color("#0e62bd");
        series1.fill = am4core.color("#0e62bd");



        var seriesRange1A = dateAxis.createSeriesRange(series1);
        seriesRange1A.contents.strokeWidth = 1;
        seriesRange1A.contents.fillOpacity = 0.1;
        seriesRange1A.contents.stroke = am4core.color("#46a084");
        seriesRange1A.contents.fill = am4core.color("#46a084");


        var seriesRange1B = dateAxis.createSeriesRange(series1);
        seriesRange1B.contents.strokeWidth = 0;
        seriesRange1B.contents.fillOpacity = 0;


        // Create series
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "col2";
        series2.dataFields.dateX = "col0";
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
        seriesRange2.contents.stroke = am4core.color("#dc3545");
        seriesRange2.contents.fill = am4core.color("#dc3545");


        //chart.cursor = new am4charts.XYCursor();
        //chart.cursor.lineY.opacity = 0;
        // Add scrollbar
        //chart.scrollbarX = new am4core.Scrollbar();

        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series1);



        var lastTime =  new Date(2100, 0, 0).getTime();

        var lTime = new Date(2098, 0, 0).getTime();
        var ldate = new Date(lTime);

        var sTime = new Date((new Date().getFullYear()+2).toString(), 0, 0).getTime();
        var sdate = new Date(sTime);


        var mTime = new Date(new Date().getFullYear().toString(), 0, 0).getTime();
        var qTime = mTime + ((lastTime - mTime) / 2);

        var mdate = new Date(mTime);
        var qdate = new Date(qTime);

        // add range
        var range = dateAxis.axisRanges.push(new am4charts.DateAxisDataItem());
        range.grid.stroke = chart.colors.getIndex(0);
        range.grid.strokeOpacity = 1;
        range.bullet = new am4core.ResizeButton();
        range.bullet.background.fill = chart.colors.getIndex(0);
        range.bullet.background.states.copyFrom(chart.zoomOutButton.background.states);

        range.bullet.adapter.add("minY", function(minY, target) {
            target.maxY = chart.plotContainer.maxHeight;
            target.maxX = chart.plotContainer.maxWidth;
            return chart.plotContainer.maxHeight;
        })

        range.bullet.events.on("dragged", function() {

            range.bullet.minX = dateAxis.valueToPoint(mTime).x;

            if (dateAxis.xToValue(range.bullet.pixelX) > mdate) {

                range.value = dateAxis.xToValue(range.bullet.pixelX);

            }
            else {

                range.value = mdate;
            }


            if (range.value > ldate) {
                document.getElementById("ndvi_rcp45").style.display = "block";
                document.getElementById("ndvi_rcp85").style.display = "none";
            }
            else {

                if (range.value < sdate) {
                    document.getElementById("ndvi_rcp45").style.display = "none";
                    document.getElementById("ndvi_rcp85").style.display = "block";
                }
                else {
                    document.getElementById("ndvi_rcp45").style.display = "none";
                    document.getElementById("ndvi_rcp85").style.display = "none";
                }

            }



            seriesRange1A.endValue  = range.value;
            seriesRange1B.value = range.value;
            seriesRange2.value = range.value;

        })

        range.date = qdate;


        seriesRange1A.date = mdate;
        seriesRange1A.endDate = qdate;

        seriesRange1B.date = qdate;
        seriesRange1B.endDate = new Date(2100, 0, 0);

        seriesRange2.date = qdate;
        seriesRange2.endDate = new Date(2100, 0, 0);


        chart.dataSource.url = DATA_URL;
        chart.dataSource.parser = new am4core.CSVParser();
        chart.dataSource.parser.options.numberFields = ["col"];
        chart.dataSource.adapter.add("parsedData", function(data) {



            var currentYear = new Date().getFullYear().toString();

            var clim_prec_per1 = "from "+
                data[1].col0.getFullYear().toString()+" to "+currentYear;
            document.getElementById("lang_idx_ndvi_per1").innerHTML= clim_prec_per1;


            var curCNT = 0;
            var curSUM = 0;
            //-------
            var rcp4CNT_2050 = 0;
            var rcp4SUM_2050 = 0;
            var rcp4CNT_2100 = 0;
            var rcp4SUM_2100 = 0;
            //-------
            var rcp8CNT_2050 = 0;
            var rcp8SUM_2050 = 0;
            var rcp8CNT_2100 = 0;
            var rcp8SUM_2100 = 0;
            //-------
            var curMAX = 0;
            var curMIN = 10000;
            //-------
            var rcp4MAX = 0;
            var rcp4MIN = 10000;
            //-------
            var rcp8MAX = 0;
            var rcp8MIN = 10000;
            //-------

            var Time2050 =  new Date(2050, 0, 0).getTime();

            for (var i = 1; i < (data.length - 1); i++) {

                var xdate = new Date(data[i].col0.getFullYear().toString(), 0, 0).getTime();

                if (xdate > mTime) {

                    if (rcp4MAX < data[i].col1) { rcp4MAX = data[i].col1; }
                    if (rcp4MIN > data[i].col1) { rcp4MIN = data[i].col1; }
                    //-------
                    if (rcp8MAX < data[i].col2) { rcp8MAX = data[i].col2; }
                    if (rcp8MIN > data[i].col2) { rcp8MIN = data[i].col2; }
                    //-------

                    if (xdate > Time2050) {
                        rcp4CNT_2100 += 1;
                        rcp4SUM_2100 += data[i].col1;
                        //-------
                        rcp8CNT_2100 += 1;
                        rcp8SUM_2100 += data[i].col2;
                    }
                    else {
                        rcp4CNT_2050 += 1;
                        rcp4SUM_2050 += data[i].col1;
                        //-------
                        rcp8CNT_2050 += 1;
                        rcp8SUM_2050 += data[i].col2;
                    }

                }
                else {
                    curCNT += 1;
                    curSUM += data[i].col1;

                    if (curMAX < data[i].col1) { curMAX = data[i].col1; }
                    if (curMIN > data[i].col1) { curMIN = data[i].col1; }


                }

            }
            //-------
            var curAVG  = (curSUM / curCNT);
            //-------
            var clim_prec_val1 = curAVG.toFixed(2);
            document.getElementById("lang_idx_ndvi_val1").innerHTML= clim_prec_val1;
            //-------
            var rcp4AVG_2050 = (rcp4SUM_2050 / rcp4CNT_2050);
            var rcp8AVG_2050 = (rcp8SUM_2050 / rcp8CNT_2050);
            var rcp4AVG_2100 = (rcp4SUM_2100 / rcp4CNT_2100);
            var rcp8AVG_2100 = (rcp8SUM_2100 / rcp8CNT_2100);
            //-------
            var max2050 = Math.max(rcp4AVG_2050,rcp8AVG_2050);
            var midAVG2050 = (rcp4AVG_2050 + rcp8AVG_2050) / 2;
            var per2050 = 100 * Math.abs((max2050-midAVG2050) / midAVG2050);
            var clim_prec_val2 = midAVG2050.toFixed(2)+" +/- "+ per2050.toFixed(1)+"%";

            //-------
            document.getElementById("lang_idx_ndvi_val2").innerHTML= clim_prec_val2;
            //-------
            var max2100 = Math.max(rcp4AVG_2100,rcp8AVG_2100);
            var midAVG2100 = (rcp4AVG_2100 + rcp8AVG_2100) / 2;
            var per2100 = 100 * Math.abs((max2100-midAVG2100) / midAVG2100);
            var clim_prec_val3 = midAVG2100.toFixed(2)+" +/- "+ per2100.toFixed(1)+"%";
            //-------
            document.getElementById("lang_idx_ndvi_val3").innerHTML= clim_prec_val3;
            //-------
            document.getElementById("lang_idx_ndvi_rcp45_min").innerHTML= "MIN = "+rcp4MIN.toFixed(2);
            document.getElementById("lang_idx_ndvi_rcp45_max").innerHTML= "MAX = "+rcp4MAX.toFixed(2);
            //-------
            document.getElementById("lang_idx_ndvi_rcp85_min").innerHTML= "MIN = "+rcp8MIN.toFixed(2);
            document.getElementById("lang_idx_ndvi_rcp85_max").innerHTML= "MAX = "+rcp8MAX.toFixed(2);
            //-------
            document.getElementById("lang_idx_ndvi_rcp45_min_msg").innerHTML="";
            document.getElementById("lang_idx_ndvi_rcp85_min_msg").innerHTML="";
            document.getElementById("lang_idx_ndvi_rcp45_max_msg").innerHTML="";
            document.getElementById("lang_idx_ndvi_rcp85_max_msg").innerHTML="";
            //-------
            if (rcp4MIN<curMIN) {
                if (rcp8MIN<curMIN) {
                    if (rcp4MIN<rcp8MIN) {
                        document.getElementById("lang_idx_ndvi_rcp45_min_msg").innerHTML= "<div style='color: red;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical minimum</span></div>";
                        document.getElementById("lang_idx_ndvi_rcp85_min_msg").innerHTML= "<div style='color: orange;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical minimum</span></div>";
                    }
                    else {
                        document.getElementById("lang_idx_ndvi_rcp45_min_msg").innerHTML= "<div style='color: orange;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical minimum</span></div>";
                        document.getElementById("lang_idx_ndvi_rcp85_min_msg").innerHTML= "<div style='color: red;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical minimum</span></div>";
                    }
                }
                else {
                    document.getElementById("lang_idx_ndvi_rcp45_min_msg").innerHTML= "<div style='color: orange;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical minimum</span></div>";
                }
            }
            else {
                if (rcp8MIN<curMIN) {
                    document.getElementById("lang_idx_ndvi_rcp85_min_msg").innerHTML= "<div style='color: orange;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical minimum</span></div>";
                }
            }
            //-------
            if (rcp4MAX>curMAX) {
                if (rcp8MAX>curMAX) {
                    if (rcp4MAX>rcp8MAX) {
                        document.getElementById("lang_idx_ndvi_rcp45_max_msg").innerHTML= "<div style='color: red;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical maximum</span></div>";
                        document.getElementById("lang_idx_ndvi_rcp85_max_msg").innerHTML= "<div style='color: orange;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical maximum</span></div>";
                    }
                    else {
                        document.getElementById("lang_idx_ndvi_rcp45_max_msg").innerHTML= "<div style='color: orange;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical maximum</span></div>";
                        document.getElementById("lang_idx_ndvi_rcp85_max_msg").innerHTML= "<div style='color: red;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical maximum</span></div>";
                    }
                }
                else {
                    document.getElementById("lang_idx_ndvi_rcp45_max_msg").innerHTML= "<div style='color: orange;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical maximum</span></div>";
                }
            }
            else {
                if (rcp8MAX>curMAX) {
                    document.getElementById("lang_idx_ndvi_rcp85_max_msg").innerHTML= "<div style='color: orange;'><i class='far fa-exclamation-triangle' aria-hidden='true'></i> <span>Historical maximum</span></div>";
                }
            }
            //-------
            document.getElementById("ndvi_rcp45").style.display = "none";
            document.getElementById("ndvi_rcp85").style.display = "none";
            //-------

            return data;
        });
    }

    const basicDialogFooter = <Button type="button" label="OK" onClick={() => setDisplayNDVIDialog(false)} icon="pi pi-check" className="p-button-text" />;

    const toggleInfo = () =>{
        setDisplayNDVIDialog(true);
    }

    var pointerStyle = {
        cursor:"pointer"
    }

    return (
        <div className="p-grid">
            <div className="range-legend">
                <h4 className="range-legend-title">
                    <span id="lang_clim_prec">
                        Normalized Difference Vegetation Index (NDVI)
                    </span>
                     <i
                        className="p-ml-2 fal fa-info-square"
                        aria-hidden="true"
                        onClick={toggleInfo}
                        style={pointerStyle}
                    >
                    </i>
                    <Dialog
                            header="Normalized Difference Vegetation Index (NDVI)"
                            visible={displayNDVIDialog}
                            modal
                            footer={basicDialogFooter} onHide={() => setDisplayNDVIDialog(false)}
                            style={{width:"50vw"}}
                    >

                       <p style={{textAlign:'justify'}}>Effects like deforestation, desertification, and land degradation are directly related to climate change and human activities. Lang coverage as well as qualitative characteristics related to plant and crops health, can be monitored and assessed via the usage of satellite imaging and its analysis for the calculation of metrics like the Normalized Difference Vegetation Index (NDVI). NDVI is used to determine land use (arable crops, permanent crops, forests, deserts) by analyzing the light reflectance of an area in different spectra. In combination with other data, it is also used to estimate crop health and yield production for various cultivations.</p>


                    </Dialog>
                </h4>

                <div className="panel">
                    <div className="panel-title-container">
                        <span id="lang_idx_ndvi_var1">Historical Average</span>
                        <div className="second-panel-title">
                            <span id="lang_idx_ndvi_per1" ></span>
                        </div>
                    </div>
                    <div className="second-panel-subtitle">
                        <span id="lang_idx_ndvi_val1"></span>
                    </div>
                </div>


                <div className="panel">
                    <div className="panel-title-container">
                        <span id="lang_idx_ndvi_var2">Average Prospect</span>
                    </div>
                    <div className="second-panel-title">
                        <span id="lang_idx_ndvi_var2_by1">by 2050</span>
                    </div>
                    <div className="second-panel-subtitle">
                        <span id="lang_idx_ndvi_val2"></span>
                    </div>
                    <div className="second-panel-title">
                        <span id="lang_idx_ndvi_var2_by2">by 2100</span>
                    </div>
                    <div className="second-panel-subtitle">
                        <span id="lang_idx_ndvi_val3"></span>
                    </div>
                </div>

                <div id="ndvi_rcp45" className="panel">
                    <div className="panel-title-container">
                        <div className="first-panel-title">
                            <span id="lang_idx_ndvi_rcp45">Best-case global scenario</span>
                        </div>
                        <span id="lang_idx_ndvi_rcp45name">RCP 4.5</span>
                    </div>
                    <div className="third-panel-subtitle">
                        <span id="lang_idx_ndvi_rcp45_min"></span>
                    </div>
                    <span id="lang_idx_ndvi_rcp45_min_msg" ></span>
                    <div className="third-panel-subtitle">
                        <span id="lang_idx_ndvi_rcp45_max"></span>
                    </div>
                    <span id="lang_idx_ndvi_rcp45_max_msg" ></span>
                </div>

                <div id="ndvi_rcp85" className="panel">
                    <div className="panel-title-container">
                        <div className="fourth-panel-subtitle">
                            <span id="lang_idx_ndvi_rcp85">Worst-case global scenario</span>
                        </div>
                        <span id="lang_prec_rcp85name">RCP 8.5</span>
                    </div>
                    <div className="third-panel-subtitle">
                        <span id="lang_idx_ndvi_rcp85_min"></span>
                    </div>
                    <span id="lang_idx_ndvi_rcp85_min_msg" ></span>
                    <div className="third-panel-subtitle">
                        <span id="lang_idx_ndvi_rcp85_max"></span>
                    </div>
                    <span id="lang_idx_ndvi_rcp85_max_msg" ></span>
                </div>
            </div>


            <div id="spectralindices" className="p-col">
                {climateProspectsChart()}
            </div>
        </div>


    );




}
