import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";

import {Steps} from "primereact/components/steps/Steps";
import {InputText} from "primereact/components/inputtext/InputText";
import CustomerService from "../service/CustomerService";
import ProductService from "../service/ProductService";


import ls from 'local-storage'

//amcharts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Button} from "primereact/components/button/Button";
import {Glowglobe} from "./Glowglobe";
import {InputTextarea} from "primereact/components/inputtextarea/InputTextarea";
import QvantumService from "../service/QvantumService";



export const Geography = () => {

    const history = useHistory();

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [enableStep2, setEnableStep2] = useState(true);

    const [titleValue, setTitleValue] = useState('');
    const [titleOKValue, setTitleOKValue] = useState(false);
    const [acronymValue, setAcronymValue] = useState('');
    const [acronymOKValue, setAcronymOKValue] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState('');
    const [glowGlobeValue, setGlowglobeValue] = useState(false);

    const [step1hidden, setStep1Hidden] = useState(false);
    const [step2hidden, setStep2Hidden] = useState(false);
    const [step3hidden, setStep3Hidden] = useState(true);
    const [isFormComplete, setIsFormComplete] = useState(true);

    const [region,setRegion] = useState({"type":"FeatureCollection","features":[
            {"type":"Feature","id":"TUN","properties":{"name":"Tunisia"},"geometry":{"type":"Polygon","coordinates":[[[9.48214,30.307556],[9.055603,32.102692],[8.439103,32.506285],[8.430473,32.748337],[7.612642,33.344115],[7.524482,34.097376],[8.140981,34.655146],[8.376368,35.479876],[8.217824,36.433177],[8.420964,36.946427],[9.509994,37.349994],[10.210002,37.230002],[10.18065,36.724038],[11.028867,37.092103],[11.100026,36.899996],[10.600005,36.41],[10.593287,35.947444],[10.939519,35.698984],[10.807847,34.833507],[10.149593,34.330773],[10.339659,33.785742],[10.856836,33.76874],[11.108501,33.293343],[11.488787,33.136996],[11.432253,32.368903],[10.94479,32.081815],[10.636901,31.761421],[9.950225,31.37607],[10.056575,30.961831],[9.970017,30.539325],[9.48214,30.307556]]]}}
        ]});


    const [customer1, setCustomer1] = useState(null);
    const [customer2, setCustomer2] = useState(null);
    const [customer3, setCustomer3] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        ls.set("regionDetails",{});
        const customerService = new CustomerService();
        const productService = new ProductService();
        productService.getProductsWithOrdersSmall().then(data => setProducts(data));
        customerService.getCustomersMedium().then(data => { setCustomer1(data); setLoading1(false) });
        customerService.getCustomersLarge().then(data => { setCustomer2(data); setLoading2(false) });
        customerService.getCustomersMedium().then(data => setCustomer3(data));

        initializeMap();
    }, []);

    const onUpload = () => {
        console.log("upload");
    }

    const interactiveItems = [
        {
            label: 'Select Country',
            command: (event) => {
                setStep1Hidden(false);
                setStep2Hidden(true);
                setStep3Hidden(true);
            }
        },
        {
            label: 'Define the ROI',
            command: (event) => {
                setStep1Hidden(true);
                setStep2Hidden(false);
                setStep3Hidden(true);
            }
        }
    ];

    const initializeMap = () =>{

        setStep2Hidden(!step2hidden);
        am4core.useTheme(am4themes_animated);
        const map = am4core.create("chartdiv", am4maps.MapChart);
        map.geodata = am4geodata_worldHigh;
        map.projection = new am4maps.projections.Miller();

        var worldSeries = map.series.push(new am4maps.MapPolygonSeries());
        worldSeries.useGeodata = true;

        worldSeries.exclude = ["AQ"];

        var polygonTemplate = worldSeries.mapPolygons.template;
        polygonTemplate.tooltipHTML = "<div>{name}</div>";
        polygonTemplate.fill = am4core.color("#666666"); //chart.colors.getIndex(0);
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.togglable = true;

        // Hover state

        var ss = polygonTemplate.states.create("active");
        ss.properties.fill = am4core.color("#5ccaa7");

        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#6b9ed6");


        // Small map
        map.smallMap = new am4maps.SmallMap();
        // Re-position to top right (it defaults to bottom left)
        map.smallMap.align = "right";
        map.smallMap.valign = "top";

        map.smallMap.series.push(worldSeries);

        map.smallMap.background.stroke = am4core.color("#666666");
        map.smallMap.background.fill = am4core.color("white");
        map.smallMap.background.fillOpacity = 1;

        // Remove the outline from smallMap countries
        var smallSeries = map.smallMap.series.getIndex(0);
        smallSeries.mapPolygons.template.stroke = smallSeries.mapPolygons.template.fill;
        smallSeries.mapPolygons.template.strokeWidth = 1;

        // Zoom control
        map.zoomControl = new am4maps.ZoomControl();

        var homeButton = new am4core.Button();
        homeButton.events.on("hit", function(){
            map.goHome();
        });

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = map.zoomControl;
        homeButton.insertBefore(map.zoomControl.plusButton);

        let lastSelected;

        polygonTemplate.events.on("hit", function(ev) {

            if (lastSelected) {
                // This line serves multiple purposes:
                // 1. Clicking a country twice actually de-activates, the line below
                //    de-activates it in advance, so the toggle then re-activates, making it
                //    appear as if it was never de-activated to begin with.
                // 2. Previously activated countries should be de-activated.
                lastSelected.isActive = false;
            }
            ev.target.series.chart.zoomToMapObject(ev.target);
            if (lastSelected !== ev.target) {
                lastSelected = ev.target;
            }

            if((ev.target.dataItem.dataContext.id === "TN")||
                (ev.target.dataItem.dataContext.id === "BF"))
            {
                ls.set("project_info",
                    {
                        iso_code_2: ev.target.dataItem.dataContext.id,
                        country: ev.target.dataItem.dataContext.name,
                        projectTitle: titleValue,
                        projectAcronym: acronymValue,
                        projectDescription: descriptionValue
                    }
                )

                setSelectedCountry(ev.target.dataItem.dataContext.id);
                setEnableStep2(false);

            }else{
                setEnableStep2(true);
            }



        })

    }

    const saveAndClose = () =>{
        let path = 'invite';
        history.push(path);
    }

    const updateSaveButtonState = (value,component) =>{
        setIsFormComplete(true);
        if(component === "acronym"){
            if(value.length > 0){
                setAcronymOKValue(true);
            }else{
                setIsFormComplete(true);
                setAcronymOKValue(false);
            }
        }else if(component === "title"){
            if(value.length > 0){
                setTitleOKValue(true);
            }else{
                setIsFormComplete(true);
                setTitleOKValue(false);
            }
        }
        if((acronymOKValue == true)&&(titleOKValue == true)){
            setIsFormComplete(false);
        }else{
            setIsFormComplete(true);
        }
    }

    //Glowglobe Callback
    const chosenRegion = (value) => {
        const qvantumService = new QvantumService();
        qvantumService.calculateRegionData(value).then(
            (data) =>{
                ls.set("regionDetails",value);
                ls.set("regionLandCoverTypes",data);
            }
        )
    }

    return (
        <div className="layout-dashboard">
            <div className="card p-shadow-8 card-w-title">
                <h5>PROJECT DETAILS</h5>
                <div className="p-col-12">
                    <span className="p-float-label">
                        <InputText
                            id="title_in"
                            value={titleValue}
                            onChange={(e) => {
                                updateSaveButtonState(e.target.value,"title");
                                setTitleValue(e.target.value)
                            }}
                            className="p-invalid p-d-block "
                            style={{width:"100%"}}
                        />
                        <label htmlFor="title_in">PROJECT TITLE</label>
                    </span>
                    <small id="username2-help" className="p-error p-d-block">* Field is mandatory</small>
                </div>

                <div className="p-col-12">
                    <span className="p-float-label">
                        <InputText
                            id="acronym_in"
                            value={acronymValue}
                            onChange={(e) => {
                                updateSaveButtonState(e.target.value,"acronym");
                                setAcronymValue(e.target.value);
                            }
                            }
                            className="p-invalid p-d-block "
                            style={{width:"100%"}}
                        />
                        <label htmlhtmlFor="acronym_in">PROJECT ACRONYM</label>
                    </span>
                    <small id="username2-help" className="p-error p-d-block">* Field is mandatory</small>
                </div>

                <div className="p-col-12">
                    <span className="p-float-label">
                    <InputTextarea id="description_in"
                                   rows={5}
                                   cols={30}
                                   value={descriptionValue}
                                   onChange={(e) => setDescriptionValue(e.target.value)}
                                   autoResize
                                   style={{width:"100%"}}
                    />
                        <label htmlhtmlFor="description_in">PROJECT DESCRIPTION</label>
                    </span>
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card card-w-title p-shadow-8">
                        <h5>REGION OF INTEREST</h5>
                        <Steps model={interactiveItems}
                               activeIndex={activeIndex}
                               onSelect={(e) => setActiveIndex(e.index)}
                               readOnly={true}
                        />
                        <div id="step_1" hidden={step1hidden} className="p-col-12 p-mt-4">
                            <div>
                                <span><strong>* Currently supported countries: Tunisia & Burkina Faso</strong></span>
                            </div>
                            <div id="chartdiv"></div>
                            <div className="p-mt-4 p-grid  p-justify-end">
                                <Button
                                    label="Save & Continue"
                                    className="p-button-raised"
                                    disabled={enableStep2}
                                    onClick={() => {
                                        setActiveIndex(1);
                                        setStep1Hidden(true);
                                        setStep2Hidden(!step2hidden);
                                    }}
                                />
                            </div>
                        </div>
                        <div id="step_2" hidden={step2hidden} className="p-col-12 p-mt-4">
                            <div className="p-grid p-justify-between">
                                <Glowglobe
                                    toolbar="marker"
                                    styleEditor={false}
                                    zoom={3}
                                    regionLocked={true}
                                    country={selectedCountry}
                                    defaultAdminLevel = '1'
                                    glowglobeOutput = {chosenRegion}
                                />
                                <Button
                                    icon="fad fa-step-backward"
                                    label="Back"
                                    className="p-button-raised p-button-secondary"
                                    disabled={enableStep2}
                                    onClick={() => {
                                        setActiveIndex(0);
                                        setStep1Hidden(!step1hidden);
                                        setStep2Hidden(!step2hidden);
                                    }}
                                />
                                <Button
                                    label="Save & Close"
                                    className="p-button-raised"
                                    disabled={isFormComplete}
                                    onClick={() => {
                                        setActiveIndex(0);
                                        setStep1Hidden(!step1hidden);
                                        setStep2Hidden(!step2hidden);
                                        saveAndClose();
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
