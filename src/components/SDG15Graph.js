import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useEffect, useState} from "react";


export const SDG15Graph = (props) => {

    useEffect(() => {
        sdgChart()
    },[props.sdg15Data]);

    const sdgChart = () => {

        /**
         * ---------------------------------------
         * This demo was created using amCharts 4.
         *
         * For more information visit:
         * https://www.amcharts.com/
         *
         * Documentation is available at:
         * https://www.amcharts.com/docs/v4/
         * ---------------------------------------
         */

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("sdg15", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = props.sdg15Data;

        chart.colors.step = 2;
        chart.padding(30, 30, 10, 30);
        chart.legend = new am4charts.Legend();

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;
        valueAxis.calculateTotals = true;
        valueAxis.renderer.minWidth = 50;
        valueAxis.title.text = "Percent";
        valueAxis.renderer.labels.template.adapter.add("text", function(text) {
            return text + "%";
        });


        var series1 = chart.series.push(new am4charts.ColumnSeries());
        series1.columns.template.width = am4core.percent(80);
        series1.columns.template.tooltipText = "{name} in {valueY.value} ha";

        series1.name = "Degradation";
        series1.stroke = am4core.color("#d43333");
        series1.fill = am4core.color("#d43333");

        series1.dataFields.categoryX = "category";
        series1.dataFields.valueY = "degradation";
        series1.dataFields.valueYShow = "totalPercent";
        series1.dataItems.template.locations.categoryX = 0.5;
        series1.stacked = true;
        series1.tooltip.pointerOrientation = "vertical";

        var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
        bullet1.interactionsEnabled = false;
        bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
        bullet1.label.fill = am4core.color("#ffffff");
        bullet1.locationY = 0.5;

        var series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.columns.template.width = am4core.percent(80);
        series2.columns.template.tooltipText = "{name} in {valueY.value} ha";
        series2.name = "Stable";
        series2.stroke = am4core.color("#fcdd90");
        series2.fill = am4core.color("#fcdd90");
        series2.dataFields.categoryX = "category";
        series2.dataFields.valueY = "stable";
        series2.dataFields.valueYShow = "totalPercent";
        series2.dataItems.template.locations.categoryX = 0.5;
        series2.stacked = true;
        series2.tooltip.pointerOrientation = "vertical";

        var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
        bullet2.interactionsEnabled = false;
        bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
        bullet2.locationY = 0.5;
        bullet2.label.fill = am4core.color("#666666");

        var series3 = chart.series.push(new am4charts.ColumnSeries());
        series3.columns.template.width = am4core.percent(80);
        series3.columns.template.tooltipText = "{name} in {valueY.value} ha";
        series3.name = "Improvement";
        series3.stroke = am4core.color("#398e3b");
        series3.fill = am4core.color("#398e3b");
        series3.dataFields.categoryX = "category";
        series3.dataFields.valueY = "improvement";
        series3.dataFields.valueYShow = "totalPercent";
        series3.dataItems.template.locations.categoryX = 0.5;
        series3.stacked = true;
        series3.tooltip.pointerOrientation = "vertical";

        var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
        bullet3.interactionsEnabled = false;
        bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
        bullet3.locationY = 0.5;
        bullet3.label.fill = am4core.color("#ffffff");

    }

    return (
        <div id="sdg15" className="p-col">

        </div>

    );

}
