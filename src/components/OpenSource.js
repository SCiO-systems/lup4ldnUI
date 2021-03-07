import {RadioButton} from "primereact/components/radiobutton/RadioButton";
import React, {useEffect, useState} from "react";
import styles from './DataSources.css'

export const OpenSource = (props) => {

    //assets/layout/images/SCiO-sLogo-Dark.png

    return (

        <div className="layout-dashboard">
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card p-shadow-8">
                        <div className="p-align-center vertical-container">
                            <img height="80" src="assets/layout/images/GPL.png" />
                        </div>
                        <div style={{padding: "20px"}}><h5 style={{fontWeight: "400"}}>The full codebase of LUP4LDN is
                            publicly available and shared under the <a
                                href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL v3.0</a> license. To access
                            and use the source code, visit the relevant GitHub repositories:</h5>
                            <ul>
                                <li><h5 style={{fontWeight: "400",paddingTop: "10px"}}>
                                    <a href="https://github.com/SCiO-systems/lup4ldnUI" target="_blank">LUP4LDN
                                        frontend codebase</a></h5>

                                </li>
                                <li>
                                    <h5 style={{fontWeight: "400",paddingTop: "10px"}}>
                                        <a href="https://github.com/SCiO-systems/lup4ldnBackend" target="_blank">LUP4LDN
                                            backend codebase</a></h5>
                                </li>
                            </ul>
                        </div>
                        <div style={{padding: "20px"}}><h5 style={{fontWeight: "400"}}> A dockerized version of the LUP4LDN
                            frontend and the LUP4LDN backend is available at:</h5>
                            <ul>
                                <li><h5 style={{fontWeight: "400",paddingTop: "10px"}}>
                                    <a href="https://hub.docker.com/repository/docker/scioqvantum/lup4ldnui" target="_blank">LUP4LDN
                                        frontend container</a></h5>

                                </li>
                                <li>
                                    <h5 style={{fontWeight: "400",paddingTop: "10px"}}>
                                        <a href="https://hub.docker.com/r/scioqvantum/lup4ldnbackend" target="_blank">LUP4LDN
                                            backend container</a></h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
