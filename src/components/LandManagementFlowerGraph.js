import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useEffect, useState} from "react";



export const LandManagementFlowerGraph = (props) => {

    const [containerName, setContainerName] = useState('');

    useEffect(() => {
        landManagementGraph()
    },[props.data]);



    const landManagementGraph = () => {

        var data = [];

        if(props.data !== undefined){
            data = props.data.map(
                (criterion) =>{

                    var item = {}

                    item.category = criterion.criteria;
                    if(item.category ==="Soil"){
                        item.value1 = -1;
                    }else if(item.category ==="Water"){
                        item.value1 = 1;
                    }else if(item.category ==="Biodiversity"){
                        item.value1 = 0;
                    }else if(item.category ==="Climate Change\nresilience"){
                        item.value1 = 1;
                    }else if(item.category ==="Production"){
                        item.value1 = 1;
                    }else if(item.category ==="Economic\nviability"){
                        item.value1 = -1;
                    }else if(item.category ==="Food Security"){
                        item.value1 = -1;
                    }else if(item.category ==="Equality of\nopportunity"){
                        item.value1 = -3;
                    }

                    item.value2 = criterion.slm1;
                    return item;
                }
            )
        }

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("flowergraph", am4charts.RadarChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = data;

        chart.padding(20, 20, 20, 20);

        chart.legend = new am4charts.Legend();

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = -3;

        var series1 = chart.series.push(new am4charts.RadarColumnSeries());

        series1.columns.template.width = am4core.percent(100);
        series1.name = "Current LU system";
        series1.dataFields.categoryX = "category";
        series1.dataFields.valueY = "value1";
        series1.stroke = am4core.color("#ffffff");
        series1.fill = am4core.color("#46a084");

        var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.columns.template.width = am4core.percent(100);
        series2.name = "LU system impementing the selected SLM";
        series2.dataFields.categoryX = "category";
        series2.dataFields.valueY = "value2";
        series2.stroke = am4core.color("#ffffff");


        chart.seriesContainer.zIndex = -1;
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        chart.scrollbarX.exportable = false;
    }

    return (
        <div id="flowergraph" className="landmanagementspider">

        </div>
    );

}
