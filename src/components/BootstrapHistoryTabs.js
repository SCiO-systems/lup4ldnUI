import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import QvantumService from "../service/QvantumService";
import {Tab, Tabs} from "react-bootstrap";

export const BootstrapHistoryTabs = (props) => {

    const [key, setKey] = useState();


    useEffect(() => {

        if(props.activateTab != undefined){
            setKey(props.activateTab);
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
                id="history_tab"
                activeKey={key}
                onSelect={(k) => selectValue(k)}

            >
                <Tab
                    eventKey="land_cover"
                    title={<span><i className=" fad fa-th" /> Land Cover </span>}>

                </Tab>
                <Tab
                    eventKey="soc"
                    title={<span><i className=" fad fa-recycle" /> Soil Organic Carbon</span>}>

                </Tab>
                <Tab
                    eventKey="ndvi"
                    title={<span><i className=" fad fa-seedling" /> Vegetation Productivity</span>}>

                </Tab>
                <Tab
                    eventKey="sdg15"
                    title={<span><i className=" fad fa-analytics" /> SDG 15.3.1</span>}>

                </Tab>
            </Tabs>
        </div>

    )


}
