import React, { useState, useEffect, useRef } from 'react';
import {Glowglobe} from "./Glowglobe";
import {Fieldset} from "primereact/components/fieldset/Fieldset";

import { useHistory } from "react-router-dom";

import {Slider} from "primereact/components/slider/Slider";
import {Button} from "primereact/components/button/Button";
import QvantumService from "../service/QvantumService";

import {LandCoverGraph} from "./LandCoverGraph";
import {SoilOrganicCarbonGraph} from "./SoilOrganicCarbonGraph";
import {NdviGraph} from "./NdviGraph";
import {SDG15Graph} from "./SDG15Graph";
import {BootstrapHistoryTabs} from "./BootstrapHistoryTabs";
import {DataUploadSelection} from "./DataUploadSelection";

import ls from 'local-storage'
import {DataUploadSelectionSDG} from "./DataUploadSelectionSDG";
import { Dialog } from 'primereact/dialog';




export const History = () => {

    const history = useHistory();

    const [activeIndex,setActiveIndex] = useState(1);
    const [key, setKey] = useState('land_cover');
    const [tabIndex, setTabIndex] = useState(1);

    const [landCoverData, setLandCoverData] = useState();
    const [soilCarbonData, setSoilCarbonData] = useState();
    const [ndviData, setNdviData] = useState();
    const [sdg15Data, setsdg15Data] = useState();

    const [layersData, setLayersData] = useState(null);

    const [step1hidden, setStep1Hidden] = useState(false);
    const [step2hidden, setStep2Hidden] = useState(true);
    const [step3hidden, setStep3Hidden] = useState(true);
    const [step4hidden, setStep4Hidden] = useState(true);
    const [sliderValue, setSliderValue] = useState('2018');
    const [endSliderValue, setEndSliderValue] = useState('2018');
    const [collapsedMap, setCollapsedMap] = useState(true);
    const [focusAreaLayer,setFocusAreaLayer] = useState(null);

    const [dataUploadSelection, setDataUploadSelection] = useState(false);
    const [dataLDUploadSelection, setLDDataUploadSelection] = useState(true);

    const [defaultDataTag, setDefaultDataTagValue] = useState({
        tab_1:[
            {
                label:"ESA CCI Land Cover time-series",
                url:"http://www.esa-landcover-cci.org/"
            },
            {
                label:"ESA C3S Global Land Cover Product",
                url:"https://climate.esa.int/en/projects/land-cover/news/new-release-c3s-global-land-cover-products-2016-2017-2018-consistent-cci-1992-2015-map-series/"
            }

        ],
        tab_2:[{label:"ISRIC - SoilGrids",url:"https://www.soilgrids.org/"}],
        tab_3:[{label:"MODIS Vegetation Indices",url:"https://lpdaac.usgs.gov/products/mod13q1v006/"}],
        tab_4:[{label:"Trends.Earth",url:"https://github.com/ConservationInternational/trends.earth"}]
    });

    const [noNewProject, setNoNewProject] = useState(false);




    useEffect(() => {

        const projectInfo = ls.get("project_info");
        const regionDetails = ls.get("regionDetails");
        if(regionDetails
            && Object.keys(regionDetails).length === 0 && regionDetails.constructor === Object){
            setNoNewProject(true);

        }else{

            const qvantumService = new QvantumService();

            qvantumService.getHistoricalStatistics(regionDetails).then(

                (data) => {
                    setSoilCarbonData(data[2]);
                    setLandCoverData(data[0].landCover);
                    setNdviData(data[1].ndvi);
                    setsdg15Data(data[3].sdg15)
                }

            );


            var country = regionDetails.country;
            var adminLevel = regionDetails.administrationLevel;
            qvantumService.getFullGADMPolygon(regionDetails.chosenPoint,adminLevel).then(
                (response)=>{
                    var requestedCountry = null
                    if(projectInfo.iso_code_2 === "TN"){
                        requestedCountry = "TYN"
                    }else if (projectInfo.iso_code_2 === "BF"){
                        requestedCountry = "BFA"
                    }

                    var defaultYear = 2018;
                    qvantumService.getLayerData(requestedCountry,defaultYear).then(
                        layers =>{
                            layers[0].administrationLevel = '1';
                            layers[0].point = response;
                            setLayersData(layers);
                        }
                    )
                }
            )

        }
        //console.log(regionDetails.chosenPoint.geometry);
    }, []);

    const loadLayer = (activeIndex)=>{
        if(activeIndex === 1){
            let tempLayers = layersData;
            tempLayers.forEach(
                function(item){
                    if(item.label==="Land Cover"){
                        item.visible = true;
                    }else{
                        item.visible = false;
                    }
                }
            )
            setActiveIndex(1);
            setLayersData([...tempLayers]);
        }else if(activeIndex === 2){
            let tempLayers = layersData;
            tempLayers.forEach(
                function(item){
                    if(item.label==="Soil Carbon"){
                        item.visible = true;
                    }else{
                        item.visible = false;
                    }
                }
            )
            setActiveIndex(2);
            setLayersData([...tempLayers]);
        }else if(activeIndex === 3){
            let tempLayers = layersData;
            tempLayers.forEach(
                function(item){
                    if(item.label==="NDVI"){
                        item.visible = true;
                    }else{
                        item.visible = false;
                    }
                }
            )
            setActiveIndex(3);
            setLayersData([...tempLayers]);
        }else if(activeIndex === 4){
            let tempLayers = layersData;
            tempLayers.forEach(
                function(item){
                    if(item.label==="SDG"){
                        item.visible = true;
                    }else{
                        item.visible = false;
                    }
                }
            )
            setActiveIndex(4);
            setLayersData([...tempLayers]);
        }
    }


    const chosenTabValue = (value) => {
        if(value === "land_cover")
        {
            setStep1Hidden(false);
            setStep2Hidden(true);
            setStep3Hidden(true);
            setStep4Hidden(true);
            setDataUploadSelection(false);
            setLDDataUploadSelection(true);
            setKey("land_cover");
            setTabIndex(1);
            loadLayer(1);
            setCollapsedMap(false);
        }else if(value === "soc")
        {
            setStep1Hidden(true);
            setStep2Hidden(false);
            setStep3Hidden(true);
            setStep4Hidden(true);
            setDataUploadSelection(false);
            setLDDataUploadSelection(true);
            setKey("soc");
            setTabIndex(2);
            loadLayer(2);
            setCollapsedMap(false);
        }else if(value === "ndvi")
        {
            setStep1Hidden(true);
            setStep2Hidden(true);
            setStep3Hidden(false);
            setStep4Hidden(true);
            setDataUploadSelection(false);
            setLDDataUploadSelection(true);
            setKey("ndvi");
            setTabIndex(3);
            loadLayer(3);
            setCollapsedMap(false);
        }else if(value === "sdg15")
        {
            setStep1Hidden(true);
            setStep2Hidden(true);
            setStep3Hidden(true);
            setStep4Hidden(false);
            setDataUploadSelection(true);
            setLDDataUploadSelection(false);
            setKey("sdg15");
            setTabIndex(4);
            loadLayer(4);
            setCollapsedMap(false);
        }
    }

    const updateLayer = (e,)=>{

        const projectInfo = ls.get("project_info");
        const regionDetails = ls.get("regionDetails");

        var country = regionDetails.country;
        var adminLevel = regionDetails.administrationLevel;

        const qvantumService = new QvantumService();
        qvantumService.getFullGADMPolygon(regionDetails.chosenPoint,adminLevel).then(
            (response)=>{
                var requestedCountry = null
                if(projectInfo.iso_code_2 === "TN"){
                    requestedCountry = "TYN"
                }else if (projectInfo.iso_code_2 === "BF"){
                    requestedCountry = "BFA"
                }

                qvantumService.getLayerData(requestedCountry,parseInt(e)).then(
                    layers =>{

                        layers[tabIndex-1].administrationLevel = '1';
                        layers[tabIndex-1].point = response;
                        layers[tabIndex-1].visible = true;
                        setLayersData(layers);
                    }
                )
            }
        )
        setEndSliderValue(parseInt(e));
        //parseInt(setSliderValue(e));
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Create New Project" icon="fad fa-file-plus" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }

    const onHide = (name) => {
        let path = 'newproject';
        history.push(path);

    }


    return (
        <div className="layout-dashboard">
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card card-w-title p-shadow-8">
                        <BootstrapHistoryTabs selectedValue={chosenTabValue} activateTab={key}/>

                        <div hidden={dataUploadSelection}>
                            <DataUploadSelection defaultDataTag={defaultDataTag} tabIndex={tabIndex} />
                        </div>
                        <div hidden={dataLDUploadSelection}>
                            <DataUploadSelectionSDG defaultDataTag={defaultDataTag} tabIndex={tabIndex} />
                        </div>

                        <div className="p-grid p-mt-2 p-col-12">
                            <Fieldset
                                legend="Map"
                                toggleable
                                className="p-col-12 p-mt-4"
                                collapsed={collapsedMap}
                                onExpand={()=>loadLayer(activeIndex)}
                            >
                                <div hidden={step3hidden}>
                                    <h5>Selected Year: {sliderValue}</h5>
                                    <Slider  min={2001}
                                         max={2018}
                                         value={sliderValue}
                                         onChange={(e) =>
                                         {
                                             setSliderValue(parseInt(e.value));
                                         }
                                         }
                                         onSlideEnd={(e)=>
                                             updateLayer(e.value)
                                         }
                                         step={1} />
                                </div>

                                    <Glowglobe
                                        toolbar="no"
                                        styleEditor={false}
                                        zoom={3}
                                        layers={layersData}
                                    />

                            </Fieldset>
                        </div>

                        <div id="step_1" hidden={step1hidden} className="p-mt-4 p-col-12">
                            <div className="p-mt-2">
                                <h5>Selected Year: {sliderValue}</h5>
                                <Slider  min={2001}
                                         max={2018}
                                         value={sliderValue}
                                         onChange={(e) =>
                                            {
                                                setSliderValue(parseInt(e.value));
                                            }
                                         }
                                         onSlideEnd={(e)=>
                                             updateLayer(e.value)
                                         }
                                         step={1} />
                            </div>
                            <div className="p-justify-center p-mt-5">
                                <h5>LU Types in ROI</h5>
                                {
                                    landCoverData?
                                        <LandCoverGraph  year={endSliderValue} landCoverData={landCoverData}/>
                                        :console.log()
                                }

                            </div>
                            <div className="p-mt-4 p-grid  p-justify-end">
                                <Button
                                    label="Next"
                                    className="p-button-raised"
                                    icon="fad fa-step-forward"
                                    iconPos="right"
                                    onClick={() => {
                                        setKey("soc")
                                        setStep1Hidden(!step1hidden);
                                        setStep2Hidden(!step2hidden);

                                    }}
                                />
                            </div>
                        </div>
                        <div id="step_2" hidden={step2hidden} className="p-mt-4 p-col-12">
                            <div className=" p-justify-center">

                                {
                                    soilCarbonData?
                                        <div>
                                        <SoilOrganicCarbonGraph
                                            soilCarbonData={soilCarbonData}/>
                                        </div>
                                        :console.log()
                                }
                            </div>
                            <div className="p-grid p-justify-between p-mt-2">
                                <Button
                                    label="Back"
                                    icon="fad fa-step-backward"
                                    className="p-button-raised p-button-secondary"
                                    onClick={() => {
                                        setKey("land_cover");
                                        setStep1Hidden(!step1hidden);
                                        setStep2Hidden(!step2hidden);

                                    }}
                                />
                                <Button
                                    label="Next"
                                    className="p-button-raised"
                                    icon="fad fa-step-forward"
                                    iconPos="right"
                                    onClick={() => {
                                        setKey("ndvi");
                                        setStep2Hidden(!step2hidden);
                                        setStep3Hidden(!step3hidden);

                                    }}
                                />
                            </div>
                        </div>
                        <div id="step_3" hidden={step3hidden} className=" p-col-12">
                            <div className=" p-justify-center">
                                {
                                    ndviData?
                                        <div>
                                            <NdviGraph ndviData={ndviData}/>
                                        </div>
                                        :console.log()
                                }
                            </div>
                            <div className="p-grid p-justify-between p-mt-2">
                                <Button
                                    label="Back"
                                    icon="fad fa-step-backward"
                                    className="p-button-raised p-button-secondary"
                                    onClick={() => {
                                        setKey("soc");
                                        setStep2Hidden(!step2hidden);
                                        setStep3Hidden(!step3hidden);

                                    }}
                                />
                                <Button
                                    label="Next"
                                    className="p-button-raised"
                                    icon="fad fa-step-forward"
                                    iconPos="right"
                                    onClick={() => {
                                        setKey("sdg15")
                                        setStep3Hidden(!step3hidden);
                                        setStep4Hidden(!step4hidden);

                                    }}
                                />
                            </div>
                        </div>
                        <div id="step_4" hidden={step4hidden} className="p-mt-4">
                            <div className="p-col-12 p-justify-center">
                                <h5>Land Degradation statistics in ROI</h5>
                                {
                                    sdg15Data?
                                        <div>
                                            <SDG15Graph sdg15Data={sdg15Data}/>
                                        </div>
                                        :console.log()
                                }
                            </div>
                            <div className="p-grid p-col-12 p-justify-between p-mt-2">
                                <Button
                                    label="Back"
                                    icon="fad fa-step-backward"
                                    className="p-button-raised p-button-secondary"
                                    onClick={() => {
                                        setKey("ndvi")
                                        setStep3Hidden(!step3hidden);
                                        setStep4Hidden(!step4hidden);

                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog header="Warning"
                    visible={noNewProject}
                    style={{ width: '50vw' }}
                    footer={renderFooter('displayBasic')}
                    onHide={() => onHide('displayBasic')}
                    closable = {false}
            >
                <p>For this option, you first need to define a region of interest in your project</p>
            </Dialog>
        </div>
    );
}
