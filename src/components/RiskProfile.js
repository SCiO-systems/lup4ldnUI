import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import ls from "local-storage";


export const RiskProfile = () => {

    const [whoLink, setWhoLink] = useState(null);
    const [usaidLink, setUsaidLink] = useState(null);
    const [undrrLink, setUndrrLink] = useState(null);
    const [GFDRRLink, setGFDRRLink] = useState(null);

    useEffect(() => {
        const projectInfo = ls.get("project_info");

        if(projectInfo.iso_code_2 === "TN"){
            setWhoLink("https://apps.who.int/iris/bitstream/handle/10665/246121/WHO-FWC-PHE-EPE-15.46-eng.pdf;jsessionid=8A8F4257B04B0FD8924B732FA8D84D94?sequence=1");
            setUsaidLink("https://www.climatelinks.org/resources/climate-risk-profile-tunisia");
            setUndrrLink("https://www.preventionweb.net/countries/tun/data/");
            setGFDRRLink("https://thinkhazard.org/en/report/248-tunisia");
        }else if(projectInfo.iso_code_2 === "BF"){
            setUsaidLink("https://www.climatelinks.org/resources/climate-risk-profile-west-africa");
            setUndrrLink("https://www.preventionweb.net/countries/bfa/data/");
            setGFDRRLink("https://thinkhazard.org/en/report/42-burkina-faso");
        }

    }, []);


    return(
        <div>
            {
                whoLink?
                    <div className="card p-shadow-6">
                        <div className="p-grid p-col-12 p-mt-2">
                            <div className="p-grid p-col-fixed p-align-center vertical-container p-justify-center" style={{width:'100px'}}>
                                <i className="fad fa-clipboard-list fa-3x"></i>
                            </div>
                            <div className="p-col">
                                <blockquote>
                                    <a href={whoLink} target="_blank">
                                        WHO-UNFCCC<br/>
                                        <h5>Health and Climate Change Country Profile</h5>
                                    </a>
                                </blockquote>
                            </div>
                        </div>

                    </div>
                    :console.log()
            }
            <div className="card p-shadow-6">
                <div className="p-grid p-col-12 p-mt-2">
                    <div className="p-grid p-col-fixed p-align-center vertical-container p-justify-center" style={{width:'100px'}}>
                        <i className="fad fa-thunderstorm-sun fa-3x"></i>
                    </div>
                    <div className="p-col">
                        <a href={usaidLink} target="_blank">
                            <blockquote>
                                USAID-Climatelinks<br/>
                                <h5>Climate Risk Profile</h5>
                            </blockquote>
                        </a>
                    </div>
                </div>
            </div>

            <div className="card p-shadow-6">
                <div className="p-grid p-col-12 p-mt-2">
                    <div className="p-grid p-col-fixed p-align-center vertical-container p-justify-center" style={{width:'100px'}}>
                        <i className="fad fa-exclamation-triangle fa-3x"></i>
                    </div>
                    <div className="p-col">
                        <a href={undrrLink} target="_blank">
                            <blockquote>
                                UNDRR-PreventionWeb<br/>
                                <h5>Disaster & Risk Profile</h5>
                            </blockquote>
                        </a>
                    </div>
                </div>
            </div>

            <div className="card p-shadow-6">
                <div className="p-grid p-col-12 p-mt-2">
                    <div className="p-grid p-col-fixed p-align-center vertical-container p-justify-center" style={{width:'100px'}}>
                        <i className="fad fa-clipboard-check fa-3x"></i>
                    </div>
                    <div className="p-col">
                        <a href={GFDRRLink} target="_blank">
                            <blockquote>
                                Global Facility for Disaster Reduction and Recovery (GFDRR)<br/>
                                <h5>Disaster Reduction and Recovery Profile</h5>
                            </blockquote>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}
