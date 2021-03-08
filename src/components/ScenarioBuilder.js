import React, { useState, useEffect, useRef } from 'react';
import {Steps} from "primereact/components/steps/Steps";
import {ProgressBar} from "primereact/components/progressbar/ProgressBar";
import {Button} from "primereact/components/button/Button";
import {BootstrapLandUsePlanning} from "./BootstrapLandUsePlanning";
import {TransitionMatrix} from "./TransitionMatrix";
import {Toolbar} from "primereact/components/toolbar/Toolbar";
import { Dialog } from 'primereact/dialog';
import {InputMask} from "primereact/components/inputmask/InputMask";
import { OverlayPanel } from 'primereact/overlaypanel';
import {DataTable} from "primereact/components/datatable/DataTable";
import {Column} from "primereact/components/column/Column";
import { HashLink as Link } from 'react-router-hash-link';
import {InputNumber} from "primereact/components/inputnumber/InputNumber";
import {DataUploadSelectionSOC} from "./DataUploadSelectionSOC";
import {DataUploadSelectionNDVI} from "./DataUploadSelectionNDVI";
import {Dropdown} from "primereact/components/dropdown/Dropdown";
import {Glowglobe} from "./Glowglobe";
import QvantumService from "../service/QvantumService";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

import { useHistory } from "react-router-dom";



import ls from "local-storage";
import ProductService from "../service/ProductService";
import {DegradationGauge} from "./DegradationGauge";
import {Fieldset} from "primereact/components/fieldset/Fieldset";
import {QuestionPanel} from "./QuestionPanel";
import {LandManagementFlowerGraph} from "./LandManagementFlowerGraph";
import {NeutralityMatrix} from "./NeutralityMatrix";
import {WaterfallGraph} from "./WaterfallGraph";


