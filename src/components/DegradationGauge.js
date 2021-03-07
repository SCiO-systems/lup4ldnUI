import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useEffect, useState} from "react";



export const DegradationGauge = (props) => {

    useEffect(() => {
        landDegradationuChart()
    },[props.gaugeValues]);



    const landDegradationuChart = () => {

        var TOTAL_AREA = 0;
        var LDN_SCORE = 0;
        if(props.gaugeValues !== undefined){
            TOTAL_AREA = props.gaugeValues[0];
            LDN_SCORE = props.gaugeValues[1];
        }

        //console.log(props.gaugeValues.totalArea);
        //console.log(TOTAL_AREA);

        // Themes begin
        am4core.useTheme(am4themes_animated);
// Themes end

        var chartMax = TOTAL_AREA / 1000;
        var chartMin = - chartMax;
        var chartStable = 0.025 * chartMax;

        var data = {
            score: (LDN_SCORE / 1000),
            gradingData: [
                {
                    title: "DEGRADATION",
                    color: "#d43333",
                    lowScore: chartMin,
                    highScore: -chartStable
                },
                {
                    title: "STABLE",
                    color: "#fcdd90",
                    lowScore: -chartStable,
                    highScore: chartStable
                },
                {
                    title: "IMPROVEMENT",
                    color: "#398e3b",
                    lowScore: chartStable,
                    highScore: chartMax
                }
            ]
        };

        /**
         Grading Lookup
         */
        function lookUpGrade(lookupScore, grades) {
            // Only change code below this line
            for (var i = 0; i < grades.length; i++) {
                if (
                    grades[i].lowScore < lookupScore &&
                    grades[i].highScore >= lookupScore
                ) {
                    return grades[i];
                }
            }
            return null;
        }

// create chart
        var chart = am4core.create("landdegradation", am4charts.GaugeChart);
        chart.hiddenState.properties.opacity = 0;
        chart.fontSize = 16;
        chart.innerRadius = am4core.percent(80);
        chart.resizable = true;

        /**
         * Normal axis
         */

        var axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = chartMin;
        axis.max = chartMax;
        axis.strictMinMax = true;
        axis.renderer.radius = am4core.percent(80);
        axis.renderer.inside = true;
        axis.renderer.line.strokeOpacity = 0.1;
        axis.renderer.ticks.template.disabled = true;
        axis.renderer.ticks.template.strokeOpacity = 1;
        axis.renderer.ticks.template.strokeWidth = 5;
        axis.renderer.ticks.template.length = 5;
        axis.renderer.grid.template.disabled = true;
        axis.renderer.labels.template.radius = am4core.percent(15);
        axis.renderer.labels.template.fontSize = "0em";


        /**
         * Axis for ranges
         */

        var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
        axis2.min = chartMin;
        axis2.max = chartMax;
        axis2.strictMinMax = true;
        axis2.renderer.labels.template.disabled = true;
        axis2.renderer.ticks.template.disabled = true;
        axis2.renderer.grid.template.disabled = false;
        axis2.renderer.grid.template.opacity = 0.5;
        axis2.renderer.labels.template.bent = true;
        axis2.renderer.labels.template.fill = am4core.color("#000");
        axis2.renderer.labels.template.fontWeight = "bold";
        axis2.renderer.labels.template.fillOpacity = 0.6;



        /**
         Ranges
         */

        for (let grading of data.gradingData) {
            var range = axis2.axisRanges.create();
            range.axisFill.fill = am4core.color(grading.color);
            range.axisFill.fillOpacity = 0.8;
            range.axisFill.zIndex = -1;
            range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
            range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
            range.grid.strokeOpacity = 0;
            range.stroke = am4core.color(grading.color).lighten(-0.1);
            range.label.inside = true;
            range.label.text = grading.title.toUpperCase();
            range.label.inside = true;
            range.label.location = 0.5;
            range.label.inside = true;
            range.label.radius = am4core.percent(10);
            range.label.paddingBottom = -5; // ~half font size
            range.label.fontSize = "0.9em";
        }

        var matchingGrade = lookUpGrade(data.score, data.gradingData);

        /**
         * Label 1
         */

        var label = chart.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = "2em";
        label.x = am4core.percent(50);
        label.paddingBottom = 15;
        label.horizontalCenter = "middle";
        label.verticalCenter = "bottom";
//label.dataItem = data;
        label.text = data.score.toFixed(1);
//label.text = "{score}";
        label.fill = am4core.color(matchingGrade.color);

        /**
         * Label 2
         */

        var label2 = chart.radarContainer.createChild(am4core.Label);
        label2.isMeasured = false;
        label2.fontSize = "1.1em";
        label2.horizontalCenter = "middle";
        label2.verticalCenter = "bottom";
        label2.text = matchingGrade.title.toUpperCase();
        label2.fill = am4core.color(matchingGrade.color);


        /**
         * Hand
         */

        var hand = chart.hands.push(new am4charts.ClockHand());
        hand.axis = axis2;
        hand.innerRadius = am4core.percent(55);
        hand.startWidth = 8;
        hand.pin.disabled = true;
        hand.value = data.score;
        hand.fill = am4core.color("#444");
        hand.stroke = am4core.color("#000");

        hand.events.on("positionchanged", function(){
            label.text = Math.abs(axis2.positionToValue(hand.currentPosition)).toFixed(1) + " Kha";
            var value2 = axis.positionToValue(hand.currentPosition);
            var matchingGrade = lookUpGrade(axis.positionToValue(hand.currentPosition), data.gradingData);
            label2.text = matchingGrade.title.toUpperCase();
            label2.fill = am4core.color(matchingGrade.color);
            label2.stroke = am4core.color(matchingGrade.color);
            label.fill = am4core.color(matchingGrade.color);
        })

    }

    return (

        <div id="landdegradation">
        </div>


    );

}
