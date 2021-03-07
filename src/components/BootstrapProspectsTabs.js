import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import QvantumService from "../service/QvantumService";
import {Tab, Tabs} from "react-bootstrap";

export const BootstrapProspectsTabs = (props) => {

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
                id="prospects_tab"
                activeKey={key}
                onSelect={(k) => selectValue(k)}

            >
                <Tab
                    eventKey="population"
                    title={<span><i className=" fad fa-users" /> Population</span>}>

                </Tab>
                <Tab
                    eventKey="climatic_variables"
                    title={<span><i className=" fad fa-sun-cloud" /> Climatic Variables</span>}>

                </Tab>
                <Tab
                    eventKey="spectral_indices"
                    title={<span><i className=" fad fa-align-center" /> Spectral Indices</span>}>

                </Tab>
            </Tabs>
        </div>

    )


}
