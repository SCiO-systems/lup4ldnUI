import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import QvantumService from "../service/QvantumService";
import {Tab, Tabs} from "react-bootstrap";

export const BootstrapLandUsePlanning = (props) => {

    const [key, setKey] = useState();
    const [sdg, setSDG] = useState(true);


    useEffect(() => {

        if(props.activateTab != undefined){
            setKey(props.activateTab);
            if(props.activateTab === "sdg15"){
                setSDG(false);
            }else{
                setSDG(true);
            }
        }

    },[props.activateTab]);

    const selectValue = (k)=>{
        setKey(k);
        if(props.selectedValue != undefined){
            props.selectedValue(k);
        }
    }

    return(
        <div>
            <Tabs
                id="land_use_tab"
                activeKey={key}
                onSelect={(k) => selectValue(k)}
            >
                <Tab
                    eventKey="anticipated_land_degradation"
                    title={<span><i className="fad fa-chart-line-down" /> Anticipated new Land Degradation</span>}>

                </Tab>
                <Tab
                    eventKey="plan_for_ldn"
                    title={<span><i className=" fad fa-abacus" /> Plan for LDN</span>}>
                </Tab>
                <Tab
                    eventKey="sdg15"
                    title={<span><i className=" fad fa-analytics" /> Neutrality Matrix / Map</span>}
                    disabled = {sdg}
                >
                </Tab>
            </Tabs>
        </div>

    )


}