export const ScenarioBuilder = (props) => {

    const history = useHistory();

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeIndexLandManagement, setActiveIndexLandManagement] = useState(0);
    const [ldButton, setLDButton] = useState(true);
    const [progressBarValue, setProgressBarValue] = useState(0);

    const [luss, setLuss] = useState();
    const [selectedLandUsage, setSelectedLandUsage] = useState(null);

    const [checked, setChecked] = useState(null);

    const [key, setKey] = useState('anticipated_land_degradation');
    const [ldnHidden, setLDNHidden] = useState(true);
    const [ldHidden, setLDHidden] = useState(false);
    const [sdgHidden, setSDGHidden] = useState(true);
    const [lastSave, setLastSave] = useState(false);

    const [step1hidden, setStep1Hidden] = useState(false);
    const [step2hidden, setStep2Hidden] = useState(true);
    const [step3hidden, setStep3Hidden] = useState(true);
    const [step4hidden, setStep4Hidden] = useState(true);

    const [questionnaireHidden, setQuestionnaireHidden] = useState(true);
    const [scenarioModalVisible, setScenarioModalVisible] = useState(false);
    const [resetModalVisible, setResetModalVisible] = useState(false);

    const [startDate, setStartDate] = useState(2021);
    const [endDate, setEndDate] = useState(2030);

    const [scenarios,setScenarios] = useState([]);
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [minDate,setMinDate] = useState(2021);
    const [maxDate,setMaxDate] = useState(2030);

    const [socCalculationScenarios,setSocCalculationScenarios] = useState(null);
    const [newScenarioState, setNewScenarioState] = useState(false);
    const [deleteState, setDeleteState] = useState(true);
    const [overviewState, setOverviewState] = useState(true);

    const [socMatrix, setSocMatrix] = useState(true);
    const [customer2, setCustomer2] = useState(null);
    const [selectedCustomers2, setSelectedCustomers2] = useState(null);

    const [landCoverItem, setLandCoverItem] = useState(null);
    const [selectedlandCoverItem, setSelectedlandCoverItem] = useState(null);

    const [climaticRegion, setClimaticRegion] = useState(0.80);
    const [enableLoadDefaults, setEnableLoadDefaults] = useState(true);

    const [trendsEarthStatus, setTrendsEarthStatus] = useState(true);

    const [layersData, setLayersData] = useState(null);

    const [gaugeValues, setGaugeValues] = useState(undefined)
    const [waterfallValues, setWaterfallValues] = useState(undefined)

    const [noNewProject, setNoNewProject] = useState(false);




    const LUSelectItems = [
        {label: 'Tree-covered', value: 'TC'},
        {label: 'Grassland', value: 'GR'},
        {label: 'Cropland', value: 'CR'},
        {label: 'Wetland', value: 'WL'},
        {label: 'Artificial', value: 'AA'},
        {label: 'Bare land', value: 'BL'},
        {label: 'Water body', value: 'WB'}

    ];


    //DATAVIEW
    const [products, setProducts] = useState(null);
    const [layout, setLayout] = useState('list');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);

    let originalRows = [];

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

    const op = useRef(null);
    const basicScenario =
        {

            scenarioName:"name",
            scenarioPeriod: {
                scenarioStart:0,
                scenarioEnd:0
            },
            scenarioId:0,
            landTypes:[
                {
                    landType:"Tree-covered",
                    landId:"treecovered",
                    landCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    endLandCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    breakDownLimit:{
                        value:0,
                        unit:"ha"
                    },
                    breakDown:[
                        {
                            landType:"Grassland",
                            landId:"grassland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Cropland",
                            landId:"cropland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Wetland",
                            landId:"wetland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Artificial area",
                            landId:"artificialarea",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Bare land",
                            landId:"bareland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Water body",
                            landId:"waterbody",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        }
                    ]
                },
                {
                    landType:"Grassland",
                    landId:"grassland",
                    landCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    endLandCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    breakDownLimit:{
                        value:0,
                        unit:"ha"
                    },
                    breakDown:[
                        {
                            landType:"Tree-covered",
                            landId:"treecovered",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Cropland",
                            landId:"cropland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Wetland",
                            landId:"wetland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Artificial area",
                            landId:"artificialarea",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Bare land",
                            landId:"bareland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Water body",
                            landId:"waterbody",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        }
                    ]
                },
                {
                    landType:"Cropland",
                    landId:"cropland",
                    landCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    breakDownLimit:{
                        value:0,
                        unit:"ha"
                    },
                    endLandCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    breakDown:[
                        {
                            landType:"Tree-covered",
                            landId:"treecovered",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Grassland",
                            landId:"grassland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Wetland",
                            landId:"wetland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Artificial area",
                            landId:"artificialarea",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Bare land",
                            landId:"bareland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Water body",
                            landId:"waterbody",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        }
                    ]
                },
                {
                    landType:"Wetland",
                    landId:"wetland",
                    landCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    endLandCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    breakDownLimit:{
                        value:0,
                        unit:"ha"
                    },
                    breakDown:[
                        {
                            landType:"Tree-covered",
                            landId:"treecovered",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Grassland",
                            landId:"grassland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Cropland",
                            landId:"cropland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Artificial area",
                            landId:"artificialarea",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Bare land",
                            landId:"bareland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Water body",
                            landId:"waterbody",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        }
                    ]
                },
                {
                    landType:"Artificial area",
                    landId:"artificialarea",
                    landCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    endLandCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    breakDownLimit:{
                        value:0,
                        unit:"ha"
                    },
                    breakDown:[
                        {
                            landType:"Tree-covered",
                            landId:"treecovered",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Grassland",
                            landId:"grassland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Cropland",
                            landId:"cropland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Wetland",
                            landId:"wetland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Bare land",
                            landId:"bareland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Water body",
                            landId:"waterbody",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        }
                    ]
                },
                {
                    landType:"Bare land",
                    landId:"bareland",
                    landCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    endLandCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    breakDownLimit:{
                        value:0,
                        unit:"ha"
                    },
                    breakDown:[
                        {
                            landType:"Tree-covered",
                            landId:"treecovered",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Grassland",
                            landId:"grassland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Cropland",
                            landId:"cropland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Wetland",
                            landId:"wetland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Artificial area",
                            landId:"artificialarea",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Water body",
                            landId:"waterbody",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        }
                    ]
                },
                {
                    landType:"Water body",
                    landId:"waterbody",
                    landCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    endLandCoverage:{
                        value:0,
                        unit:"ha"
                    },
                    breakDownLimit:{
                        value:0,
                        unit:"ha"
                    },
                    breakDown:[
                        {
                            landType:"Tree-covered",
                            landId:"treecovered",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Grassland",
                            landId:"grassland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Cropland",
                            landId:"cropland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Wetland",
                            landId:"wetland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Artificial area",
                            landId:"artificialarea",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        },
                        {
                            landType:"Bare land",
                            landId:"bareland",
                            landCoverage:{
                                value:0,
                                unit:"ha"
                            },
                        }
                    ]
                }
            ]
        }

    const coefficient = [
            {
                "id": "treecovered",
                "name": "Tree-covered",
                "non_editable":1,
                "row":[
                    {
                        "landType":"Tree-covered",
                        "value":1,
                        "id": "treecovered"
                    },
                    {
                        "landType":"Grassland",
                        "value":1,
                        "id": "grassland"
                    },
                    {
                        "landType":"Cropland",
                        "value":100,
                        "id": "cropland"
                    },
                    {
                        "landType":"Wetland",
                        "value":1,
                        "id": "wetland"
                    },
                    {
                        "landType":"Artificial area",
                        "value":0.1,
                        "id": "artificialarea"
                    },
                    {
                        "landType":"Bare land",
                        "value":0.1,
                        "id": "bareland"
                    },
                    {
                        "landType":"Water body",
                        "value":1,
                        "id": "waterbody"
                    }
                ]
            },
            {
                "id": "grassland",
                "name": "Grassland",
                "non_editable":2,
                "row":[
                    {
                        "landType":"Tree-covered",
                        "value":1,
                        "id": "treecovered"
                    },
                    {
                        "landType":"Grassland",
                        "value":1,
                        "id": "grassland"
                    },
                    {
                        "landType":"Cropland",
                        "value":100,
                        "id": "cropland"
                    },
                    {
                        "landType":"Wetland",
                        "value":1,
                        "id": "wetland"
                    },
                    {
                        "landType":"Artificial area",
                        "value":0.1,
                        "id": "artificialarea"
                    },
                    {
                        "landType":"Bare land",
                        "value":0.1,
                        "id": "bareland"
                    },
                    {
                        "landType":"Water body",
                        "value":1,
                        "id": "waterbody"
                    }
                ]
            },
            {
                "id": "cropland",
                "name": "Cropland",
                "non_editable":3,
                "row":[
                    {
                        "landType":"Tree-covered",
                        "value":50,
                        "id": "treecovered"
                    },
                    {
                        "landType":"Grassland",
                        "value":50,
                        "id": "grassland"
                    },
                    {
                        "landType":"Cropland",
                        "value":1,
                        "id": "cropland"
                    },
                    {
                        "landType":"Wetland",
                        "value":1.408450,
                        "id": "wetland"
                    },
                    {
                        "landType":"Artificial area",
                        "value":0.1,
                        "id": "artificialarea"
                    },
                    {
                        "landType":"Bare land",
                        "value":0.1,
                        "id": "bareland"
                    },
                    {
                        "landType":"Water body",
                        "value":1,
                        "id": "waterbody"
                    }
                ]
            },
            {
                "id": "wetland",
                "name": "Wetland",
                "non_editable":4,
                "row":[
                    {
                        "landType":"Tree-covered",
                        "value":1,
                        "id": "treecovered"
                    },
                    {
                        "landType":"Grassland",
                        "value":1,
                        "id": "grassland"
                    },
                    {
                        "landType":"Cropland",
                        "value":0.71,
                        "id": "cropland"
                    },
                    {
                        "landType":"Wetland",
                        "value":1,
                        "id": "wetland"
                    },
                    {
                        "landType":"Artificial area",
                        "value":0.1,
                        "id": "artificialarea"
                    },
                    {
                        "landType":"Bare land",
                        "value":0.1,
                        "id": "bareland"
                    },
                    {
                        "landType":"Water body",
                        "value":1,
                        "id": "waterbody"
                    }
                ]
            },
            {
                "id": "artificialarea",
                "name": "Artificial area",
                "non_editable":5,
                "row":[
                    {
                        "landType":"Tree-covered",
                        "value":2,
                        "id": "treecovered"
                    },
                    {
                        "landType":"Grassland",
                        "value":2,
                        "id": "grassland"
                    },
                    {
                        "landType":"Cropland",
                        "value":2,
                        "id": "cropland"
                    },
                    {
                        "landType":"Wetland",
                        "value":2,
                        "id": "wetland"
                    },
                    {
                        "landType":"Artificial area",
                        "value":1,
                        "id": "artificialarea"
                    },
                    {
                        "landType":"Bare land",
                        "value":1,
                        "id": "bareland"
                    },
                    {
                        "landType":"Water body",
                        "value":1,
                        "id": "waterbody"
                    }
                ]

            },
            {
                "id": "bareland",
                "name": "Bare land",
                "non_editable":6,
                "row":[
                    {
                        "landType":"Tree-covered",
                        "value":2,
                        "id": "treecovered"
                    },
                    {
                        "landType":"Grassland",
                        "value":2,
                        "id": "grassland"
                    },
                    {
                        "landType":"Cropland",
                        "value":2,
                        "id": "cropland"
                    },
                    {
                        "landType":"Wetland",
                        "value":2,
                        "id": "wetland"
                    },
                    {
                        "landType":"Artificial area",
                        "value":1,
                        "id": "artificialarea"
                    },
                    {
                        "landType":"Bare land",
                        "value":1,
                        "id": "bareland"
                    },
                    {
                        "landType":"Water body",
                        "value":1,
                        "id": "waterbody"
                    }
                ]
            },
            {
                "id": "waterbody",
                "name": "Water body",
                "non_editable":7,
                "row":[
                    {
                        "landType":"Tree-covered",
                        "value":1,
                        "id": "treecovered"
                    },
                    {
                        "landType":"Grassland",
                        "value":1,
                        "id": "grassland"
                    },
                    {
                        "landType":"Cropland",
                        "value":1,
                        "id": "cropland"
                    },
                    {
                        "landType":"Wetland",
                        "value":1,
                        "id": "wetland"
                    },
                    {
                        "landType":"Artificial area",
                        "value":1,
                        "id": "artificialarea"
                    },
                    {
                        "landType":"Bare land",
                        "value":1,
                        "id": "bareland"
                    },
                    {
                        "landType":"Water body",
                        "value":1,
                        "id": "waterbody"
                    }
                ]
            }
        ]
    const landCover = [
        {
            "id": "treecovered",
            "name": "Tree-covered",
            "non_editable":1,
            "row":[
                {
                    "landType":"Tree-covered",
                    "value":"",
                    "id": "treecovered"
                },
                {
                    "landType":"Grassland",
                    "value":"-",
                    "id": "grassland"
                },
                {
                    "landType":"Cropland",
                    "value":"-",
                    "id": "cropland"
                },
                {
                    "landType":"Wetland",
                    "value":"-",
                    "id": "wetland"
                },
                {
                    "landType":"Artificial area",
                    "value":"-",
                    "id": "artificialarea"
                },
                {
                    "landType":"Bare land",
                    "value":"-",
                    "id": "bareland"
                },
                {
                    "landType":"Water body",
                    "value":"",
                    "id": "waterbody"
                }
            ]
        },
        {
            "id": "grassland",
            "name": "Grassland",
            "non_editable":2,
            "row":[
                {
                    "landType":"Tree-covered",
                    "value":"+",
                    "id": "treecovered"
                },
                {
                    "landType":"Grassland",
                    "value":"",
                    "id": "grassland"
                },
                {
                    "landType":"Cropland",
                    "value":"+",
                    "id": "cropland"
                },
                {
                    "landType":"Wetland",
                    "value":"-",
                    "id": "wetland"
                },
                {
                    "landType":"Artificial area",
                    "value":"-",
                    "id": "artificialarea"
                },
                {
                    "landType":"Bare land",
                    "value":"-",
                    "id": "bareland"
                },
                {
                    "landType":"Water body",
                    "value":"",
                    "id": "waterbody"
                }
            ]
        },
        {
            "id": "cropland",
            "name": "Cropland",
            "non_editable":3,
            "row":[
                {
                    "landType":"Tree-covered",
                    "value":"+",
                    "id": "treecovered"
                },
                {
                    "landType":"Grassland",
                    "value":"-",
                    "id": "grassland"
                },
                {
                    "landType":"Cropland",
                    "value":"",
                    "id": "cropland"
                },
                {
                    "landType":"Wetland",
                    "value":"-",
                    "id": "wetland"
                },
                {
                    "landType":"Artificial area",
                    "value":"-",
                    "id": "artificialarea"
                },
                {
                    "landType":"Bare land",
                    "value":"-",
                    "id": "bareland"
                },
                {
                    "landType":"Water body",
                    "value":"",
                    "id": "waterbody"
                }
            ]
        },
        {
            "id": "wetland",
            "name": "Wetland",
            "non_editable":4,
            "row":[
                {
                    "landType":"Tree-covered",
                    "value":"-",
                    "id": "treecovered"
                },
                {
                    "landType":"Grassland",
                    "value":"-",
                    "id": "grassland"
                },
                {
                    "landType":"Cropland",
                    "value":"-",
                    "id": "cropland"
                },
                {
                    "landType":"Wetland",
                    "value":"",
                    "id": "wetland"
                },
                {
                    "landType":"Artificial area",
                    "value":"-",
                    "id": "artificialarea"
                },
                {
                    "landType":"Bare land",
                    "value":"-",
                    "id": "bareland"
                },
                {
                    "landType":"Water body",
                    "value":"",
                    "id": "waterbody"
                }
            ]
        },
        {
            "id": "artificialarea",
            "name": "Artificial area",
            "non_editable":5,
            "row":[
                {
                    "landType":"Tree-covered",
                    "value":"+",
                    "id": "treecovered"
                },
                {
                    "landType":"Grassland",
                    "value":"+",
                    "id": "grassland"
                },
                {
                    "landType":"Cropland",
                    "value":"+",
                    "id": "cropland"
                },
                {
                    "landType":"Wetland",
                    "value":"+",
                    "id": "wetland"
                },
                {
                    "landType":"Artificial area",
                    "value":"",
                    "id": "artificialarea"
                },
                {
                    "landType":"Bare land",
                    "value":"+",
                    "id": "bareland"
                },
                {
                    "landType":"Water body",
                    "value":"",
                    "id": "waterbody"
                }
            ]

        },
        {
            "id": "bareland",
            "name": "Bare land",
            "non_editable":6,
            "row":[
                {
                    "landType":"Tree-covered",
                    "value":"+",
                    "id": "treecovered"
                },
                {
                    "landType":"Grassland",
                    "value":"+",
                    "id": "grassland"
                },
                {
                    "landType":"Cropland",
                    "value":"+",
                    "id": "cropland"
                },
                {
                    "landType":"Wetland",
                    "value":"+",
                    "id": "wetland"
                },
                {
                    "landType":"Artificial area",
                    "value":"-",
                    "id": "artificialarea"
                },
                {
                    "landType":"Bare land",
                    "value":"",
                    "id": "bareland"
                },
                {
                    "landType":"Water body",
                    "value":"",
                    "id": "waterbody"
                }
            ]
        },
        {
            "id": "waterbody",
            "name": "Water body",
            "non_editable":7,
            "row":[
                {
                    "landType":"Tree-covered",
                    "value":"",
                    "id": "treecovered"
                },
                {
                    "landType":"Grassland",
                    "value":"",
                    "id": "grassland"
                },
                {
                    "landType":"Cropland",
                    "value":"",
                    "id": "cropland"
                },
                {
                    "landType":"Wetland",
                    "value":"",
                    "id": "wetland"
                },
                {
                    "landType":"Artificial area",
                    "value":"",
                    "id": "artificialarea"
                },
                {
                    "landType":"Bare land",
                    "value":"",
                    "id": "bareland"
                },
                {
                    "landType":"Water body",
                    "value":"",
                    "id": "waterbody"
                }
            ]
        }
    ]

    const climaticRegions = [
        {label: 'Temperate Dry', value: 0.80},
        {label: 'Temperate Moist', value: 0.69},
        {label: 'Tropical Dry', value: 0.58},
        {label: 'Tropical Moist', value: 0.48},
        {label: 'Tropical Montane', value: 0.64}
    ];

    const statuses = [
        { label: 'Improvement', value: '+' },
        { label: 'Stable', value: '' },
        { label: 'Degradation', value: '-' }
    ];

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

    const enableQuestionnaire = () =>{
        setQuestionnaireHidden(false);
        //window.location.href='/scenariobuilder#sslma';

    }

    const renderListItem = (data) => {

        var checked = false;
        if(data.selected === "true"){
            checked = true
        }

        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={data.image} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name"><a href={data.landingPage} target="_blank">{data.name}</a></div>
                        <div className="product-description" style={{textAlign:"justify",paddingRight:"20px"}}>
                            {data.description}
                        </div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <Link to={{
                            pathname:"/scenariobuilder",
                            hash:"#sslma"
                        }}>
                            <Button label="Select" onClick={enableQuestionnaire}/>
                        </Link>

                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.category}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <img src={data.image} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                    </div>
                    <div className="product-grid-item-bottom justify-content-center">
                        <Button icon="pi pi-shopping-cart" label="Propose to Team" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list'){
            return renderListItem(product);
        }else if (layout === 'grid') {
            return renderGridItem(product);
        }
    }

    const sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
    ];

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-12" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const header = renderHeader();


    useEffect(() => {


        const projectInfo = ls.get("project_info");
        const regionDetails = ls.get("regionDetails");
        const regionLandCoverTypes = ls.get("regionLandCoverTypes");

        initializeLUQuestionnaires();
        if(regionDetails
            && Object.keys(regionDetails).length === 0 && regionDetails.constructor === Object){
            setNoNewProject(true);

        }else{
            const qvantumService = new QvantumService();

            var country = regionDetails.country;
            var adminLevel = regionDetails.administrationLevel;


            var areaInHectares = 0;
            regionLandCoverTypes.data[0].classes.forEach(
                (item) =>{
                    areaInHectares = areaInHectares+item.data.absolute_value;
                }
            )


            var newGaugeValues = [];
            newGaugeValues.push(areaInHectares);
            newGaugeValues.push(-1*regionLandCoverTypes.initialHectares);
            setGaugeValues([...newGaugeValues]);

            qvantumService.getFullGADMPolygon(regionDetails.chosenPoint,adminLevel).then(
                (response)=>{
                    var requestedCountry = null
                    if(projectInfo.iso_code_2 === "TN"){
                        requestedCountry = "TUN"
                    }else if (projectInfo.iso_code_2 === "BF"){
                        requestedCountry = "BFA"
                    }
                    qvantumService.getLDRiskLayerData(requestedCountry).then(
                        layers =>{
                            layers[0].administrationLevel = '1';
                            layers[0].point = response;
                            setLayersData(layers);
                        }
                    )
                }
            )

            const productService = new ProductService();
            productService.getProducts().then(data => setProducts(data));

            coefficient[0].row[2].value = climaticRegion;
            coefficient[1].row[2].value = climaticRegion;
            //
            coefficient[2].row[0].value = (1/climaticRegion).toFixed(5);
            coefficient[2].row[1].value = (1/climaticRegion).toFixed(5);
            setCustomer2(coefficient);
            setLandCoverItem(landCover);
        }



    }, []);

    const interactiveItems = [
        {
            label: 'Land Use',
            command: (event) => {
                setStep1Hidden(false);
                setStep2Hidden(true);
                setStep3Hidden(true);
            }
        },
        {
            label: 'Land Management',
            command: (event) => {
                setStep1Hidden(true);
                setStep2Hidden(false);
                setStep3Hidden(true);
            }
        },
        {
            label: 'Soil Organic Carbon',
            command: (event) => {
                setStep1Hidden(true);
                setStep2Hidden(false);
                setStep3Hidden(true);
            }
        },
        {
            label: 'Vegetation Productivity',
            command: (event) => {
                setStep1Hidden(true);
                setStep2Hidden(false);
                setStep3Hidden(true);
            }
        }
    ];


    const chosenTabValue = (value) => {

        if(value === "anticipated_land_degradation"){
            setLDHidden(false);
            setLDNHidden(true);
            setSDGHidden(true);
        }else if(value === "plan_for_ldn"){
            setLDHidden(true);
            setLDNHidden(false);
            setSDGHidden(true);
        }else if(value === "sdg15"){
            setLDHidden(true);
            setLDNHidden(true);
            setSDGHidden(false);
        }
    }

    const enableCheckLandDegradation = ()=>{
        setLDHidden(true);
        setLDNHidden(true);
        setSDGHidden(false);
        setKey("sdg15");
    }

    const onScenarioSelect = (e) => {
        setSelectedScenario(e.value);
    }

    const scenarioNameBody = (rowData) => {
        let link = rowData.scenarioName
        return(
            <Link to={{
                pathname:"/scenariobuilder",
                hash:"#"+link
            }}>
                {rowData.scenarioName}
            </Link>);
    }

    const scenarioStartYearBody = (rowData) => {
        return rowData.scenarioPeriod.scenarioStart;
    }

    const scenarioEndYearBody = (rowData) => {
        return rowData.scenarioPeriod.scenarioEnd;
    }

    const leftContents = (
        <React.Fragment>
            <Button
                type="button"
                icon="fad fa-eye"
                label="Overview"
                onClick={(e) => op.current.toggle(e)}
                disabled={overviewState}
            />
            <OverlayPanel
                ref={op}
                showCloseIcon id="overlay_panel"
                style={{ width: '450px' }}
                appendTo={document.body}
            >
                <DataTable value={scenarios} selectionMode="single" paginator rows={5}
                           selection={selectedScenario} onSelectionChange={onScenarioSelect}>
                    <Column field="name" header="Name" sortable body={scenarioNameBody}/>
                    <Column field="start" header="Start Year"  body={scenarioStartYearBody}/>
                    <Column field="end" header="End Year"  body={scenarioEndYearBody}/>

                </DataTable>
            </OverlayPanel>

            <Button
                label="New Scenario"
                icon="fad fa-layer-plus"
                className="p-ml-2"
                onClick={() => setScenarioModalVisible(true)}
                disabled = {newScenarioState}
            />
        </React.Fragment>
    );

    const resetScenario = ()=>{
        setScenarios([]);
        setMinDate(2021);
        setMaxDate(2030);
        setStartDate(2021);
        setEndDate(2030);

        const regionLandCoverTypes = ls.get("regionLandCoverTypes");

        var areaInHectares = 0;
        regionLandCoverTypes.data[0].classes.forEach(
            (item) =>{
                areaInHectares = areaInHectares+item.data.absolute_value;
            }
        )

        var newGaugeValues = [];
        newGaugeValues.push(areaInHectares);
        newGaugeValues.push(-1*regionLandCoverTypes.initialHectares);
        setGaugeValues([...newGaugeValues]);

        setNewScenarioState(false);
        setDeleteState(true);
        setOverviewState(true);

    }

    const renderResetFooter = () => {
        return (
            <div>
                <Button label="Yes, Delete all scenarios"
                        icon="fad fa-calendar-times"
                        className="p-button-danger"
                        onClick={() => {
                            resetScenario();
                            setResetModalVisible(false);
                        }}
                        autoFocus />
            </div>
        );
    }

    const rightContents = (
        <React.Fragment>
            <Button
                icon="fad fa-trash-alt"
                className="p-button-danger"
                onClick={() =>setResetModalVisible(true)}
                disabled = {deleteState}
            />
            <Dialog
                header="Delete All Scenarios"
                visible={resetModalVisible}
                style={{ width: '50vw' }}
                footer={renderResetFooter()}
                onHide={() => setResetModalVisible(false)}
            >
                Are you sure you want to proceed?

            </Dialog>
        </React.Fragment>
    );

    const renderFooter = () => {
        return (
            <div>
                <Button label="Create"
                        icon="fad fa-calendar-plus"
                        onClick={() => {
                            prepareScenario();
                        }}
                        autoFocus />
            </div>
        );
    }

    const prepareScenario = () => {
        let scenarioEndDate = -1;

        if(startDate === endDate){
            setEndDate(maxDate);
            setMinDate(startDate);
            setStartDate(startDate);
            scenarioEndDate = maxDate;
        }else{
            setMinDate(endDate);
            setStartDate(endDate);
            scenarioEndDate = endDate;
        }

        setScenarioModalVisible(false);
        setNewScenarioState(true);
        setDeleteState(false);
        setOverviewState(false);
        let scenarioStartDate = startDate;

        if(scenarios.length === 0){
            let initialScenario = basicScenario;
            initialScenario.scenarioName = "Scenario "+scenarioStartDate+"-"+scenarioEndDate;
            initialScenario.scenarioPeriod.scenarioStart = scenarioStartDate;
            initialScenario.scenarioPeriod.scenarioEnd = scenarioEndDate;

            //ls.set("regionDetails",value);
            const lu = ls.get("regionLandCoverTypes");

            //console.log(lu);
            lu.data[0].classes.forEach(
                (lutype)=>{
                    if(lutype.class === "Tree-covered"){
                        initialScenario.landTypes[0].landCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[0].endLandCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[0].breakDownLimit.value = lutype.data.absolute_value;
                    }else if(lutype.class === "Grassland"){
                        initialScenario.landTypes[1].landCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[1].endLandCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[1].breakDownLimit.value = lutype.data.absolute_value;
                    }else if(lutype.class === "Cropland"){
                        initialScenario.landTypes[2].landCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[2].endLandCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[2].breakDownLimit.value = lutype.data.absolute_value;
                    }else if(lutype.class === "Wetland"){
                        initialScenario.landTypes[3].landCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[3].endLandCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[3].breakDownLimit.value = lutype.data.absolute_value;
                    }else if(lutype.class === "Artificial"){
                        initialScenario.landTypes[4].landCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[4].endLandCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[4].breakDownLimit.value = lutype.data.absolute_value;
                    }else if(lutype.class === "Water body"){
                        initialScenario.landTypes[5].landCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[5].endLandCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[5].breakDownLimit.value = lutype.data.absolute_value;
                    }else if(lutype.class === "Bare land"){
                        initialScenario.landTypes[6].landCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[6].endLandCoverage.value = lutype.data.absolute_value;
                        initialScenario.landTypes[6].breakDownLimit.value = lutype.data.absolute_value;
                    }

                }
            )

            let addScenario = scenarios;
            addScenario.push(initialScenario);
            setScenarios([...addScenario]);
        }else{
            const newScenario = scenarios.map(
                (item,i)=>{
                    if(scenarios.length-1 === i){
                        //Deep Copy
                        let copiedItem = JSON.parse(JSON.stringify(item));
                        copiedItem.scenarioName = "Scenario "+scenarioStartDate+"-"+scenarioEndDate;
                        copiedItem.scenarioPeriod.scenarioStart = scenarioStartDate;
                        copiedItem.scenarioPeriod.scenarioEnd = scenarioEndDate;

                        copiedItem.landTypes.forEach(
                            (landType) => {
                                landType.landCoverage.value = landType.endLandCoverage.value.valueOf();
                                landType.landCoverage.unit = "ha";
                                landType.breakDownLimit.value = landType.endLandCoverage.value.valueOf();
                                landType.landCoverage.unit = "ha";
                                landType.breakDown.forEach(
                                    (breakType)=>{
                                        breakType.landCoverage.value = 0;
                                    }
                                )
                            }
                        )
                        return copiedItem;
                    }
                }
            )

            let addScenario = scenarios;
            addScenario.push(newScenario[newScenario.length-1]);
            setScenarios([...addScenario]);
        }

    }

    const validateStartDate = (e) =>{
        //setStartDate(e.value)
        /*if(e.value >= minDate){
            setStartDate(e.value)
            if(endDate <= maxDate){
                setCreateScenarioButton(false);
            }
        }else{
            setStartDate(e.value)
            setCreateScenarioButton(true);
        }*/
    }

    const validateEndDate = (e) =>{
        setEndDate(e.value);
        /*if(e.value<maxDate){
            setEndDate(e.value);
            setCreateScenarioButton(false);
        }else{
            setEndDate(e.value);
            setCreateScenarioButton(true);
        }*/
    }

    const saveScenario = (value,scenario) =>{

        const scenarioDegradation = {
            scenario:scenario,
            impactMatrix:[]
        }

        const impact = landCoverItem.map(
            (lcItem)=>{
                var row = {values:[]};
                lcItem.row.forEach(
                    (cell) => {
                        if(cell.value === "+"){
                            row.values.push(1);
                        }else if(cell.value === "-"){
                            row.values.push(-1);
                        }else{
                            row.values.push(0);
                        }
                    }
                )

                return row;
            }
        )

        scenarioDegradation.impactMatrix = impact;
        const regionDetails = ls.get("regionDetails");

        const qvantumService = new QvantumService();
        qvantumService.calculateScenario(regionDetails,scenarioDegradation).then(
            (result) =>{
                var newGaugeValues = [];
                var oldGaugeValues = gaugeValues
                newGaugeValues.push(result.data.total_final_lc);
                newGaugeValues.push(oldGaugeValues[1]+result.data.total_impact_sum);
                setGaugeValues([...newGaugeValues]);
            })

        if((value === true)&&(endDate<2030)){
            setNewScenarioState(false);
        }
    }

    const socRadioSelection = (value) =>{
        if(value === 'matrix'){
            setSocMatrix(false);
        }else{
            setSocMatrix(true);
        }
    }

    const customer2TableHeader = (
        <div className="table-header">
            <div>
                SOC Transfer Coefficient Matrix<br/>
                <span style={{fontWeight:"300",fontSize:"14px"}}>
                    *proportional in C stocks after 20 years of LC change
                </span>
            </div>
            <div className="p-justify-end">
                <Dropdown
                    value={climaticRegion}
                    options={climaticRegions}
                    onChange={(e) =>{
                        setEnableLoadDefaults(false);
                        setClimaticRegion(e.value);
                    } }
                    placeholder="Select a Climatic Region"
                />
                <Button
                    label="Load Trends.Earth defaults"
                    className="p-ml-2"
                    disabled = {enableLoadDefaults}
                    onClick={() => {
                            setEnableLoadDefaults(true)
                            customer2[0].row[2].value = climaticRegion;
                            customer2[1].row[2].value = climaticRegion;
                            //
                            customer2[2].row[0].value = (1/climaticRegion).toFixed(5);
                            customer2[2].row[1].value = (1/climaticRegion).toFixed(5);
                        }
                    }
                />
            </div>
        </div>
    );

    const loadTrendsEarthDefault = () =>{
        setLandCoverItem(landCover);
        setTrendsEarthStatus(true);
    }

    const landCoverTableHeader = (
        <div className="table-header">
            <div>
                <div className="p-grid p-col-12 p-justify-end">
                    <Button label="Load Trends.Earth defaults"
                            onClick={loadTrendsEarthDefault}
                            disabled={trendsEarthStatus}
                    />
                </div>
                <center><div>LU type in target year</div></center>
            </div>
        </div>
    );


    const baseColumn = (data) => {
        return (
            <>
                {data.name}
            </>
        );
    };

    const treecoveredColumn = (data) => {

        let className = "medium";
        if(data.row[0].value === 1){
            className = "medium";
        }else if(data.row[0].value > 1){
            className = "high";
        }else if(data.row[0].value < 1){
            className = "low";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[0].value}
            </div>
        );
    };

    const grasslandColumn = (data) => {

        let className = "medium";
        if(data.row[1].value === 1){
            className = "medium";
        }else if(data.row[1].value > 1){
            className = "high";
        }else if(data.row[1].value < 1){
            className = "low";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[1].value}
            </div>
        );
    };

    const croplandColumn = (data) => {
        let className = "medium";
        if(data.row[2].value === 1){
            className = "medium";
        }else if(data.row[2].value > 1){
            className = "high";
        }else if(data.row[2].value < 1){
            className = "low";
        }
        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[2].value}
            </div>
        );
    };

    const wetlandColumn = (data) => {
        let className = "medium";
        if(data.row[3].value === 1){
            className = "medium";
        }else if(data.row[3].value > 1){
            className = "high";
        }else if(data.row[3].value < 1){
            className = "low";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[3].value}
            </div>
        );
    };

    const artificialareaColumn = (data) => {
        let className = "medium";
        if(data.row[4].value === 1){
            className = "medium";
        }else if(data.row[4].value > 1){
            className = "high";
        }else if(data.row[4].value < 1){
            className = "low";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[4].value}
            </div>
        );
    };

    const barelandColumn = (data) => {

        let className = "medium";
        if(data.row[5].value === 1){
            className = "medium";
        }else if(data.row[5].value > 1){
            className = "high";
        }else if(data.row[5].value < 1){
            className = "low";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[5].value}
            </div>
        );
    };

    const waterbodyColumn = (data) => {

        let className = "medium";
        if(data.row[6].value === 1){
            className = "medium";
        }else if(data.row[6].value > 1){
            className = "high";
        }else if(data.row[6].value < 1){
            className = "low";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[5].value}
            </div>
        );
    };

    const onRowEditSave = (event) => {
        let currentMatrixState = JSON.parse(JSON.stringify(customer2));
        let data = event.data;
        let updatedMatrix = currentMatrixState.map(
             (item) => {
                if(item.id === event.data.id){
                    item.row.forEach(
                        (itemRow) =>{
                            let idRow = itemRow.id;
                            if(idRow === "treecovered"){
                                if(data.treecovered !== undefined){
                                    var value = data.treecovered
                                    itemRow.value = data.treecovered.valueOf();
                                }
                            }else if(idRow === "grassland"){
                                if(data.grassland !== undefined){
                                    itemRow.value = data.grassland;
                                }
                            }else if(idRow === "cropland"){
                                if(data.cropland !== undefined){
                                    itemRow.value = data.cropland;
                                }
                            }else if(idRow === "wetland"){
                                if(data.wetland !== undefined){
                                    itemRow.value = data.wetland;
                                }
                            }else if(idRow === "artificialarea"){
                                if(data.artificialarea !== undefined){
                                    itemRow.value = data.artificialarea;
                                }
                            }else if(idRow === "bareland"){
                                if(data.bareland !== undefined){
                                    itemRow.value = data.bareland;
                                }
                            }else if(idRow === "waterbody"){
                                if(data.waterbody !== undefined){
                                    itemRow.value = data.waterbody;
                                }
                            }
                        }
                    )
                }
                return item;
             }
        )
        setCustomer2([...updatedMatrix]);
    }

    const onEditorValueChange = ( props, value) => {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        //dataTableFuncMap[`${productKey}`](updatedProducts);
    }

    const inputTextEditor = (props) => {

        const header = props.header;

        var value = null;
        props.rowData.row.forEach(
            (item)=>{
                if(item.landType === header){
                    value = item.value;
                }
            }
        )

        return (
            <div>
                <InputNumber
                    showButtons={true}
                    value={value}
                    onValueChange={(e) => onEditorValueChange( props, e.value)}
                    size={3}
                    min={0.001}
                    step={0.1}
                />
            </div>
        )
    }

    const treecoveredEditor = (props) => {

        if(props.rowIndex === 0){
            return false;
        }else{
            return inputTextEditor(props);
        }
    }

    const grasslandEditor = (props) => {

        if(props.rowIndex === 1){
            return false;
        }else{
            return inputTextEditor(props);
        }
    }

    const croplandEditor = (props) => {

        if(props.rowIndex === 2){
            return false;
        }else{
            return inputTextEditor(props);
        }
    }

    const wetlandEditor = (props) => {

        if(props.rowIndex === 3){
            return false;
        }else{
            return inputTextEditor(props);
        }
    }

    const artificialareaEditor = (props) => {

        if(props.rowIndex === 4){
            return false;
        }else{
            return inputTextEditor(props);
        }
    }

    const barelandEditor = (props) => {

        if(props.rowIndex === 5){
            return false;
        }else{
            return inputTextEditor(props);
        }
    }

    const waterbodyEditor = (props) => {

        if(props.rowIndex === 6){
            return false;
        }else{
            return inputTextEditor(props);
        }
    }

    const treecoveredStatusColumn = (data) => {

        let className = "medium";

        if(data.row[0].value === '-'){
            className = "low";
        }else if(data.row[0].value === '+'){
            className = "high";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[0].value}
            </div>
        );
    }

    const treecoveredStatusEditor = (props) => {


        var selectValue = "";
        props.rowData.row.forEach((item)=>{
                if(item.id===props.field){
                    selectValue = item.value
                }
            }
        )

        //console.log(props.rowData.row[props.rowIndex].value);
        return (
            <Dropdown value={selectValue}
                      options={statuses}
                      onChange={
                          (e) =>{
                              onStatusEditorValueChange(props, e.value)
                          }
                      }
                      style={{ width: '100%' }}
                      placeholder="Select Status"
                      itemTemplate={(option) => {
                          var classBadge = "lowstock";
                          if(option.value === "+"){
                              classBadge = "instock";
                          }else if(option.value === "-") {
                              classBadge = "outofstock";
                          }

                          return <span className={`product-badge status-${classBadge}`}>{option.label}</span>
                      }} />
        );
    }

    const grasslandStatusColumn = (data) => {

        let className = "medium";

        if(data.row[1].value === '-'){
            className = "low";
        }else if(data.row[1].value === '+'){
            className = "high";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[1].value}
            </div>
        );
    }

    const croplandStatusColumn = (data) => {

        let className = "medium";

        if(data.row[2].value === '-'){
            className = "low";
        }else if(data.row[2].value === '+'){
            className = "high";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[2].value}
            </div>
        );
    }

    const wetlandStatusColumn = (data) => {

        let className = "medium";

        if(data.row[3].value === '-'){
            className = "low";
        }else if(data.row[3].value === '+'){
            className = "high";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[3].value}
            </div>
        );
    }

    const artificialareaStatusColumn = (data) => {

        let className = "medium";

        if(data.row[4].value === '-'){
            className = "low";
        }else if(data.row[4].value === '+'){
            className = "high";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[4].value}
            </div>
        );
    }

    const barelandStatusColumn = (data) => {

        let className = "medium";

        if(data.row[5].value === '-'){
            className = "low";
        }else if(data.row[5].value === '+'){
            className = "high";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[5].value}
            </div>
        );
    }

    const waterbodyStatusColumn = (data) => {

        let className = "medium";

        if(data.row[6].value === '-'){
            className = "low";
        }else if(data.row[6].value === '+'){
            className = "high";
        }

        return (
            <div className={className} style={{'textAlign':'center'}}>
                {data.row[6].value}
            </div>
        );
    };

    const onStatusEditorValueChange = ( props, value) => {

        props.rowData.row.forEach((item)=>{
                if(item.id === props.field){
                    item.value = value
                }
            }
        )

        let landCoverItemLocal = JSON.parse(JSON.stringify(landCoverItem));
        setLandCoverItem([...landCoverItemLocal]);

        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
    }

    const onStatusRowEditInit = (event) => {
        originalRows[event.index] = JSON.parse(JSON.stringify(event.data));


    }

    const onStatusRowEditCancel = (event) => {



        //delete originalRows[event.index];

        /*let landCoverItemLocal = JSON.parse(JSON.stringify(landCoverItem));
        console.log(landCoverItemLocal);
        landCoverItemLocal[event.index] = originalRows[event.index];
        console.log(landCoverItemLocal);
        delete originalRows[event.index];

        setLandCoverItem(landCoverItemLocal);*/
    }

    const onStatusRowEditSave = (event) => {

        let landCoverItemLocal = JSON.parse(JSON.stringify(landCoverItem));
        let data = event.data;
        let updatedLandCoverItem = landCoverItemLocal.map(
            (item) => {
                if(item.id === event.data.id){
                    item.row.forEach(
                        (itemRow) =>{
                            let idRow = itemRow.id;
                            if(idRow === "treecovered"){
                                if(data.treecovered !== undefined){
                                    var value = data.treecovered
                                    itemRow.value = data.treecovered.valueOf();
                                }
                            }else if(idRow === "grassland"){
                                if(data.grassland !== undefined){
                                    itemRow.value = data.grassland;
                                }
                            }else if(idRow === "cropland"){
                                if(data.cropland !== undefined){
                                    itemRow.value = data.cropland;
                                }
                            }else if(idRow === "wetland"){
                                if(data.wetland !== undefined){
                                    itemRow.value = data.wetland;
                                }
                            }else if(idRow === "artificialarea"){
                                if(data.artificialarea !== undefined){
                                    itemRow.value = data.artificialarea;
                                }
                            }else if(idRow === "bareland"){
                                if(data.bareland !== undefined){
                                    itemRow.value = data.bareland;
                                }
                            }else if(idRow === "waterbody"){
                                if(data.waterbody !== undefined){
                                    itemRow.value = data.waterbody;
                                }
                            }
                        }
                    )
                }
                return item;
            }
        )

        setTrendsEarthStatus(false);
        setLandCoverItem([...updatedLandCoverItem]);
    }

    const renderFooterD = (name) => {
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

    const buildQuestionnaire = () =>{
        return (
            <div>{
                selectedLandUsage.map(
                    (item)=>{
                        return (
                            <div id={item.name} hidden={!item.visible} className="p-mt-6">
                                <h5 id="sslma">Assessment of Selected SLM Technology</h5>
                                <div className="p-grid p-mt-2">
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
                                        </div>
                                    </div>
                                    <div className="p-card-body">
                                        <div
                                            className="p-grid
                                            p-align-center
                                            vertical-container
                                            p-card-content">

                                            <div className="p-col-8">
                                                <LandManagementFlowerGraph
                                                    data={item.spiderData}
                                                />
                                            </div>
                                            <div className="p-col-4">
                                                <div className="p-mr-4">
                                                    <h5>
                                                        Propose this technology for the LU type:
                                                    </h5>
                                                    <Dropdown
                                                        value={luss}
                                                        options={LUSelectItems}
                                                        onChange={(e) => setLuss(e.value)}
                                                        placeholder="Select an LU Type"
                                                    />
                                                    <div className="p-mt-6">
                                                        <Button label="Propose to the Team"/>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="p-grid p-col-12 p-justify-end">

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

    const calculateNeutralityMatrix = () =>{
        if(socMatrix === false){
            const comatrix = customer2.map(
                (coitem)=>{
                    var row = {values:[]};
                    coitem.row.forEach(
                        (cell) => {
                            if (typeof cell.value === 'string'){
                                row.values.push(parseFloat(cell.value));
                            }else{
                                row.values.push(cell.value);
                            }
                        }
                    )
                    return row;
                }
            )

            const impact = landCoverItem.map(
                (lcItem)=>{
                    var row = {values:[]};
                    lcItem.row.forEach(
                        (cell) => {
                            if(cell.value === "+"){
                                row.values.push(1);
                            }else if(cell.value === "-"){
                                row.values.push(-1);
                            }else{
                                row.values.push(0);
                            }
                        }
                    )

                    return row;
                }
            )

            var totalYears = 0;

            const impactScenarios = scenarios.map(
                (scenario) => {

                    var scenarioStart = scenario.scenarioPeriod.scenarioStart;
                    var scenarioEnd = scenario.scenarioPeriod.scenarioEnd;

                    if(scenarioStart
                        === scenarioEnd){
                        scenarioEnd = 2030
                    }
                    totalYears = totalYears+(scenarioEnd - scenarioStart);

                    var item = {
                        scenarioStart:scenarioStart,
                        scenarioEnd:scenarioEnd,
                        scenarioPeriod: (scenarioEnd - scenarioStart)+1,
                        landTypes: scenario.landTypes
                    }

                    return item;
                }
            )

            const scenarioSOC = {
                totalYears: totalYears+1,
                scenarios:impactScenarios,
                impactMatrix:impact,
                comatrix:comatrix

            }

            const regionDetails = ls.get("regionDetails");

            const qvantumService = new QvantumService();
            qvantumService.calculateSOCScenario(regionDetails,scenarioSOC).then(
                (socScenarios)=>{
                    setSocCalculationScenarios(socScenarios);
                    const regionLandCoverTypes = ls.get("regionLandCoverTypes");
                    var initialDegradation = -1*regionLandCoverTypes.initialHectares;
                    var lastValue = -1*regionLandCoverTypes.initialHectares;
                    var lastDate = 0;


                    var initialColor = "#d43333";
                    if(initialDegradation>=0){
                        initialColor= "#398e3b";
                    }else if(initialDegradation<0){
                        initialColor= "#d43333";
                    }

                    var initialColumn = {
                        category:"2021",
                        value:initialDegradation,
                        open:0,
                        stepValue:initialDegradation,
                        color:initialColor,
                        displayValue:initialDegradation
                    }

                    var waterfall = socScenarios.data.scenarios.map(
                        (scenarioLocal) =>{
                            var category = "( "
                                +scenarioLocal.scenarioStart + " - "+ scenarioLocal.scenarioEnd+" )";
                            var value = lastValue + scenarioLocal.total_impact_sum;
                            var open = lastValue;
                            var stepValue = lastValue + scenarioLocal.total_impact_sum;
                            var displayValue = scenarioLocal.total_impact_sum;



                            var color = "#d43333";
                            if(displayValue>=0){
                                color= "#398e3b";
                            }else if(displayValue<0){
                                color= "#d43333";
                            }

                            var column = {
                                category:category,
                                value:value,
                                open:open,
                                stepValue:stepValue,
                                color:color,
                                displayValue:displayValue
                            }

                            lastValue = value;

                            if(lastDate < scenarioLocal.scenarioEnd ){
                                lastDate = scenarioLocal.scenarioEnd;

                            }
                            return column;
                        }
                    );

                    var lastColor = "#d43333";
                    if(waterfall[waterfall.length-1].value>=0){
                        lastColor= "#398e3b";
                    }else if(waterfall[waterfall.length-1].value<0){
                        lastColor= "#d43333";
                    }

                    var lastColumn = {
                        category:lastDate.toString(),
                        value:waterfall[waterfall.length-1].value,
                        open:0,
                        stepValue:waterfall[waterfall.length-1].stepValue,
                        color:lastColor,
                        displayValue:waterfall[waterfall.length-1].value
                    }
                    waterfall.unshift(initialColumn);
                    waterfall.push(lastColumn);

                    setWaterfallValues(waterfall);
                }
            )


        }
        else{

            const comatrix = customer2.map(
                (coitem)=>{
                    var row = {values:[]};
                    coitem.row.forEach(
                        (cell) => {
                            row.values.push(1);
                        }
                    )
                    return row;
                }
            )

            const impact = landCoverItem.map(
                (lcItem)=>{
                    var row = {values:[]};
                    lcItem.row.forEach(
                        (cell) => {
                            if(cell.value === "+"){
                                row.values.push(1);
                            }else if(cell.value === "-"){
                                row.values.push(-1);
                            }else{
                                row.values.push(0);
                            }
                        }
                    )

                    return row;
                }
            )

            var totalYears = 0;

            const impactScenarios = scenarios.map(
                (scenario) => {

                    var scenarioStart = scenario.scenarioPeriod.scenarioStart;
                    var scenarioEnd = scenario.scenarioPeriod.scenarioEnd;

                    if(scenarioStart
                        === scenarioEnd){
                        scenarioEnd = 2030
                    }
                    totalYears = totalYears+(scenarioEnd - scenarioStart);

                    var item = {
                        scenarioStart:scenarioStart,
                        scenarioEnd:scenarioEnd,
                        scenarioPeriod: (scenarioEnd - scenarioStart)+1,
                        landTypes: scenario.landTypes
                    }

                    return item;
                }
            )


            const scenarioSOC = {
                totalYears: totalYears+1,
                scenarios:impactScenarios,
                impactMatrix:impact,
                comatrix:comatrix

            }

            const regionDetails = ls.get("regionDetails");

            const qvantumService = new QvantumService();
            qvantumService.calculateSOCScenario(regionDetails,scenarioSOC).then(
                (socScenarios)=>{
                    setSocCalculationScenarios(socScenarios);

                    const regionLandCoverTypes = ls.get("regionLandCoverTypes");
                    var initialDegradation = -1*regionLandCoverTypes.initialHectares;
                    var lastValue = -1*regionLandCoverTypes.initialHectares;
                    var lastDate = 0;


                    var initialColor = "#d43333";
                    if(initialDegradation>=0){
                        initialColor= "#398e3b";
                    }else if(initialDegradation<0){
                        initialColor= "#d43333";
                    }

                    var initialColumn = {
                        category:"2021",
                        value:initialDegradation,
                        open:0,
                        stepValue:initialDegradation,
                        color:initialColor,
                        displayValue:initialDegradation
                    }

                    var waterfall = socScenarios.data.scenarios.map(
                        (scenarioLocal) =>{
                            var category = "( "
                                +scenarioLocal.scenarioStart + " - "+ scenarioLocal.scenarioEnd+" )";
                            var value = lastValue + scenarioLocal.total_impact_sum;
                            var open = lastValue;
                            var stepValue = lastValue + scenarioLocal.total_impact_sum;
                            var displayValue = scenarioLocal.total_impact_sum;



                            var color = "#d43333";
                            if(displayValue>=0){
                                color= "#398e3b";
                            }else if(displayValue<0){
                                color= "#d43333";
                            }

                            var column = {
                                category:category,
                                value:value,
                                open:open,
                                stepValue:stepValue,
                                color:color,
                                displayValue:displayValue
                            }

                            lastValue = value;

                            if(lastDate < scenarioLocal.scenarioEnd ){
                                lastDate = scenarioLocal.scenarioEnd;

                            }
                            return column;
                        }
                    );

                    var lastColor = "#d43333";
                    if(waterfall[waterfall.length-1].value>=0){
                        lastColor= "#398e3b";
                    }else if(waterfall[waterfall.length-1].value<0){
                        lastColor= "#d43333";
                    }

                    var lastColumn = {
                        category:lastDate.toString(),
                        value:waterfall[waterfall.length-1].value,
                        open:0,
                        stepValue:waterfall[waterfall.length-1].stepValue,
                        color:lastColor,
                        displayValue:waterfall[waterfall.length-1].value
                    }
                    waterfall.unshift(initialColumn);
                    waterfall.push(lastColumn);

                    setWaterfallValues(waterfall);


                }
            )


        }
    }

    return (
        <div className="layout-dashboard">
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card card-w-title p-shadow-8">
                        <BootstrapLandUsePlanning selectedValue={chosenTabValue} activateTab={key}/>
                        <div hidden={ldHidden}>

                            <Glowglobe
                                toolbar="no"
                                styleEditor={false}
                                zoom={3}
                                layers={layersData}
                            />


                        </div>
                        <div hidden={ldnHidden} className="p-mt-4">
                            <div className="p-grid p-align-center vertical-container">
                                <div className="p-col">
                                    <h5>Plan Completeness</h5>
                                    <ProgressBar value={progressBarValue} showValue={true} />
                                </div>
                                <div className="p-col-fixed p-grid justify-content-center" style={{width:"350px"}}>
                                    {
                                        gaugeValues?
                                            <DegradationGauge gaugeValues={gaugeValues}/>
                                            :console.log()

                                    }

                                    <Button
                                        label="View Neutrality Matrix / Map"
                                        className="p-button-raised"
                                        disabled={ldButton}
                                        onClick={enableCheckLandDegradation}
                                    />
                                </div>
                            </div>
                            <div className="p-mt-4 p-mb-4">
                                <h5>Planning Steps</h5>
                            </div>
                            <div className="p-mb-4">
                                <Steps model={interactiveItems}
                                       activeIndex={activeIndex}
                                       onSelect={(e) => setActiveIndex(e.index)}
                                       readOnly={true}
                                />
                            </div>

                            <div id="step_1" hidden={step1hidden} className="p-grid">
                                <div className="p-col-12">
                                    <div className="">
                                        <Toolbar left={leftContents} right={rightContents} />
                                        <Dialog
                                            header="New Scenario"
                                            visible={scenarioModalVisible}
                                            style={{ width: '50vw' }}
                                            footer={renderFooter()}
                                            onHide={() => setScenarioModalVisible(false)}
                                            >
                                            <div className="p-grid ">
                                                <div className="p-field p-md-4">
                                                    <label htmlFor="start_year">Start Year</label>
                                                    <InputMask
                                                        id="start_year"
                                                        mask="9999"
                                                        slotChar="yyyy"
                                                        value={startDate}
                                                        onChange={(e) => validateStartDate(e)}
                                                        disabled={true}
                                                    >
                                                    </InputMask>
                                                </div>
                                                <div className="p-field  p-md-4">
                                                    <label htmlFor="end_year">End Year</label>
                                                    <InputNumber
                                                        value={maxDate}
                                                        onValueChange={(e) => validateEndDate(e)}
                                                        showButtons
                                                        buttonLayout="horizontal"
                                                        decrementButtonClassName="p-button-danger"
                                                        incrementButtonClassName="p-button-success"
                                                        incrementButtonIcon="fad fa-plus"
                                                        decrementButtonIcon="fad fa-minus"
                                                        mode="decimal"
                                                        useGrouping={false}
                                                        min={startDate+1}
                                                        max={maxDate}
                                                    />
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>
                                    <div className="p-mt-4">
                                        <div>
                                            <h5>LU Transition Impact Matrix</h5>
                                        </div>
                                        <DataTable value={landCoverItem}
                                                   className="p-datatable-gridlines p-datatable-striped p-datatable-sm p-datatable-customers"
                                                   rows={10}
                                                   dataKey="id"
                                                   rowHover selection={selectedlandCoverItem}
                                                   editMode="row"
                                                   onSelectionChange={(e) => setSelectedlandCoverItem(e.value)}
                                                   header={landCoverTableHeader}
                                                   onRowEditSave={onStatusRowEditSave}
                                        >
                                            <Column field="baseColumn" header=""  body={baseColumn}></Column>
                                            <Column field="treecovered" header="Tree-covered"
                                                    editor={(props) => treecoveredStatusEditor(props)}
                                                    body={treecoveredStatusColumn}>
                                            </Column>
                                            <Column field="grassland" header="Grassland"
                                                    editor={(props) => treecoveredStatusEditor(props)}
                                                    body={grasslandStatusColumn}></Column>
                                            <Column field="cropland" header="Cropland"
                                                    editor={(props) => treecoveredStatusEditor(props)}
                                                    body={croplandStatusColumn}></Column>
                                            <Column field="wetland" header="Wetland"
                                                    editor={(props) => treecoveredStatusEditor(props)}
                                                    body={wetlandStatusColumn}></Column>
                                            <Column field="artificialarea" header="Artificial area"
                                                    editor={(props) => treecoveredStatusEditor(props)}
                                                    body={artificialareaStatusColumn}></Column>
                                            <Column field="bareland" header="Bare land"
                                                    editor={(props) => treecoveredStatusEditor(props)}
                                                    body={barelandStatusColumn}></Column>
                                            <Column field="waterbody" header="Water body"
                                                    editor={(props) => treecoveredStatusEditor(props)}
                                                    body={waterbodyStatusColumn}></Column>
                                            <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                                        </DataTable>
                                    </div>
                                    <div className="">
                                        {
                                            scenarios?
                                            scenarios.map(
                                                (item)=>{
                                                    return (
                                                    <div className="p-mt-6" id={item.scenarioName}>
                                                        <TransitionMatrix
                                                            scenario={item}
                                                            callback={saveScenario} />
                                                    </div>
                                                    )
                                                }
                                            )
                                            :console.log()
                                        }
                                    </div>

                                    <div className="p-mt-4 p-mr-1 p-grid p-justify-end">
                                        <Button
                                            label="Save & Continue"
                                            className="p-button-raised"
                                            icon="fad fa-save"
                                            iconPos="right"
                                            onClick={() => {
                                                setActiveIndex(1);
                                                setStep1Hidden(true);
                                                setStep2Hidden(false);
                                                setStep3Hidden(true);
                                                setStep4Hidden(true);
                                                setProgressBarValue(progressBarValue+25);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div id="step_2" hidden={step2hidden}>
                                <div className="p-grid list-demo p-mt-4">
                                    <div className="p-col-12">
                                        <h5>Applicable WOCAT SLM Technologies</h5>
                                        <DataView value={products}
                                                  layout={layout}
                                                  header={header}
                                                  itemTemplate={itemTemplate}
                                                  paginator
                                                  rows={5}
                                                  />
                                    </div>
                                </div>

                                <div hidden={questionnaireHidden}>
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

                                <div className="p-mt-4 p-grid  p-justify-between p-ml-1 p-mr-1">
                                    <Button
                                        icon="fad fa-step-backward"
                                        label="Back"
                                        className="p-button-raised p-button-secondary"
                                        onClick={() => {
                                            setActiveIndex(0);
                                            setStep1Hidden(false);
                                            setStep2Hidden(true);
                                            setStep3Hidden(true);
                                            setStep4Hidden(true);
                                            setProgressBarValue(progressBarValue-25);
                                        }}
                                    />
                                    <Button
                                        label="Save & Continue"
                                        className="p-button-raised"
                                        icon="fad fa-save"
                                        iconPos="right"
                                        onClick={() => {
                                            setActiveIndex(2);
                                            setStep1Hidden(true);
                                            setStep2Hidden(true);
                                            setStep3Hidden(false);
                                            setStep4Hidden(true);
                                            setProgressBarValue(progressBarValue+25);


                                        }}
                                    />
                                </div>
                            </div>
                            <div id="step_3" hidden={step3hidden}>
                                <DataUploadSelectionSOC selectedValue = {socRadioSelection}/>

                                <div className="p-grid table-demo" hidden={socMatrix}>
                                    <div className="p-col-12">
                                         <div className="card">
                                             <DataTable value={customer2}
                                                        className="p-datatable-gridlines p-datatable-striped p-datatable-sm p-datatable-customers"
                                                        rows={10}
                                                        dataKey="id"
                                                        rowHover selection={selectedCustomers2}
                                                        editMode="row"
                                                        onSelectionChange={(e) => setSelectedCustomers2(e.value)}
                                                        header={customer2TableHeader}
                                                        onRowEditSave={onRowEditSave}
                                             >
                                                 <Column field="baseColumn" header=""  body={baseColumn}></Column>
                                                 <Column field="treecovered" header="Tree-covered"
                                                         editor={(props) => treecoveredEditor(props)}
                                                         body={treecoveredColumn}>
                                                 </Column>
                                                 <Column field="grassland" header="Grassland"
                                                         editor={(props) => grasslandEditor(props)}
                                                         body={grasslandColumn}></Column>
                                                 <Column field="cropland" header="Cropland"
                                                         editor={(props) => croplandEditor(props)}
                                                         body={croplandColumn}></Column>
                                                 <Column field="wetland" header="Wetland"
                                                         editor={(props) => wetlandEditor(props)}
                                                         body={wetlandColumn}></Column>
                                                 <Column field="artificialarea" header="Artificial area"
                                                         editor={(props) => artificialareaEditor(props)}
                                                         body={artificialareaColumn}></Column>
                                                 <Column field="bareland" header="Bare land"
                                                         editor={(props) => barelandEditor(props)}
                                                         body={barelandColumn}></Column>
                                                 <Column field="waterbody" header="Water body"
                                                         editor={(props) => waterbodyEditor(props)}
                                                         body={waterbodyColumn}></Column>
                                                 <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                                             </DataTable>
                                         </div>
                                    </div>

                                </div>

                                <div className="p-mt-4 p-grid  p-justify-between p-ml-1 p-mr-1">
                                    <Button
                                        icon="fad fa-step-backward"
                                        label="Back"
                                        className="p-button-raised p-button-secondary"
                                        onClick={() => {
                                            setActiveIndex(1);
                                            setStep1Hidden(true);
                                            setStep2Hidden(false);
                                            setStep3Hidden(true);
                                            setStep4Hidden(true);
                                            setProgressBarValue(progressBarValue-25);
                                        }}
                                    />
                                    <Button
                                        label="Save & Continue"
                                        className="p-button-raised"
                                        icon="fad fa-save"
                                        iconPos="right"
                                        onClick={() => {
                                            setActiveIndex(3);
                                            setStep1Hidden(true);
                                            setStep2Hidden(true);
                                            setStep3Hidden(true);
                                            setStep4Hidden(false);
                                            setProgressBarValue(progressBarValue + 25);
                                            calculateNeutralityMatrix();
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div id="step_4" hidden={step4hidden}>
                                <DataUploadSelectionNDVI />

                                <div className="p-mt-4 p-grid  p-justify-between p-ml-1 p-mr-1">
                                    <Button
                                        icon="fad fa-step-backward"
                                        label="Back"
                                        className="p-button-raised p-button-secondary"
                                        onClick={() => {
                                            setActiveIndex(2);
                                            setStep1Hidden(true);
                                            setStep2Hidden(true);
                                            setStep3Hidden(false);
                                            setStep4Hidden(true);
                                            setLastSave(false);
                                            setLDButton(true);
                                            setProgressBarValue(50);
                                            setKey("plan_for_ldn");
                                        }}
                                    />
                                    <Button
                                        label="Save & Continue"
                                        className="p-button-raised"
                                        icon="fad fa-save"
                                        iconPos="right"
                                        disabled={lastSave}
                                        onClick={() => {
                                            setLastSave(true);
                                            setLDButton(false);
                                            setProgressBarValue(progressBarValue+25);
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                        <div hidden={sdgHidden}>
                            <div>
                                {
                                    socCalculationScenarios?
                                        socCalculationScenarios.data.scenarios.map(
                                            (scenario)=>{
                                                return (
                                                    <div className="p-mt-6" id={scenario.scenarioEnd}>
                                                        <NeutralityMatrix
                                                            scenario={scenario}
                                                        />
                                                    </div>
                                                )
                                            }
                                        )
                                        :console.log()
                                }
                            </div>
                            <div className="p-grid p-justify-center p-mt-6">
                                <h4>Land Degradation Evolution in ROI</h4>
                            {
                                waterfallValues?
                                    <WaterfallGraph data={waterfallValues}/>
                                    :console.log()
                            }
                            </div>
                            <div className="p-mt-4 p-grid  p-justify-between p-ml-1 p-mr-1">
                                <Button
                                    label="LDN Dashboard"
                                    icon="fad fa-bullseye-arrow"
                                    tooltip="View project contribution to country level LDN targets"
                                />
                                <Button
                                    label="Export Report"
                                    icon="fad fa-file-chart-line"
                                    tooltip="This includes Neutrality Matrix, Map, and supporting data"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Dialog header="Warning"
                    visible={noNewProject}
                    style={{ width: '50vw' }}
                    footer={renderFooterD('displayBasic')}
                    onHide={() => onHide('displayBasic')}
                    closable = {false}
            >
                <p>For this option, you first need to define a region of interest in your project</p>
            </Dialog>
        </div>
    );
}
