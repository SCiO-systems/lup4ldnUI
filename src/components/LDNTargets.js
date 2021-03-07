import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import ls from "local-storage";


export const LDNTargets = (props) => {

    const history = useHistory();

    useEffect(() => {
        const projectInfo = ls.get("project_info");
        if(projectInfo.iso_code_2 === "TN"){
            window.open("https://knowledge.unccd.int/countries/tunisia", "_blank");
        }else if(projectInfo.iso_code_2 === "BF"){
            window.open("https://knowledge.unccd.int/countries/burkina-faso", "_blank");
        }
        history.push("/riskprofile");
    }, []);


    return(
        <div>



        </div>
    )

}
