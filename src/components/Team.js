import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import ProductService from '../service/ProductService';


export const Team = () => {
    return (
        <div className="layout-dashboard">
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card p-shadow-8">
                        <div className="p-align-center vertical-container">
                            <img height="120"
                                 src="assets/layout/images/LUP4LDN-LOGO_small.png"
                            />

                            <h2 className="p-text-bold p-text-center p-ml-4 p-mt-8">Land Usage Planning for LDN</h2>

                        </div>


                        <div className="p-text-center">
                            <h5>
                                allows users to formulate and evaluate land use (LU) and land management
                                (LM) transition scenarios, providing visual representations of impacts
                                (LD gains and losses) and trade-offs towards achieving land degradation
                                neutrality (LDN)
                            </h5>
                        </div>


                        <div style={{padding:"20px"}}>
                            <h4>To whom it is addressed:</h4>
                            <h5 style={{fontWeight:"400"}}>Land use planners, national and sub-national organizations active in LU/LM planning, policy makers, land users and research agencies</h5>

                            <h4 style={{paddingTop:"20px"}}>Which questions it helps them to answer:</h4>
                            <ul>
                                <li>
                                    <h5 style={{paddingTop:"10px",fontWeight:"400"}}>
                                        <span style={{fontWeight:"500"}}>Where</span> is most crucial to focus land restoration efforts?</h5>
                                </li>
                                <li>
                                    <h5 style={{paddingTop:"10px",fontWeight:"400"}}>
                                        <span style={{fontWeight:"500"}}>What</span> SLM interventions are optimal and feasible in order to achieve LDN?</h5>
                                </li>
                            </ul>
                        </div>





                        <h1 className="p-text-center p-text-bold">
                            Leader
                        </h1>
                        <div className="p-grid p-justify-center p-mt-4">
                            <img height="80px"
                                src="assets/layout/images/SCiO-sLogo-Dark.png"
                            />
                        </div>
                        <h1 className="p-text-center p-text-bold" style={{paddingTop:"30px"}}>
                            Collaborators
                        </h1>
                        <div className="p-grid p-justify-center p-mt-4">
                            <img className="p-mr-6" height="80px" src="assets/layout/images/ICARDA_logo.png"/>
                            <img className="p-mr-6 p-mt-4" height="40px" src="assets/layout/images/WOCAT_logo.png"/>
                            <img className="p-mr-6" height="60px" src="assets/layout/images/ELD_logo.png"/>
                            <img height="60px" src="assets/layout/images/UNISS_logo.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
