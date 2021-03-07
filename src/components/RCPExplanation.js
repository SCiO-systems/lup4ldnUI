import React, {useEffect, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export const RCPExplanation = (props) => {

    useEffect(() => {
        rcpChart()
    },[]);

    const rcpChart = () =>{
        let DATA_URL = "assets/demo/data/rcp_scenarios.csv";

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("rcp", am4charts.XYChart);


        // Add data

        chart.data = [{}];
        chart.dateFormatter.dateFormat = "yyyy";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.opposite = true;

        // Create series
        var series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = "col2";
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
        series2.dataFields.valueY = "col1";
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


        var lastTime =  new Date(2100, 0, 0).getTime();

        var lTime = new Date(2098, 0, 0).getTime();
        var ldate = new Date(lTime);

        var sTime = new Date(2022, 0, 0).getTime();
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

                if (range.value > ldate) {
                    document.getElementById("rcp_rcp45").style.display = "block";
                    document.getElementById("rcp_rcp85").style.display = "none";
                }
                else {

                    if (range.value < sdate) {
                        document.getElementById("rcp_rcp45").style.display = "none";
                        document.getElementById("rcp_rcp85").style.display = "block";
                    }
                    else {
                        document.getElementById("rcp_rcp45").style.display = "none";
                        document.getElementById("rcp_rcp85").style.display = "none";
                    }
                }
            }
            else {
                range.value = mdate;

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

            document.getElementById("rcp_rcp45").style.display = "none";
            document.getElementById("rcp_rcp85").style.display = "none";
            //-------
            return data;
        });
    }

    return (

        <div>
            <div className="rcp-header p-grid">
                    <div className="rcp-basic-content p-col-fixed" style={{width:"400px"}}>
                        <span id="lang_rcp_info1">
                            <p><h4>Representative Concentration Pathways (RCPs)</h4></p>
                            <p style={{textAlign:'justify'}}>
                                Based on historical data analysis and the evaluation of
                                various parameters affecting climate change, Climate and Integrated Assessment
                                modelers collaborate on the production of four global future development scenarios
                                called Representative Concentration Pathways (RCPs).
                            </p>
                            <p style={{textAlign:'justify'}}>
                                The scenarios build on climate models along with different social, economic and
                                policy factors to project different variables into the future, reaching up to year
                                2100.
                            </p>
                            <p style={{textAlign:'justify'}}>
                                LUP4LDN presents this trajectory of core variables in an optimistic (RCP4.5) and a
                                pessimistic (RCP8.5) global scenario.
                            </p>
                            <div>
                                <p><h5>Move slider to explore different scenarios <i
                                    className="fad fa-chevron-double-right"></i></h5></p>
                            </div>
                        </span>
                    </div>

                    <div className="p-col">
                        <div className="p-grid p-justify-center">
                            <h3 className="rcp-chart-header p-mt-4">GtCO<sub>2</sub></h3>
                        </div>
                        <div id="rcp"></div>
                        <div className="rcp-chart-header-align">
                            <span
                                className="rcp-selector">
                                <span id="lang_select_rcp"></span>
                            </span>
                        </div>
                    </div>
            </div>

            <div id="rcp_rcp45" className="rcp-panel">
                <div className="rcp-panel-subtitle">
                    <div className="rcp-panel-color-1">
                        <span id="lang_rcp_rcp45" style={{color:'#46a084', fontWeight:'600', fontSize:'20px'}}>
                            BEST-CASE GLOBAL SCENARIO
                        </span>
                    </div>
                    <span className="rcp-big-font">
                        <span id="lang_rcp_rcp45name" style={{fontWeight:'600', fontSize:'18px'}}>RCP 4.5</span>
                    </span>
                </div>
                <div><span id="lang_rcp_info2">
                    <p style={{textAlign:'justify'}}>Emissions peak around mid-century at around 30% higher than 2000 levels, with a rapid decline during the next 30 years and a stabilisation at levels around 30% of those in 2000. CO<sub>2</sub> concentration follows current trends until 2040 to about 520 ppm in 2070, with a decline in increase rate afterwards. Population peaks around 9 billion by 2070 with a subsequent period of slow decline until the end of the century, while global economic growth is moderate, with an accelerating rate near the tail end (from 2080). Oil consumption is fairly constant until 2100, while renewable energy sources and nuclear power have a more prominent role. Interestingly, cropping and grassland areas decline, while reforestation increases.</p>
                    </span>
                </div>
            </div>


    <div id="rcp_rcp85" className="rcp-panel">
        <div className="rcp-panel-subtitle">
            <div className="rcp-panel-color-2">
                <span id="lang_rcp_rcp85" style={{color:'#dc3545', fontWeight:'600', fontSize:'20px'}}>
                    WORST-CASE GLOBAL SCENARIO
                </span>
            </div>
            <span className="rcp-big-font"><span id="lang_rcp_rcp85name" style={{fontWeight:'600', fontSize:'18px'}}>RCP 8.5</span></span>
        </div>
        <div><span id="lang_rcp_info3">
            <p>Emissions continue to increase rapidly through the early and mid-parts of the century. By 2100 annual emissions have stabilised at just under 130 gigatons of carbon compared to around 38 gigatons in 2000. Concentrations of CO<sub>2</sub> in the atmosphere accelerate and reach 950 ppm by 2100 and continue increasing for another 100 years. Population growth is high, reaching 12 billion by the century’s end. This is at the high end of the UN projections. Economic growth is almost linear throughout the projection but assumes much lower incomes and per capita growth in developing countries. This scenario is highly energy intensive with total consumption continuing to grow throughout the century reaching well over 3 times current levels. Oil use grows rapidly until 2070 after which it drops even more quickly. Coal provides the bulk of the large increase in energy consumption. Land use follows current trends, i.e. crop and grass areas increasing and forest area decreasing.</p>
        </span>
        </div>
    </div>
        </div>

    );

}
