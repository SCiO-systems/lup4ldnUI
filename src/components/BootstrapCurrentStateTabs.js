import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import QvantumService from "../service/QvantumService";
import {Tab, Tabs} from "react-bootstrap";

export const BootstrapCurrentStateTabs = (props) => {

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
                id="current_state_tab"
                activeKey={key}
                onSelect={(k) => selectValue(k)}

            >
                <Tab
                    eventKey="land_use"
                    title={<span><i className=" fad fa-th" /> Method 1: Land Use Suitability</span>}>

                </Tab>
                <Tab
                    eventKey="land_management"
                    title={<span><i className=" fad fa-recycle" /> Method 2: Land Management Sustainability</span>}>

                </Tab>
            </Tabs>
        </div>

    )


}
