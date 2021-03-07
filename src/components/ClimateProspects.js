import React, { useState, useEffect, useRef } from 'react';
import {Button} from "primereact/components/button/Button";
import {PopulationGraph} from "./PopulationGraph";
import {BootstrapProspectsTabs} from "./BootstrapProspectsTabs";
import {ClimateProspectsTemperatureGraph} from "./ClimateProspectsTemperatureGraph";
import {ClimateProspectsPrecipitationGraph} from "./ClimateProspectsPrecipitationGraph";
import {Dialog} from "primereact/components/dialog/Dialog";
import {RCPExplanation} from "./RCPExplanation";
import {DataUploadSelection} from "./DataUploadSelection";

import { useHistory } from "react-router-dom";

import ls from 'local-storage'
import {ClimateProspectsSpectralIndicesGraph} from "./ClimateProspectsSpectralIndicesGraph";
import {ClimateProspectsSpectralIndices2Graph} from "./ClimateProspectsSpectralIndices2Graph";

export const ClimateProspects = () => {

    const history = useHistory();

    const [key, setKey] = useState('population');
    const [tabIndex, setTabIndex] = useState(1);

    const [step1hidden, setStep1Hidden] = useState(false);
    const [step2hidden, setStep2Hidden] = useState(true);
    const [step3hidden, setStep3Hidden] = useState(true);
    const [step4hidden, setStep4Hidden] = useState(true);

    const [displayBasic, setDisplayBasic] = useState(false);

    const [popData,setPopData] = useState(null);

    const [noNewProject, setNoNewProject] = useState(false);

    const [defaultDataTag, setDefaultDataTagValue] = useState({
        tab_1:[
            {label:"UN World Population Prospects",url:"https://population.un.org/wpp/"}],
        tab_2:[
            {label:"WorldClim CRU-TS-4.03",url:"https://www.worldclim.org/data/monthlywth.html"},
            {label:"NASA Earth Exchange",url:"https://www.nasa.gov/nex"}
        ],
        tab_3:[
            {label:"NOAA Climate Data Record",url:"https://data.nodc.noaa.gov/cgi-bin/iso?id=gov.noaa.ncdc:C00813"},
            {label:"ESA CCI Soil Moisture Product",url:"https://www.esa-soilmoisture-cci.org/node/238"},
            {label:"SCiO Spectral Indices Prospects",url:"https://github.com/SCiO-systems/SIP"}
            ]
    });

    useEffect(() => {

        const projectInfo = ls.get("project_info");
        const regionDetails = ls.get("regionDetails");
        if(regionDetails
            && Object.keys(regionDetails).length === 0 && regionDetails.constructor === Object){
            setNoNewProject(true);

        }else {
            if (projectInfo.iso_code_2 === "TN") {
                var DATA_URL1 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/TUN_population_age_groups.csv"
                var DATA_URL2 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/TUN_population.csv"
                var DATA_URL3 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/clim_TUN_temp.csv";
                var DATA_URL4 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/clim_TUN_prec.csv";
                var DATA_URL5 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/idx_TUN_ndvi.csv";
                var DATA_URL6 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/idx_TUN_smi.csv";

                setPopData({
                    ageGroups: DATA_URL1,
                    population: DATA_URL2,
                    temperature: DATA_URL3,
                    precipitation: DATA_URL4,
                    ndvi: DATA_URL5,
                    smi: DATA_URL6,
                });
            } else if (projectInfo.iso_code_2 === "BF") {
                var DATA_URL1 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/BFA_population_age_groups.csv"
                var DATA_URL2 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/BFA_population.csv"
                var DATA_URL3 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/clim_BFA_temp.csv";
                var DATA_URL4 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/clim_BFA_prec.csv";
                var DATA_URL5 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/idx_BFA_ndvi.csv";
                var DATA_URL6 = "https://trends-earth-15-3-1.s3.eu-central-1.amazonaws.com/idx_BFA_smi.csv";

                setPopData({
                    ageGroups: DATA_URL1,
                    population: DATA_URL2,
                    temperature: DATA_URL3,
                    precipitation: DATA_URL4,
                    ndvi: DATA_URL5,
                    smi: DATA_URL6,
                });
            } else {
                //Throw warning
            }
        }

    },[])



    const chosenTabValue = (value) => {
        if(value === "population")
        {
            setStep1Hidden(false);
            setStep2Hidden(true);
            setStep3Hidden(true);
            setStep4Hidden(true);
            setTabIndex(1);
        }else if(value === "climatic_variables")
        {
            setStep1Hidden(true);
            setStep2Hidden(false);
            setStep3Hidden(true);
            setStep4Hidden(true);
            setTabIndex(2);
        }else if(value === "spectral_indices")
        {
            setStep1Hidden(true);
            setStep2Hidden(true);
            setStep3Hidden(false);
            setStep4Hidden(true);
            setTabIndex(3);
        }else if(value === "sdg11")
        {
            setStep1Hidden(true);
            setStep2Hidden(true);
            setStep3Hidden(true);
            setStep4Hidden(false);
            setTabIndex(4);
        }
    }

    const basicDialogFooter = <Button type="button" label="OK" onClick={() => setDisplayBasic(false)} icon="pi pi-check" className="p-button-text" />;


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
                        <BootstrapProspectsTabs selectedValue={chosenTabValue} activateTab={key}/>
                        <DataUploadSelection defaultDataTag={defaultDataTag} tabIndex={tabIndex}/>
                        <div id="step_1" hidden={step1hidden} className="p-mt-4">
                            <div className="p-col-12 p-justify-center">
                                {
                                    popData?
                                    <PopulationGraph data={popData}/>
                                        :console.log()
                                }
                            </div>
                        </div>
                        <div id="step_2" hidden={step2hidden} className="p-mt-4">

                            <div className="p-grid p-col-12 p-justify-end p-mr-4">
                                <Button label="Explore Representative Concentration Pathways (RCPs)"
                                        onClick={
                                            ()=>{
                                                setDisplayBasic(true)
                                            }
                                        }
                                />
                            </div>

                            <Dialog visible={displayBasic}
                                    modal
                                    footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}
                                    style={{width:"90vw"}}
                            >
                                <RCPExplanation />
                            </Dialog>

                            <div className="p-col-12 p-justify-center">
                                {
                                    <ClimateProspectsTemperatureGraph data={popData}/>
                                }
                            </div>

                            <div className="p-col-12 p-justify-center">
                                {
                                    <ClimateProspectsPrecipitationGraph data={popData}/>
                                }
                            </div>
                        </div>
                        <div id="step_3" hidden={step3hidden} className="p-mt-4">

                            <div className="p-col-12 p-justify-center">
                                {
                                    <ClimateProspectsSpectralIndicesGraph data={popData}/>
                                }
                            </div>

                            <div className="p-col-12 p-justify-center">
                                {
                                    <ClimateProspectsSpectralIndices2Graph data={popData}/>
                                }
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
    )

}
