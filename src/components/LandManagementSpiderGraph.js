import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useEffect, useState} from "react";



export const LandManagementSpiderGraph = (props) => {

    const [containerName, setContainerName] = useState('');

    useEffect(() => {

        if(props.containerName != undefined){
            setContainerName("lm_sg_"+props.containerName);
        }else{
            setContainerName("lm_sg");
        }
        landManagementGraph()

    },[]);



    const landManagementGraph = () => {


        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        /* Create chart instance */
        var chart = am4core.create(containerName, am4charts.RadarChart);

        if(props.data != undefined){
            chart.data = props.data;
        }

        chart.legend = new am4charts.Legend();

        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "criteria";

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
        valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

        /* Create and configure series */
        var series1 = chart.series.push(new am4charts.RadarSeries());
        series1.dataFields.valueY = "slm1";
        series1.dataFields.categoryX = "criteria";
        series1.name = "LM Sustainability Assessment";
        series1.strokeWidth = 2;
        series1.stroke = am4core.color("#46a084");
        series1.fill = am4core.color("#46a084");
        //series1.fillOpacity = 0.2;

        var series2 = chart.series.push(new am4charts.RadarSeries());
        series2.dataFields.valueY = "slm2";
        series2.dataFields.categoryX = "criteria";
        series2.name = "Zero Line (neither improve nor degrade)";
        series2.strokeWidth = 2;
        series2.stroke = am4core.color("#fcdd90");
        series2.fill = am4core.color("#fcdd90");
        //series2.fillOpacity = 0.2;

        chart.legend.itemContainers.template.paddingTop = 30;
    }

    return (
        <div>{
            containerName?
            <div id={containerName} className="landmanagementspider">
                {landManagementGraph()}
            </div>
                :console.log()
        }
        </div>
    );

}
