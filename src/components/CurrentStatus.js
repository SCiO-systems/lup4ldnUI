import React, { useState, useEffect, useRef } from 'react';
import {Steps} from "primereact/components/steps/Steps";
import {DataTable} from "primereact/components/datatable/DataTable";
import {Column} from "primereact/components/column/Column";
import CustomerService from "../service/CustomerService";
import ProductService from "../service/ProductService";
import {Button} from "primereact/components/button/Button";
import {Glowglobe} from "./Glowglobe";
import {Slider} from "primereact/components/slider/Slider";
import {Fieldset} from "primereact/components/fieldset/Fieldset";
import QvantumService from "../service/QvantumService";
import {RadioButton} from "primereact/components/radiobutton/RadioButton";
import {LandManagementSpiderGraph} from "./LandManagementSpiderGraph";
import {BootstrapCurrentStateTabs} from "./BootstrapCurrentStateTabs";
import {FileUpload} from "primereact/components/fileupload/FileUpload";
import {QuestionPanel} from "./QuestionPanel";
import {PickList} from "primereact/components/picklist/PickList";
import ls from "local-storage";

import { useHistory } from "react-router-dom";
import {Dialog} from "primereact/components/dialog/Dialog";



export const CurrentStatus = () => {

    const history = useHistory();

    const [activeIndexLandManagement, setActiveIndexLandManagement] = useState(0);
    const [activeMethodLMManagement, setActiveMethodLMManagement] = useState(0);

    const [key, setKey] = useState('land_use');

    const [city, setCity] = useState();

    const [step1hidden, setStep1Hidden] = useState(false);
    const [step2hidden, setStep2Hidden] = useState(true);
    const [step3hidden, setStep3Hidden] = useState(true);
    const [uploadHidden, setUploadHidden] = useState(true);
    const [hiddenMap, setHiddenMap] = useState(false);
    const [methodStep1, setMethodStep1] = useState(false);
    const [methodStep2, setMethodStep2] = useState(true);
    const [methodStep3, setMethodStep3] = useState(true);

    const [selectedLandUsage, setSelectedLandUsage] = useState(null);

    const [customData, setCustomData] = useState('default');

    const [customer1, setCustomer1] = useState(null);
    const [customer2, setCustomer2] = useState(null);
    const [customer3, setCustomer3] = useState(null);
    const [selectedCustomers2, setSelectedCustomers2] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [products, setProducts] = useState(null);

    //Step 1
    const [sourceSoil, setSoilSource] = useState([]);
    const [targetSoil, setSoilTarget] = useState([]);

    const [sourceWater, setWaterSource] = useState([]);
    const [targetWater, setWaterTarget] = useState([]);

    const [sourceBiodiversity, setBiodiversitySource] = useState([]);
    const [targetBiodiversity, setBiodiversityTarget] = useState([]);

    const [sourceClimateChange, setSourceClimateChange] = useState([]);
    const [targetClimateChange, setTargetClimateChange] = useState([]);

    const [sourceFood, setFoodSource] = useState([]);
    const [targetFood, setFoodTarget] = useState([]);

    const [sourceEquality, setEqualitySource] = useState([]);
    const [targetEquality, setEqualityTarget] = useState([]);

    const [sourceProduction, setProductionSource] = useState([]);
    const [targetProduction, setProductionTarget] = useState([]);

    const [sourceEconomic, setEconomicSource] = useState([]);
    const [targetEconomic, setEconomicTarget] = useState([]);

    const [layersData, setLayersData] = useState(null);

    const [noNewProject, setNoNewProject] = useState(false);

    const [landSuitability, setLandSuitability] = useState(null);
    const [focusAreaLayer,setFocusAreaLayer] = useState(null);

    const soiListCriteria=[
        {
            criterion:"Soil moisture",
            transferable:true
        },
        {
            criterion:"Reduced soil loss",
            transferable:true
        },
        {
            criterion:"Soil accumulation/development",
            transferable:true
        },
        {
            criterion:"Reduced soil crusting/sealing",
            transferable:true
        },
        {
            criterion:"Reduced soil compaction",
            transferable:true
        },
        {
            criterion:"Nutrient cycling/recharge",
            transferable:true
        },
        {
            criterion:"Reduced salinity",
            transferable:true
        },
        {
            criterion:"Reduced acidity",
            transferable:true
        },
        {
            criterion:"Soil organic matter (SOC)",
            transferable:false
        }

    ]
    const waterListCriteria=[
        {
            criterion:"Water availability",
            transferable:true
        },
        {
            criterion:"Water quality",
            transferable:true
        },
        {
            criterion:"Improved harvesting/collection of water (e.g. rainfall, runoff, dew, snow)",
            transferable:true
        },
        {
            criterion:"Reduced surface runoff",
            transferable:true
        },
        {
            criterion:"Drainage of excess water",
            transferable:true
        },
        {
            criterion:"Groundwater table/aquifer recharge",
            transferable:true
        },
        {
            criterion:"Reduced water loss by evaporation",
            transferable:true
        }

    ]
    const biodiversityListCriteria=[
        {
            criterion:"Increased or maintained ecologically healthy land covers",
            transferable:false
        },
        {
            criterion:"Biomass productivity",
            transferable:false
        },
        {
            criterion:"No or reduced expansion of cultivation areas into natural/semi-natural systems",
            transferable:true
        },
        {
            criterion:"Increased standing timber yield (e.g. in protected forest/woodland)",
            transferable:true
        },
        {
            criterion:"Improved plant diversity",
            transferable:true
        },
        {
            criterion:"Reduced occurrence of invasive alien species",
            transferable:true
        },
        {
            criterion:"Improved animal diversity",
            transferable:true
        },
        {
            criterion:"Beneficial species (predators, earthworms, pollinators)",
            transferable:true
        },
        {
            criterion:"Maintained or increased habitat diversity",
            transferable:true
        },
        {
            criterion:"Reduced occurrence of pests/ diseases",
            transferable:true
        }

    ]
    const climateChangeListCriteria=[
        {
            criterion:"Reduced damages by flooding",
            transferable:true
        },
        {
            criterion:"Reduced landslides/debris flows",
            transferable:true
        },
        {
            criterion:"Reduced damages by drought",
            transferable:true
        },
        {
            criterion:"Reduced damages by cyclones, rain storms",
            transferable:true
        },
        {
            criterion:"Reduced emission of carbon and greenhouse gases",
            transferable:true
        },
        {
            criterion:"Reduced fire risk",
            transferable:true
        },
        {
            criterion:"Reduced wind velocity",
            transferable:true
        },
        {
            criterion:"Reduced wind transported sediments",
            transferable:true
        },
        {
            criterion:"Favorable micro-climate",
            transferable:true
        }

    ]
    const foodSecurityListCriteria=[
        {
            criterion:"Food security / availability",
            transferable:true
        },
        {
            criterion:"Food security / accessibility",
            transferable:true
        },
        {
            criterion:"Food security / stability",
            transferable:true
        },
        {
            criterion:"Food security / utilization",
            transferable:true
        },
        {
            criterion:"Food security / self-sufficiency",
            transferable:true
        }
    ]
    const equalityListCriteria=[
        {
            criterion:"Social adoption of SLM technology, innovations",
            transferable:true
        },
        {
            criterion:"Improved security of land use/ water rightsImproved security of land use/ water rights",
            transferable:true
        },
        {
            criterion:"Cultural opportunities (spiritual, religious, aesthetic etc.)",
            transferable:true
        },
        {
            criterion:"Social empowerment of disadvantaged groups (aspects of gender, age, social status, ethnicity, etc.)",
            transferable:true
        }

    ]
    const productionListCriteria=[
        {
            criterion:"Crop yield (for foods or biofuels)",
            transferable:true
        },
        {
            criterion:"Crop quality (for foods or biofuels)",
            transferable:true
        },
        {
            criterion:"Fodder yield",
            transferable:true
        },
        {
            criterion:"Fodder quality",
            transferable:true
        },
        {
            criterion:"Animal production",
            transferable:true
        },
        {
            criterion:"Wood production (e.g. in production forests/woodlands)",
            transferable:true
        },
        {
            criterion:"Non-wood forest production",
            transferable:true
        },
        {
            criterion:"Reduced risk of production failure",
            transferable:true
        },
        {
            criterion:"Product diversity",
            transferable:true
        },
        {
            criterion:"Water availability for livestock",
            transferable:true
        },
        {
            criterion:"Water quality for livestock",
            transferable:true
        },
        {
            criterion:"Irrigation water availability",
            transferable:true
        },
        {
            criterion:"Irrigation water quality",
            transferable:true
        },
        {
            criterion:"Improved irrigation water use efficiency",
            transferable:true
        }
    ]
    const economicListCriteria=[
        {
            criterion:"Improved agricultural inputs use efficiency",
            transferable:true
        },
        {
            criterion:"Farm income",
            transferable:true
        },
        {
            criterion:"Diversity of income sources",
            transferable:true
        },
        {
            criterion:"Reduced economic disparities",
            transferable:true
        },
        {
            criterion:"Reduced workload",
            transferable:true
        },
        {
            criterion:"Net present value (NPV) (of the SLM practice)",
            transferable:true
        },
        {
            criterion:"Cost-benefit ratio (CBR) (of the SLM practice)",
            transferable:true
        },
        {
            criterion:"Return on investment (RoI) (on the SLM practice)",
            transferable:true
        },
        {
            criterion:"Total Economic Value (TEV) (of the whole LU/LM type)",
            transferable:true
        }

    ]
    const questionnaireTemplate={
        categories:[
            {
                label: "Ecological impacts",
                id: "ecological_impacts",
                questions:[
                    {
                        label:"Soil",
                        id: "ecological_impacts_soil",
                        sublabel: [],
                        explanationList: []
                    },
                    {
                        label:"Biodiversity",
                        id: "ecological_impacts_water_biodiversity",
                        sublabel: [],
                        explanationList: []
                    },
                    {
                        label:"Water",
                        id: "ecological_impacts_water_availability_and_quality",
                        sublabel: [],
                        explanationList: []
                    },
                    {
                        label:"Climate Change resilience",
                        id: "ecological_impacts_water_cycle",
                        sublabel: [],
                        explanationList: []
                    }

                ]
            },
            {
                label: "Socio-economic Impacts",
                id: "socio_economic_impacts",
                questions:[
                    {
                        label:"Production",
                        id:"socio_economic_impacts_production",
                        sublabel: [],
                        explanationList: [
                            "crop",
                            "fodder",
                            "animal",
                            "wood",
                            "non-wood forest",
                            "energy"
                        ]
                    },
                    {
                        label:"Economic viability",
                        id:"socio_economic_impacts_income",
                        sublabel: [],
                        explanationList: []
                    }
                ]
            },
            {
                label: "Socio-cultural impacts",
                id: "socio_cultural_impacts",
                questions:[
                    {
                        label:"Food security",
                        id:"socio_cultural_impacts_food_secutiry",
                        sublabel: [],
                        explanationList: []
                    },
                    {
                        label:"Equality of opportunity",
                        id:"socio_cultural_impacts_equality_of_opportunity",
                        sublabel: [],
                        explanationList: []
                    }
                ]
            }
        ]
    }

    const format = (num,decimals) => {
        return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    useEffect(() => {

        const projectInfo = ls.get("project_info");
        const regionDetails = ls.get("regionDetails");
        const regionLandCoverTypes = ls.get("regionLandCoverTypes");
        if(regionDetails
            && Object.keys(regionDetails).length === 0 && regionDetails.constructor === Object){
            setNoNewProject(true);

        }else {
            setLandSuitability(regionLandCoverTypes.dataSuitability);
            initializeLUQuestionnaires();

            const customerService = new CustomerService();
            const productService = new ProductService();
            productService.getProductsWithOrdersSmall().then(data => setProducts(data));
            customerService.getCustomersMedium().then(data => {
                setCustomer1(data);
                setLoading1(false)
            });
            customerService.getCustomersLarge().then(data => {
                setCustomer2(data);
                setLoading2(false)
            });
            customerService.getCustomersMedium().then(data => setCustomer3(data));


            const sourceList = soiListCriteria.filter(
                (item) => item.transferable == true
            )

            const targetList = soiListCriteria.filter(
                (item) => item.transferable == false
            )

            setSoilSource(sourceList);
            setSoilTarget(targetList);


            const sourceBioList = biodiversityListCriteria.filter(
                (item) => item.transferable == true
            )

            const targetBioList = biodiversityListCriteria.filter(
                (item) => item.transferable == false
            )

            setBiodiversitySource(sourceBioList);
            setBiodiversityTarget(targetBioList);


            setWaterSource(waterListCriteria);
            setSourceClimateChange(climateChangeListCriteria);
            setFoodSource(foodSecurityListCriteria);
            setEqualitySource(equalityListCriteria);
            setProductionSource(productionListCriteria);
            setEconomicSource(economicListCriteria);

            const projectInfo = ls.get("project_info");
            const regionDetails = ls.get("regionDetails");

            const qvantumService = new QvantumService();

            var country = regionDetails.country;
            var adminLevel = regionDetails.administrationLevel;

            qvantumService.getFullGADMPolygon(regionDetails.chosenPoint,adminLevel).then(
                (response) => {
                    var requestedCountry = null
                    if (projectInfo.iso_code_2 === "TN") {
                        requestedCountry = "TYN"
                    } else if (projectInfo.iso_code_2 === "BF") {
                        requestedCountry = "BFA"
                    }

                    var defaultYear = 2018;
                    qvantumService.getSuitabilityData(requestedCountry, defaultYear).then(
                        layers => {
                            layers[0].administrationLevel = '1';
                            layers[0].point = response;
                            setLayersData(layers);
                            var regionLayer = {
                                point:response
                            }
                            setFocusAreaLayer(regionLayer);
                        }
                    )
                }
            )
        }

    }, []);


    const itemTemplate = (item) => {
        let icon = "fad fa-tag product-category-icon";
        if(item.transferable == false){
            icon = "fas fa-tag product-category-icon";
        }

        return (
            <div className="product-item">
                <div className="product-list-detail">
                    <i className={icon}></i>
                    <span className="product-category">{item.criterion}</span>
                </div>
            </div>
        );
    }

    const onChange = (event,picklist) => {

        const sourceList = event.source.filter(
            (item) => item.transferable == true
        )

        const targetList = event.source.filter(
            (item) => item.transferable == false
        )

        if(targetList.length>0){
            Array.prototype.push.apply(event.target,targetList);
        }

        if(picklist === "soil"){
            setSoilSource(sourceList);
            setSoilTarget(event.target);
        }else if(picklist === "water"){
            setWaterSource(sourceList);
            setWaterTarget(event.target);
        }else if(picklist === "biodiversity"){
            setBiodiversitySource(sourceList);
            setBiodiversityTarget(event.target);
        }else if(picklist === "climate_change"){
            setSourceClimateChange(sourceList);
            setTargetClimateChange(event.target);
        }else if(picklist === "food_security"){
            setFoodSource(sourceList);
            setFoodTarget(event.target);
        }else if(picklist === "equality"){
            setEqualitySource(sourceList);
            setEqualityTarget(event.target);
        }else if(picklist === "production"){
            setProductionSource(sourceList);
            setProductionTarget(event.target);
        }else if(picklist === "economic"){
            setEconomicSource(sourceList);
            setEconomicTarget(event.target);
        }
    }

    const staticColumn = (data, props) => {

        return (
            <>
                {data.land_cover_class}
            </>
        );
    };

    const countryBodyTemplate = (data) => {
        return (
            <div style={{textAlign: 'right'}}>
                {format(data.classes[3].data.absolute_value,2)+"ha "}
                ({data.classes[3].data.percentage_value.toFixed(2)+"%"})

            </div>
        );
    };

    const representativeBodyTemplate = (data) => {
        return (
            <div style={{textAlign: 'right'}}>

                {format(data.classes[2].data.absolute_value,2)+"ha "}
                ({data.classes[2].data.percentage_value.toFixed(2)+" %"})


            </div>
        );
    };

    const bodyTemplate = (data, props) => {
        return (
            <div style={{textAlign: 'right'}}>
                {format(data.classes[1].data.absolute_value,2)+"ha "}
                ({data.classes[1].data.percentage_value.toFixed(2)+"%"})
            </div>
        );
    };



    const items = [
        {
            label: 'Cropland',
            name: 'cropland',
            visible: true
        },
        {
            label: 'Grassland',
            name: 'grassland',
            visible: false
        },
        {
            label: 'Tree-covered',
            name: 'tree_covered',
            visible: false
        },
    ];

    const initializeLUQuestionnaires = () =>{

        const updatedItems = items.map(
            (item) =>{
                item.spiderData = [
                    {
                        "criteria": "Soil",
                        "slm1": 0,
                        "slm2": 0,
                        "id":"likert_ecological_impacts_soil"
                    },
                    {
                        "criteria": "Water",
                        "slm1": 0,
                        "slm2": 0,
                        "id":"likert_ecological_impacts_water_availability_and_quality"
                    },
                    {
                        "criteria": "Biodiversity",
                        "slm1": 0,
                        "slm2": 0,
                        "id":"likert_ecological_impacts_water_biodiversity"
                    },
                    {
                        "criteria": "Climate Change\nresilience ",
                        "slm1": 0,
                        "slm2": 0,
                        "id":"likert_ecological_impacts_water_cycle"
                    },
                    {
                        "criteria": "Production",
                        "slm1": 0,
                        "slm2": 0,
                        "id":"likert_socio_economic_impacts_production"
                    },
                    {
                        "criteria": "Economic\nviability",
                        "slm1": 0,
                        "slm2": 0,
                        "id":"likert_socio_economic_impacts_income"
                    },
                    {
                        "criteria": "Food Security",
                        "slm1": 0,
                        "slm2": 0,
                        "id":"likert_socio_cultural_impacts_food_secutiry"
                    },
                    {
                        "criteria": "Equality of\nopportunity",
                        "slm1": 0,
                        "slm2": 0,
                        "id":"likert_socio_cultural_impacts_equality_of_opportunity"
                    }
                    ];
                return item;
            }
        )
        setSelectedLandUsage(updatedItems);
    }

    const method2steps = [
        {label: 'LM Sustainability Impact Indicators'},
        {label: 'Define Focus Area(s) in ROI'},
        {label: 'Focus Area LM Assessment'}
    ];

    const chosenTabValue = (value) => {
        if(value === "land_use"){
            setStep1Hidden(false);
            setStep2Hidden(true);
            setHiddenMap(false);
            if(customData === "default"){
                setUploadHidden(true);
            }else if(customData === "custom"){
                setUploadHidden(false);
            }
        }else if(value === "land_management"){
            setStep1Hidden(true);
            setStep2Hidden(false);
            setHiddenMap(true);
            setUploadHidden(true);
        }

    }

    const enableUserUploadData = (e) =>{
        if(e.value === "default"){
            setUploadHidden(true);
        }else if(e.value === "custom"){
            setUploadHidden(false);
        }

        setCustomData(e.value);

    }

    const onUpload = () => {
        console.log("upload");
    }

    const updateSpiderGraph = (value) =>{
        const updatedSelectedLandUsage = selectedLandUsage.map(
            (item,index)=>{
                if(index === activeIndexLandManagement){
                    let qid = value.id;
                    const updatedData = item.spiderData.map(
                        (spiderDataItem) =>{
                            if(spiderDataItem.id === qid){
                                spiderDataItem.slm1 = value.numericValue;
                            }
                            return spiderDataItem;
                        }
                    )
                    item.spiderData = updatedData;
                    return item;
                }else{
                    return item;
                }
            }
        )
        setSelectedLandUsage([...updatedSelectedLandUsage]);
    }

    const buildQuestionnaire = () =>{
        return (
            <div>{
                 selectedLandUsage.map(
                     (item)=>{
                         return (
                             <div id={item.name} hidden={!item.visible}>
                                 <h5>{item.label}</h5>
                                 <div className="p-grid">
                                     {
                                         questionnaireTemplate.categories.map(
                                             (questionnaire) =>{
                                                 if(questionnaire.questions.length === 4){
                                                     return (
                                                         <div className="p-col-12">
                                                             <Fieldset
                                                                 legend={questionnaire.label}
                                                                 toggleable
                                                                 className="p-col-12 p-shadow-8"
                                                                 collapsed={false}
                                                             >
                                                             <div className="p-grid">
                                                                 {
                                                                     questionnaire.questions.map(
                                                                         (question) => {
                                                                             return(
                                                                                 <div className="p-col-6">
                                                                                 <QuestionPanel
                                                                                     likertData ={updateSpiderGraph}
                                                                                     question={question}/>
                                                                                 </div>
                                                                             )
                                                                         }
                                                                     )
                                                                 }
                                                             </div>
                                                             </Fieldset>
                                                         </div>
                                                     )
                                                 }

                                                 return (
                                                     <div className="p-col-6">
                                                         <Fieldset
                                                             legend={questionnaire.label}
                                                             toggleable
                                                             className="p-col-12 p-shadow-8"
                                                             collapsed={false}
                                                         >
                                                             {
                                                                 questionnaire.questions.map(
                                                                     (question) => {
                                                                         return(
                                                                             <QuestionPanel
                                                                                 likertData ={updateSpiderGraph}
                                                                                 question={question}/>
                                                                         )
                                                                     }
                                                                 )
                                                             }
                                                         </Fieldset>
                                                     </div>
                                                 )

                                             }
                                         )
                                     }
                                 </div>
                             </div>
                         )
                     }
                 )
            }
            </div>
        )
    }

    const buildQuestionnaireGraph = () =>{
        return (
            <div className="p-component p-shadow-8">
                {
                    selectedLandUsage.map(
                        (item)=>{
                            return (
                                <div id={item.name} hidden={!item.visible}>
                                    <div className="p-card-header">
                                        <div className="p-card-title p-px-3 p-pt-3">
                                            <h4>{item.label}</h4>
                                        </div>
                                    </div>
                                    <div className="p-card-body">
                                        <div
                                            className="p-grid
                                            p-align-center
                                            vertical-container
                                            p-card-content">

                                            <div className="p-col-8">
                                                <LandManagementSpiderGraph
                                                    data={item.spiderData}
                                                    containerName={item.name}
                                                />
                                            </div>
                                            <div className="p-col-4">
                                                <div className="p-mr-4">
                                                    <h5>
                                                        What is the anticipated LD impact for this LU Type?
                                                    </h5>
                                                </div>
                                                <div className="p-field-radiobutton p-mt-4">
                                                    <RadioButton
                                                        inputId="city1"
                                                        name="city"
                                                        value="q1"
                                                        onChange={(e) => setCity(e.value)}
                                                        checked={city === 'q1'}
                                                    />
                                                    <label htmlFor="city1">Improved</label>
                                                </div>
                                                <div className="p-field-radiobutton">
                                                    <RadioButton
                                                        inputId="city2"
                                                        name="city"
                                                        value="q2"
                                                        onChange={(e) => setCity(e.value)}
                                                        checked={city === 'q2'}/>
                                                    <label htmlFor="city2">Slightly Improved</label>
                                                </div>
                                                <div className="p-field-radiobutton">
                                                    <RadioButton
                                                        inputId="city3"
                                                        name="city"
                                                        value="q3"
                                                        onChange={(e) => setCity(e.value)}
                                                        checked={city === 'q3'}/>
                                                    <label htmlFor="city3">Neutral</label>
                                                </div>
                                                <div className="p-field-radiobutton">
                                                    <RadioButton
                                                        inputId="city3"
                                                        name="city"
                                                        value="q4"
                                                        onChange={(e) => setCity(e.value)}
                                                        checked={city === 'q4'}/>
                                                    <label htmlFor="city3">Slightly Reduced</label>
                                                </div>
                                                <div className="p-field-radiobutton">
                                                    <RadioButton
                                                        inputId="city3"
                                                        name="city"
                                                        value="q5"
                                                        onChange={(e) => setCity(e.value)}
                                                        checked={city === 'q5'}/>
                                                    <label htmlFor="city3">Reduced</label>
                                                </div>

                                            </div>
                                            <div className="p-mt-4 p-grid p-col-12 p-justify-end  p-mr-4">
                                                <Button
                                                    label="Next LU Type"
                                                    className="p-button-raised"
                                                    onClick={(e) => {
                                                        nextLUType(e)
                                                    }}
                                                    disabled={(selectedLandUsage.length-1 == activeIndexLandManagement)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }

    const activateLU = (e) =>{
        const newSelectedLandUsage = selectedLandUsage.map(
            (item,index)=>{
                if(index === e.index){
                    item.visible = true;
                }else{
                    item.visible = false;
                }

                return item;
            }
        )
        setSelectedLandUsage(newSelectedLandUsage);
        setActiveIndexLandManagement(e.index)
    }

    const nextLUType = (e) => {

        let nextLU = activeIndexLandManagement + 1;
        const newSelectedLandUsage = selectedLandUsage.map(
            (item,index)=>{
                if(index === nextLU){
                    item.visible = true;
                }else{
                    item.visible = false;
                }

                return item;
            }
        )

        setSelectedLandUsage(newSelectedLandUsage);
        setActiveIndexLandManagement(nextLU);
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
                        <BootstrapCurrentStateTabs selectedValue={chosenTabValue} activateTab={key}/>
                        <div className=" p-mt-2 p-col-12" >
                            <div hidden={hiddenMap}>
                                <div className="p-col-12">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="city1" name="city" value="default" onChange={(e) => enableUserUploadData(e)} checked={customData === 'default'} />
                                        <label htmlFor="city1">Use default data (<a href="https://core.ac.uk/download/pdf/15477943.pdf" target="_blank">Global Land System (GLS)</a>)</label>
                                    </div>
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="city2" name="city" value="custom" onChange={(e) => enableUserUploadData(e)} checked={customData === 'custom'} />
                                        <label htmlFor="city2">Use custom data</label>
                                    </div>
                                </div>

                                <div className="p-col-12" hidden={uploadHidden}>
                                    <h4>Upload your Data</h4>
                                    <FileUpload name="demo[]"
                                                url="./upload.php"
                                                onUpload={onUpload}
                                                multiple
                                                accept="image/*"
                                                maxFileSize={1000000} />
                                </div>


                                <Fieldset
                                    legend="Map"
                                    toggleable
                                    className="p-col-12"
                                    collapsed={true}
                                >
                                    <Glowglobe
                                        toolbar="no"
                                        styleEditor={false}
                                        zoom={3}
                                        layers={layersData}
                                    />

                                </Fieldset>
                            </div>

                            <div id="step_1" className="p-mt-4" hidden={step1hidden}>
                                <DataTable
                                    value={landSuitability}
                                    className="p-datatable-gridlines p-datatable-striped p-datatable-sm p-datatable-customers"
                                    rows={10}
                                    dataKey="id"
                                    rowHover
                                    selection={selectedCustomers2}
                                    onSelectionChange={(e) => setSelectedCustomers2(e.value)}
                                    loading={loading2}
                                    editMode="row"
                                >

                                    <Column rowSpan={2} field="name" header="LU Type in ROI"  body={staticColumn}></Column>
                                    <Column style={{textAlign: 'center'}} field="country.name" header="Suitable"  body={countryBodyTemplate}></Column>
                                    <Column style={{textAlign: 'center'}} field="representative.name" header="Partially Suitable"  body={representativeBodyTemplate}></Column>
                                    <Column style={{textAlign: 'center'}} field="date" header="Non Suitable"  body={bodyTemplate}></Column>
                                </DataTable>
                                <div className="p-grid p-col-12 p-justify-center p-mt-2">
                                    <Button
                                        label="Anticipated new Land Degradation"
                                        className="p-button-raised"
                                        onClick={()=>{
                                            history.push('scenariobuilder');
                                        }}
                                    />
                                </div>
                            </div>
                            <div id="step_2" hidden={step2hidden} className="p-mt-4">

                                <Steps model={method2steps}
                                       activeIndex={activeMethodLMManagement}
                                       onSelect={(e) => {
                                           setActiveMethodLMManagement(e.index);
                                           if(e.index == 1){
                                               setMethodStep1(true);
                                               setMethodStep2(false);
                                               setMethodStep3(false);
                                           }else if(e.index == 2){
                                               setMethodStep1(false);
                                               setMethodStep2(true);
                                               setMethodStep3(false);
                                           }else if(e.index == 3){
                                               setMethodStep1(false);
                                               setMethodStep2(false);
                                               setMethodStep3(true);
                                           }

                                       }}
                                       readOnly={true}
                                />
                                <div id="method_step_1" hidden={methodStep1} className="p-mt-4 ">
                                    <div>
                                        <h5>Ecological Impacts</h5>
                                        <div className="p-mt-4">
                                            <div className="picklist-demo">
                                                <PickList
                                                    source={sourceSoil}
                                                    target={targetSoil}
                                                    itemTemplate={itemTemplate}
                                                    onChange={(e) => onChange(e,"soil")}
                                                    sourceHeader="Soil"
                                                    targetHeader="Assessment criteria"
                                                    showSourceControls={false}
                                                    sourceStyle={{ height: '200px'}}
                                                    targetStyle={{ height: '200px'}}
                                                />
                                            </div>
                                        </div>

                                        <div className="p-mt-4">
                                            <div className="picklist-demo">
                                                <PickList
                                                    source={sourceWater}
                                                    target={targetWater}
                                                    itemTemplate={itemTemplate}
                                                    onChange={(e) => onChange(e,"water")}
                                                    sourceHeader="Water"
                                                    targetHeader="Assessment criteria"
                                                    showSourceControls={false}
                                                    sourceStyle={{ height: '200px'}}
                                                    targetStyle={{ height: '200px'}}
                                                />
                                            </div>
                                        </div>

                                        <div className="p-mt-4">
                                            <div className="picklist-demo">
                                                <PickList
                                                    source={sourceBiodiversity}
                                                    target={targetBiodiversity}
                                                    itemTemplate={itemTemplate}
                                                    onChange={(e) => onChange(e,"biodiversity")}
                                                    sourceHeader="Biodiversity"
                                                    targetHeader="Assessment criteria"
                                                    showSourceControls={false}
                                                    sourceStyle={{ height: '200px'}}
                                                    targetStyle={{ height: '200px'}}
                                                />
                                            </div>
                                        </div>

                                        <div className="p-mt-4">
                                            <div className="picklist-demo">
                                                <PickList
                                                    source={sourceClimateChange}
                                                    target={targetClimateChange}
                                                    itemTemplate={itemTemplate}
                                                    onChange={(e) => onChange(e,"climate_change")}
                                                    sourceHeader="Climate Change Resilience"
                                                    targetHeader="Assessment criteria"
                                                    showSourceControls={false}
                                                    sourceStyle={{ height: '200px'}}
                                                    targetStyle={{ height: '200px'}}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-mt-4">
                                        <h5>Socio-economic Impacts</h5>
                                        <div className="p-mt-4">
                                            <div className="picklist-demo">
                                                <PickList
                                                    source={sourceProduction}
                                                    target={targetProduction}
                                                    itemTemplate={itemTemplate}
                                                    onChange={(e) => onChange(e,"production")}
                                                    sourceHeader="Production"
                                                    targetHeader="Assessment criteria"
                                                    showSourceControls={false}
                                                    sourceStyle={{ height: '200px'}}
                                                    targetStyle={{ height: '200px'}}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-mt-4">
                                            <div className="picklist-demo">
                                                <PickList
                                                    source={sourceEconomic}
                                                    target={targetEconomic}
                                                    itemTemplate={itemTemplate}
                                                    onChange={(e) => onChange(e,"economic")}
                                                    sourceHeader="Economic viability"
                                                    targetHeader="Assessment criteria"
                                                    showSourceControls={false}
                                                    sourceStyle={{ height: '200px'}}
                                                    targetStyle={{ height: '200px'}}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-mt-4">
                                        <h5>Sociocultural Impacts</h5>
                                        <div className="p-mt-4">
                                            <div className="picklist-demo">
                                                <PickList
                                                    source={sourceFood}
                                                    target={targetFood}
                                                    itemTemplate={itemTemplate}
                                                    onChange={(e) => onChange(e,"food_security")}
                                                    sourceHeader="Food security"
                                                    targetHeader="Assessment criteria"
                                                    showSourceControls={false}
                                                    sourceStyle={{ height: '200px'}}
                                                    targetStyle={{ height: '200px'}}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-mt-4">
                                            <div className="picklist-demo">
                                                <PickList
                                                    source={sourceEquality}
                                                    target={targetEquality}
                                                    itemTemplate={itemTemplate}
                                                    onChange={(e) => onChange(e,"equality")}
                                                    sourceHeader="Equality of opportunity"
                                                    targetHeader="Assessment criteria"
                                                    showSourceControls={false}
                                                    sourceStyle={{ height: '200px'}}
                                                    targetStyle={{ height: '200px'}}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-mt-4 p-grid  p-justify-end p-ml-1 p-mr-1">
                                        <Button
                                            label="Next"
                                            className="p-button-raised"
                                            onClick={() => {
                                                setActiveMethodLMManagement(1);
                                                setMethodStep1(true);
                                                setMethodStep2(false);
                                                setMethodStep3(true);
                                            }}
                                            icon="fad fa-arrow-alt-to-right"
                                            iconPos="right"
                                        />
                                    </div>
                                </div>
                                <div id="method_step_2" hidden={methodStep2} className="p-mt-4 ">
                                    <Fieldset
                                        legend="Map"
                                        toggleable
                                        className="p-col-12"
                                        collapsed={true}
                                    >
                                        <Glowglobe
                                                toolbar="simple"
                                                styleEditor={false}
                                                zoom={3}
                                                container="focus"
                                                regionLayer={focusAreaLayer}
                                            />
                                    </Fieldset>

                                    <div className="p-mt-4 p-mb-4">
                                        <h4>Upload your Polygons</h4>
                                        <FileUpload name="demo[]"
                                                    url="./upload.php"
                                                    onUpload={onUpload}
                                                    multiple
                                                    accept="image/*"
                                                    maxFileSize={1000000} />
                                    </div>




                                    <div className="p-mt-4 p-grid  p-justify-between p-ml-1 p-mr-1">
                                        <Button
                                            icon="fad fa-step-backward"
                                            label="Back"
                                            className="p-button-raised p-button-secondary"
                                            onClick={() => {
                                                setActiveMethodLMManagement(0);
                                                setMethodStep1(false);
                                                setMethodStep2(true);
                                                setMethodStep3(true);
                                            }}
                                        />
                                        <Button
                                            label="Save & Continue"
                                            className="p-button-raised"
                                            icon="fad fa-save"
                                            iconPos="right"
                                            onClick={() => {
                                                setActiveMethodLMManagement(2);
                                                setMethodStep1(true);
                                                setMethodStep2(true);
                                                setMethodStep3(false);
                                            }}
                                        />
                                    </div>

                                </div>

                                <div id="method_step_3" hidden={methodStep3} className="p-mt-4 ">
                                    <div className="card">
                                        <div className="p-mb-4">
                                            <Steps model={items}
                                                   activeIndex={activeIndexLandManagement}
                                                   onSelect={(e) => {activateLU(e)}}
                                                   readOnly={true}
                                            />
                                        </div>
                                        {
                                            selectedLandUsage?
                                                buildQuestionnaire()
                                                :console.log()
                                        }
                                        {
                                            selectedLandUsage?
                                                buildQuestionnaireGraph()
                                                :console.log()
                                        }

                                    </div>
                                    <div className="p-grid p-col-12 p-justify-between">
                                        <Button
                                            icon="fad fa-step-backward"
                                            label="Back"
                                            className="p-button-raised p-button-secondary"
                                            onClick={() => {
                                                setActiveMethodLMManagement(1);
                                                setMethodStep1(true);
                                                setMethodStep2(false);
                                                setMethodStep3(true);

                                            }}
                                        />
                                        <Button
                                            label="Anticipated new Land Degradation"
                                            className="p-button-raised"
                                            onClick={()=>{
                                                history.push('scenariobuilder');
                                            }}
                                            disabled={true}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div id="step_3" className="p-mt-4" hidden={step3hidden}>
                                <div className="p-col-12 card">
                                    <div className="card-header">
                                        <h5>
                                            Method for SOC change in 2020 - 2030
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="p-grid">
                                            <div className="p-col-4">
                                                <div className="p-field-radiobutton">
                                                    <RadioButton
                                                        inputId="user_defined"
                                                        name="soc_projection"
                                                        value="Chicago"
                                                        onChange={(e) => setCity(e.value)}
                                                        checked={city === 'Chicago'}
                                                    />
                                                    <label htmlFor="city1">User Defined</label>
                                                </div>
                                                <div className="p-field-radiobutton">
                                                    <RadioButton
                                                        inputId="linear_regression"
                                                        name="soc_projection"
                                                        value="Los Angeles"
                                                        onChange={(e) => setCity(e.value)}
                                                        checked={city === 'Los Angeles'}/>
                                                    <label htmlFor="city2">Historical Data</label>
                                                </div>
                                                <div className="p-field-radiobutton">
                                                    <RadioButton
                                                        inputId="climatic_prospects"
                                                        name="soc_projection"
                                                        value="New York"
                                                        onChange={(e) => setCity(e.value)}
                                                        checked={city === 'New York'}/>
                                                    <label htmlFor="city3">Climatic Prospects</label>
                                                </div>
                                            </div>
                                            <div className="p-col p-align-center vertical-container">
                                                <Slider  min={2001}
                                                         max={2018}
                                                         value={0}
                                                         step={1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
