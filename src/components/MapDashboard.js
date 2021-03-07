import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation  } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import ProductService from '../service/ProductService';
import NodeService from "../service/NodeService";
import CustomerService from "../service/CustomerService";
import {Browser} from "./Browser";
import {Glowglobe} from "./Glowglobe";



export const MapDashboard = () => {

    //Get URL
    const location = useLocation();

    //Initialize Browser widget state
    const [closeBrowser, setCloseBrowser] = useState(false);


    useEffect(() => {
        if(location.pathname === "/browser"){
            setCloseBrowser(!closeBrowser);
        }else{
            setCloseBrowser(closeBrowser);
        }
    }, []);

    const position = [51.505, -0.09]

    return (

        <div className="p-grid">
            <Browser />
            <Glowglobe />
        </div>



    );
}
