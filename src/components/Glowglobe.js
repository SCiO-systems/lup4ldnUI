import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import React, {useEffect, useState,useRef} from "react";

//import './leaflet-extensions/boundaries/mask'

import './leaflet-extensions/sliderbutton/leaflet-slider.css'
import './leaflet-extensions/sliderbutton/leaflet-slider'

import './leaflet-extensions/customcontrol/Leaflet.Control.Custom'


//Chroma
import chroma from "chroma-js";

//Leaflet Extensions


//Pan Control
import './leaflet-extensions/pancontrol/L.Control.Pan';
import './leaflet-extensions/pancontrol/L.Control.Pan.css';
import './leaflet-extensions/pancontrol/L.Control.Pan.ie.css';

//Geoman
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

//Style Editor
import 'leaflet-styleeditor-minified/dist/javascript/Leaflet.StyleEditor'
import 'leaflet-styleeditor-minified/dist/css/Leaflet.StyleEditor.css'

//Full Screen Button
import './leaflet-extensions/fullscreen/Control.FullScreen.css'
import './leaflet-extensions/fullscreen/Control.FullScreen'

//Scale Factor
import './leaflet-extensions/scalefactor/leaflet.scalefactor.css'
import './leaflet-extensions/scalefactor/leaflet.scalefactor'

//Mouse Coordinates
import './leaflet-extensions/mouseposition/L.Control.MousePosition.css'
import './leaflet-extensions/mouseposition/L.Control.MousePosition'

//Layer Control Minimaps
import './leaflet-extensions/layercontrolminimaps/control.layers.minimap.css'
import './leaflet-extensions/layercontrolminimaps/L.Control.Layers.Minimap'

//Easy Print
import 'leaflet-easyprint'

//Easy Button
//import './leaflet-extensions/easybutton/easy-button.css'
//import './leaflet-extensions/easybutton/easy-button'

import 'leaflet-easybutton'



//Slide Compare

import './leaflet-extensions/sidebyside/leaflet-side-by-side'
import './leaflet-extensions/sidebyside/layout.css'


//import 'leaflet-toolbar/dist/leaflet.toolbar.css'
//import 'leaflet-toolbar/dist/leaflet.toolbar.min'

import './leaflet-extensions/leafletpanels/leaflet-panel-layers'
import './leaflet-extensions/leafletpanels/leaflet-panel-layers.css'

import './leaflet-extensions/boundarycanvas/leaflet.mask'


import { point,polygon,inside,multiPolygon } from '@turf/turf'
import QvantumService from "../service/QvantumService";

//Leaflet Basemap Providers
require("leaflet-providers");

var parse_georaster = require("georaster");
var GeoRasterLayer = require("georaster-layer-for-leaflet");


export const Glowglobe = (props) => {

    const glowglobe = useRef();
    const sidebyside = useRef();
    const legend = useRef();

    const [containerName, setContainerName] = useState("glowglobe");

    const fullToolbar = {
        position:'topright',
        drawMarker: true,
        drawCircleMarker: true,
        drawPolyline: true,
        drawRectangle: true,
        drawPolygon: true,
        drawCircle: true,
        editMode: true,
        dragMode: true,
        cutPolygon: true,
        removalMode: true
    }
    const simpleToolbar = {
        position:'topright',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: true,
        drawPolygon: true,
        drawCircle: true,
        editMode: true,
        dragMode: true,
        cutPolygon: true,
        removalMode: true
    }
    const markerToolbar = {
        position:'topright',
        drawMarker: true,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        drawCircle: false,
        editMode: false,
        dragMode: false,
        cutPolygon: false,
        removalMode: true
    }
    const noToolbar = {
        position:'topright',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        drawCircle: false,
        editMode: false,
        dragMode: false,
        cutPolygon: false,
        removalMode: false
    }

    const [userPosition, setPosition] = useState({
        coords:{
            latitude: 40.737,
            longitude: -73.923
        }
    });

    const [zoom, setzoom] = useState(6);

    const invalidateSize = () =>{
        //Invalidate Size
        glowglobe.current.invalidateSize(true);
    }



    const initializeMap = () =>{

        //Basemap Layers
        const basemapLayers = {
            "ESRI World Imagery": L.tileLayer.provider('Esri.WorldImagery'),
            "ESRI World Street" : L.tileLayer.provider('Esri.WorldStreetMap'),
            "ESRI De Lorme" : L.tileLayer.provider('Esri.DeLorme'),
            "ESRI World Topo": L.tileLayer.provider('Esri.WorldTopoMap'),
            "ESRI World Terrain": L.tileLayer.provider('Esri.WorldTerrain'),
            "ESRI Ocean": L.tileLayer.provider('Esri.OceanBasemap'),
            "ESRI Natural Geography": L.tileLayer.provider('Esri.NatGeoWorldMap'),
        };

        // create map
        let map = L.map("glowglobe",{
            zoomControl:false
        }).setView([userPosition.coords.latitude,userPosition.coords.longitude],props.zoom);

        //Default Basemap
        var tileLayer = L.tileLayer.provider('Esri.WorldImagery');
        tileLayer.addTo(map);

        //Geoman
        if(props.toolbar === "simple")
        {
            map.pm.addControls(simpleToolbar);

        }else if(props.toolbar === "full")
        {
            map.pm.addControls(fullToolbar);

        }else if(props.toolbar === "no")
        {
            map.pm.addControls(noToolbar);

        }else if(props.toolbar === "marker")
        {
            map.pm.addControls(markerToolbar);
            initializeAdministratorSelector(map);
            map.on('pm:drawstart', (e)=>{
                map.pm.getGeomanDrawLayers(false).forEach(
                    (geomanLayer)=>{
                        map.removeLayer(geomanLayer);
                    }
                )
                map.eachLayer(
                    (item)=>{
                        if(item.glowglobeID !== undefined){
                            if(item.glowglobeID.functionality === "polygonShow"){

                                map.removeLayer(item);
                            }
                        }
                    }
                )
            })
            map.on('pm:create', (e) => {

                var markerPoint = point([e.layer._latlng.lng, e.layer._latlng.lat]);
                var layer = null;
                var currentGlowglobe = {};
                map.eachLayer(
                    (item)=>{
                        if(item.glowglobeID !== undefined){
                            if(item.glowglobeID.functionality === "administrationSelection"){
                                layer = item;
                                currentGlowglobe = item.glowglobeID;
                            }
                        }
                    }
                )


                var regionPolygon = null;
                if(layer.pm._layers[0].feature.geometry.type === "MultiPolygon"){
                    regionPolygon = multiPolygon(layer.pm._layers[0].feature.geometry.coordinates,{name:'selectedPolygon'});
                }else if(layer.pm._layers[0].feature.geometry.type === "Polygon"){
                    regionPolygon = polygon(layer.pm._layers[0].feature.geometry.coordinates,{name:'selectedPolygon'});
                }

                var validLayer = inside(markerPoint, regionPolygon.geometry);
                if(validLayer === false){
                    map.eachLayer(function(layer) {
                        if(layer._leaflet_id === e.layer._leaflet_id){
                            map.removeLayer(layer);
                        }
                    });
                }else{
                    const qvantumService = new QvantumService();
                    qvantumService.
                    getFullGADMPolygon(markerPoint,layer.glowglobeID.administrationLevel).
                    then(
                        function (response) {
                            var gadmGlow = {
                                functionality:"polygonShow"
                            }
                            loadRegion(response,gadmGlow,false)
                        }
                        )
                    currentGlowglobe.country = layer.pm._layers[0].feature.properties.GID_0;
                    currentGlowglobe.point = markerPoint;
                    if(layer.glowglobeID.administrationLevel === '1'){
                        currentGlowglobe.adminName = layer.pm._layers[0].feature.properties.GID_1;
                    }else if(layer.glowglobeID.administrationLevel === '2'){
                        currentGlowglobe.adminName = layer.pm._layers[0].feature.properties.GID_2;
                    }
                    currentGlowglobe.chosenPoint = markerPoint;
                    map.pm.disableDraw();
                    props.glowglobeOutput(currentGlowglobe);
                }
            });
        }else{
            map.pm.addControls(simpleToolbar);
        }

        var myIcon = L.icon({
            iconUrl: 'assets/layout/images/marker-icon.png',
            iconAnchor: [12, 40],
            popupAnchor: [-3, -76],
            shadowUrl: 'assets/layout/images/shadow.svg',
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });

        var gOptions = {
            markerStyle:{
                icon: myIcon,
                draggable: true,

            }
        }
        map.pm.setGlobalOptions(gOptions)

        //Full Screen
        var fullscreenControl = L.control.fullscreen({
            position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
            title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
            titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
            content: null, // change the content of the button, can be HTML, default null
            forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
            forcePseudoFullscreen: false, // force use of pseudo full screen even if full screen API is available, default false
            fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
        });
        fullscreenControl.addTo(map);

        //Style Editor
        if(props.styleEditor == true){
            map.addControl(L.control.styleEditor({
                position:'topright'
            }));
        }

        //Basemap
        var basemapControlMinimap = L.control.layers.minimap(basemapLayers, {}, { position: "bottomright"});
        basemapControlMinimap.addTo(map);

        //Mouse Position
        L.control.mousePosition().addTo(map);
        //Scale Factor
        L.control.scalefactor({position:"bottomleft"}).addTo(map);


        //osm.addTo(map);
        glowglobe.current = map;

    }

    const removeGlowGlobeLayer = (criterion) =>{
        if(criterion === 'administrationSelection'){
            var currentGlowGlobeID = {};
            var maskLayer = null;
            glowglobe.current.eachLayer(
                (item)=>{
                    if(item.glowglobeID !== undefined){
                        if(item.glowglobeID.functionality === "administrationSelection"){
                            glowglobe.current.removeLayer(item);
                            currentGlowGlobeID = item.glowglobeID;
                            if(item.glowglobeID.maskID){
                                maskLayer = item.glowglobeID.maskID;
                            }
                        }
                    }
                }
            )
            glowglobe.current.eachLayer(
                (item) => {
                    if(item._leaflet_id === maskLayer){
                        glowglobe.current.removeLayer(item);
                    }
                }
            )
            return currentGlowGlobeID;
        }
    }

    const initializeAdministratorSelector = (map) =>{
        const actions = [
            'cancel',
            {
                text: 'Admin Level 1',
                onClick: () => {

                    var currentGlowGlobe = removeGlowGlobeLayer('administrationSelection');
                    const qvantumService = new QvantumService();
                    qvantumService.getGADMPolygon(
                        currentGlowGlobe.country,
                        '1').then(
                        (response)=>{

                            const glowglobeID = {
                                functionality:'administrationSelection',
                                country:currentGlowGlobe.country,
                                administrationLevel: '1'
                            }

                            loadRegion(response,glowglobeID,true);
                        }
                    )

                    let classes = map.pm.Toolbar.getButtons().AdministrationLevelSelector.
                    buttonsDomNode.
                    firstChild.
                    firstChild.className.split(" ");

                    let filteredClasses = classes.filter(
                        (item)=>{
                            if(!item.startsWith("admin-level")){
                                return item
                            }
                        }
                    )

                    filteredClasses.push("admin-level-1");
                    map.pm.Toolbar.getButtons().AdministrationLevelSelector.
                        buttonsDomNode.
                        firstChild.
                        firstChild.className = filteredClasses.join(" ");
                },
            },
            {
                text: 'Admin Level 2',
                onClick: () => {

                    var currentGlowGlobe = removeGlowGlobeLayer('administrationSelection');
                    const qvantumService = new QvantumService();
                    qvantumService.getGADMPolygon(
                        currentGlowGlobe.country,
                        '2').then(
                        (response)=>{

                            const glowglobeID = {
                                functionality:'administrationSelection',
                                country:currentGlowGlobe.country,
                                administrationLevel: '2'
                            }

                            loadRegion(response,glowglobeID,true);
                        }
                    )

                    let classes = map.pm.Toolbar.getButtons().AdministrationLevelSelector.
                    buttonsDomNode.
                    firstChild.
                    firstChild.className.split(" ");

                    let filteredClasses = classes.filter(
                        (item)=>{
                            if(!item.startsWith("admin-level")){
                                return item
                            }
                        }
                    )

                    filteredClasses.push("admin-level-2");
                    map.pm.Toolbar.getButtons().AdministrationLevelSelector.
                        buttonsDomNode.
                        firstChild.
                        firstChild.className = filteredClasses.join(" ");

                }
            }
        ]
        let options = {
            name:'AdministrationLevelSelector',
            block: 'draw',
            title: 'Admin Level Selector',
            toggle: true,
            className: 'admin-level-1',
            actions: actions

        }
        map.pm.Toolbar.createCustomControl(options)

    }

    const loadRegion = (region,glowglobeID,withMask) =>{

        let regionLayer = L.geoJSON(region, {
            style: function (feature) {
                return {
                    color: 'black',
                    opacity: 1,
                    weight: 1,
                    fillOpacity: .1
                };
            }
        });
        if(withMask === true){
            let mask = L.mask(region.features[0], {})
            mask.addTo(glowglobe.current);
            glowglobeID.maskID = mask._leaflet_id;
            regionLayer.maskID = mask._leaflet_id;
            regionLayer.glowglobeID = glowglobeID;
            regionLayer.addTo(glowglobe.current);

            glowglobe.current.fitBounds(regionLayer.getBounds());
            glowglobe.current.setMaxBounds(regionLayer.getBounds());
            glowglobe.current.setMinZoom(glowglobe.current.getBoundsZoom(glowglobe.current.options.maxBounds ) );
        }else{
            regionLayer.glowglobeID = glowglobeID;
            regionLayer.addTo(glowglobe.current);
            glowglobe.current.fitBounds(regionLayer.getBounds());
        }
    }

    const loadLayers = () => {

        if(sidebyside.current !== undefined){
            sidebyside.current.remove();
        }

        if(legend.current !== undefined){
            legend.current.remove();
        }

        const layers = props.layers;
        const visibleLayers = layers.filter(
            (layer) => {
                return layer.visible == true
            }
        )
        var maskID = null;
        glowglobe.current.eachLayer(
            (item) => {
                if (item.removable == true) {
                    glowglobe.current.removeLayer(item);
                } else if (item.glowglobeID !== undefined) {
                    maskID = item.glowglobeID.maskID;
                    glowglobe.current.removeLayer(item);
                }
            }
        )
        glowglobe.current.eachLayer(
            (item) => {
                if (item._leaflet_id === maskID) {
                    glowglobe.current.removeLayer(item);
                }
            }
        )


        visibleLayers.map(
            (item) => {
                if (item.file_type === "geotiff") {
                    if(!Array.isArray(item.url)){
                        fetch(item.url)
                            .then(response => response.arrayBuffer())
                            .then(arrayBuffer => {
                                parse_georaster(arrayBuffer).then(georaster => {
                                    var pixelValuesLegend = [];
                                    //console.log(chroma.brewer);
                                    var scale = chroma.scale("RdGy");
                                    var minColor = 0;
                                    var rangeColor = 0;
                                    var maxColor = 0;

                                    var layer = new GeoRasterLayer({
                                        georaster: georaster,
                                        opacity: 1,
                                        pixelValuesToColorFn: function (pixelValues) {
                                            if (item.palette === 1) {
                                                if (pixelValues[0] === 1) {
                                                    return "#ed8f2f";
                                                } else if (pixelValues[0] === 2) {
                                                    return "#e05f2f";
                                                } else if (pixelValues[0] === 3) {
                                                    return "#d43333";
                                                } else if (pixelValues[0] === 0) {
                                                    return "#ffffff";
                                                }
                                            } else if (item.palette === 2) {
                                                if (pixelValues[0] === 1) {
                                                    return "#42b05c";
                                                } else if (pixelValues[0] === 2) {
                                                    return "#a0dc67";
                                                } else if (pixelValues[0] === 3) {
                                                    return "#c67f5f";
                                                } else if (pixelValues[0] === 4) {
                                                    return "#12AAB5";
                                                } else if (pixelValues[0] === 5) {
                                                    return "#5D7F99";
                                                } else if (pixelValues[0] === 6) {
                                                    return "#f5d680";
                                                } else if (pixelValues[0] === 7) {
                                                    return "#67b7dc";
                                                }
                                            } else {
                                                const min = georaster.mins[0];
                                                const max = georaster.maxs[0];
                                                const range = georaster.ranges[0];

                                                minColor = min;
                                                rangeColor = range;
                                                maxColor = max;

                                                var pixelValue = pixelValues[0]; // there's just one band in this raster

                                                // if there's zero wind, don't return a color
                                                if (pixelValue <= 0) return null;

                                                // scale to 0 - 1 used by chroma
                                                var scaledPixelValue = (pixelValue - min) / range;

                                                var color = scale(scaledPixelValue).hex();
                                                pixelValuesLegend.push(pixelValues);

                                            }

                                            return color;
                                        },
                                        resolution: 256 // optional parameter for adjusting display resolution
                                    });

                                    layer.removable = true;
                                    layer.addTo(glowglobe.current);

                                    //Legend
                                    if (item.palette === 1) {
                                        legend.current = L.control({position: "bottomright"});
                                        legend.current.onAdd = function () {
                                            var div = L.DomUtil.create("div", "legend");
                                            div.innerHTML += '<i style="background: #d43333"></i><span>Reverse & Reduce: Degraded areas with high risk</span><br>';
                                            div.innerHTML += '<i style="background: #e05f2f"></i><span>Reverse: Degraded areas with low risk</span><br>';
                                            div.innerHTML += '<i style="background: #ed8f2f"></i><span>Avoid: Stable areas with high risk</span><br>';

                                            return div;
                                        };
                                        legend.current.addTo(glowglobe.current);
                                    }if (item.palette === 2) {
                                        legend.current= L.control({position: "bottomright"});
                                        legend.current.onAdd = function () {
                                            var div = L.DomUtil.create("div", "legend");
                                            div.innerHTML += '<i style="background: #42b05c"></i><span>Tree-covered</span><br>';
                                            div.innerHTML += '<i style="background: #a0dc67"></i><span>Grassland</span><br>';
                                            div.innerHTML += '<i style="background: #c67f5f"></i><span>Cropland</span><br>';
                                            div.innerHTML += '<i style="background: #12AAB5"></i><span>Wetland</span><br>';
                                            div.innerHTML += '<i style="background: #5D7F99"></i><span>Artificial area</span><br>';
                                            div.innerHTML += '<i style="background: #f5d680"></i><span>Bare land</span><br>';
                                            div.innerHTML += '<i style="background: #67b7dc"></i><span>Water body</span><br>';

                                            return div;
                                        };
                                        legend.current.addTo(glowglobe.current);
                                    }else{

                                        /*var startColor = scale(0).hex();
                                        var endColor = scale((maxColor-minColor)/rangeColor).hex();


                                        legend.current = L.control({position: "bottomright"});
                                        legend.current.onAdd = function () {
                                            var div = L.DomUtil.create("div", "legend");
                                            div.style.width="200px"
                                            div.innerHTML += '<span>Legend</span><br>';

                                            var div2 = L.DomUtil.create("div", "legendColor");
                                            div2.style.backgroundImage="" +
                                                "linear-gradient(to left,"+startColor+","+endColor+")";
                                            div2.style.width="100%";
                                            div2.style.height="20px";
                                            div.appendChild(div2);

                                            return div;
                                        }
                                        legend.current.addTo(glowglobe.current);*/

                                    }

                                    if (item.point !== undefined) {
                                        let regionLayer = L.geoJSON(item.point, {
                                            style: function (feature) {
                                                return {
                                                    color: 'black',
                                                    opacity: 1,
                                                    weight: 2,
                                                    fillOpacity: .1
                                                };
                                            }
                                        });
                                        regionLayer.addTo(glowglobe.current);
                                        glowglobe.current.fitBounds(regionLayer.getBounds());
                                    } else {
                                        glowglobe.current.fitBounds(layer.getBounds());
                                    }
                                    glowglobe.current.setMaxBounds(layer.getBounds());
                                })
                            })
                    }
                    else{
                        fetch(item.url[0]).then(response => response.arrayBuffer())
                            .then(arrayBuffer => {
                                parse_georaster(arrayBuffer).then(georaster => {
                                    var palette = item.palette[0];
                                    var pixelValuesLegend = [];
                                    //console.log(chroma.brewer);
                                    var scale = chroma.scale("RdGy");

                                    var layer = new GeoRasterLayer({
                                        georaster: georaster,
                                        opacity: 1,
                                        pixelValuesToColorFn: function (pixelValues) {
                                            if (palette === 1) {
                                                if (pixelValues[0] === 1) {
                                                    return "#ed8f2f";
                                                } else if (pixelValues[0] === 2) {
                                                    return "#e05f2f";
                                                } else if (pixelValues[0] === 3) {
                                                    return "#d43333";
                                                } else if (pixelValues[0] === 0) {
                                                    return "#ffffff";
                                                }
                                            } else if (palette === 2) {
                                                if (pixelValues[0] === 1) {
                                                    return "#42b05c";
                                                } else if (pixelValues[0] === 2) {
                                                    return "#a0dc67";
                                                } else if (pixelValues[0] === 3) {
                                                    return "#c67f5f";
                                                } else if (pixelValues[0] === 4) {
                                                    return "#12AAB5";
                                                } else if (pixelValues[0] === 5) {
                                                    return "#5D7F99";
                                                } else if (pixelValues[0] === 6) {
                                                    return "#f5d680";
                                                } else if (pixelValues[0] === 7) {
                                                    return "#67b7dc";
                                                }
                                            } else if (palette === 3){
                                                if (pixelValues[0] === -1) {
                                                    return "#d43333";
                                                } else if (pixelValues[0] === 0) {
                                                    return "#fcdd90";
                                                } else if (pixelValues[0] === 1) {
                                                    return "#398e3b";
                                                }
                                            }else if (palette=== 4){
                                                if (pixelValues[0] === 0) {
                                                    return "#fcdd90";
                                                } else if (pixelValues[0] === 1) {
                                                    return "#d43333";
                                                } else if (pixelValues[0] === 2) {
                                                    return "#79a037";
                                                } else if (pixelValues[0] === 3) {
                                                    return "#398e3b";
                                                }
                                            }else {
                                                const min = georaster.mins[0];
                                                const max = georaster.maxs[0];
                                                const range = georaster.ranges[0];

                                                var pixelValue = pixelValues[0]; // there's just one band in this raster

                                                // if there's zero wind, don't return a color
                                                if (pixelValue <= 0) return null;

                                                // scale to 0 - 1 used by chroma
                                                var scaledPixelValue = (pixelValue - min) / range;

                                                var color = scale(scaledPixelValue).hex();
                                                pixelValuesLegend.push(pixelValues);

                                            }

                                            //console.log(color);

                                            return color;
                                        },
                                        resolution: 256 // optional parameter for adjusting display resolution
                                    });

                                    layer.removable = true;
                                    layer.addTo(glowglobe.current);

                                    //Legend
                                    if (palette === 1) {
                                        legend.current = L.control({position: "bottomleft"});
                                        legend.current.onAdd = function () {
                                            var div = L.DomUtil.create("div", "legend");
                                            div.innerHTML += '<i style="background: #d43333"></i><span>Reverse & Reduce: Degraded areas with high risk</span><br>';
                                            div.innerHTML += '<i style="background: #e05f2f"></i><span>Reverse: Degraded areas with low risk</span><br>';
                                            div.innerHTML += '<i style="background: #ed8f2f"></i><span>Avoid: Stable areas with high risk</span><br>';

                                            return div;
                                        };
                                        legend.current.addTo(glowglobe.current);
                                    }else if (palette === 2) {
                                        legend.current= L.control({position: "bottomleft"});
                                        legend.current.onAdd = function () {
                                            var div = L.DomUtil.create("div", "legend");
                                            div.innerHTML += '<i style="background: #42b05c"></i><span>Tree-covered</span><br>';
                                            div.innerHTML += '<i style="background: #a0dc67"></i><span>Grassland</span><br>';
                                            div.innerHTML += '<i style="background: #c67f5f"></i><span>Cropland</span><br>';
                                            div.innerHTML += '<i style="background: #12AAB5"></i><span>Wetland</span><br>';
                                            div.innerHTML += '<i style="background: #5D7F99"></i><span>Artificial area</span><br>';
                                            div.innerHTML += '<i style="background: #f5d680"></i><span>Bare land</span><br>';
                                            div.innerHTML += '<i style="background: #67b7dc"></i><span>Water body</span><br>';

                                            return div;
                                        };
                                        legend.current.addTo(glowglobe.current);
                                    }else if (palette === 4) {
                                        legend.current= L.control({position: "bottomleft"});
                                        legend.current.onAdd = function () {
                                            var div = L.DomUtil.create("div", "legend");
                                            div.innerHTML += '<i style="background: #398e3b"></i><span>Suitable</span><br>';
                                            div.innerHTML += '<i style="background: #79a037"></i><span>Partially Suitable</span><br>';
                                            div.innerHTML += '<i style="background: #fcdd90"></i><span>Neutral</span><br>';
                                            div.innerHTML += '<i style="background: #d43333"></i><span>Non Suitable</span><br>';
                                            return div;
                                        };
                                        legend.current.addTo(glowglobe.current);
                                    }

                                    if (item.point !== undefined) {
                                        let regionLayer = L.geoJSON(item.point, {
                                            style: function (feature) {
                                                return {
                                                    color: 'black',
                                                    opacity: 1,
                                                    weight: 2,
                                                    fillOpacity: .1
                                                };
                                            }
                                        });
                                        regionLayer.addTo(glowglobe.current);
                                        glowglobe.current.fitBounds(regionLayer.getBounds());
                                    } else {
                                        glowglobe.current.fitBounds(layer.getBounds());
                                    }
                                    fetch(item.url[1]).then(response => response.arrayBuffer())
                                        .then(arrayBuffer => {
                                            parse_georaster(arrayBuffer).then(georaster => {
                                                var palette = item.palette[1];
                                                var pixelValuesLegend = [];
                                                var scale = chroma.scale("RdGy");

                                                var layerR = new GeoRasterLayer({
                                                    georaster: georaster,
                                                    opacity: 1,
                                                    pixelValuesToColorFn: function (pixelValues) {
                                                        if(palette === 1) {
                                                            if (pixelValues[0] === 1) {
                                                                return "#ed8f2f";
                                                            } else if (pixelValues[0] === 2) {
                                                                return "#e05f2f";
                                                            } else if (pixelValues[0] === 3) {
                                                                return "#d43333";
                                                            } else if (pixelValues[0] === 0) {
                                                                return "#ffffff";
                                                            }
                                                        }else if (palette === 2) {
                                                            if (pixelValues[0] === 1) {
                                                                return "#42b05c";
                                                            } else if (pixelValues[0] === 2) {
                                                                return "#a0dc67";
                                                            } else if (pixelValues[0] === 3) {
                                                                return "#c67f5f";
                                                            } else if (pixelValues[0] === 4) {
                                                                return "#12AAB5";
                                                            } else if (pixelValues[0] === 5) {
                                                                return "#5D7F99";
                                                            } else if (pixelValues[0] === 6) {
                                                                return "#f5d680";
                                                            } else if (pixelValues[0] === 7) {
                                                                return "#67b7dc";
                                                            }
                                                        }else if (palette === 3){
                                                            if (pixelValues[0] === -1) {
                                                                return "#d43333";
                                                            } else if (pixelValues[0] === 0) {
                                                                return "#fcdd90";
                                                            } else if (pixelValues[0] === 1) {
                                                                return "#398e3b";
                                                            }
                                                        }else if (palette=== 4){
                                                            if (pixelValues[0] === 0) {
                                                                return "#fcdd90";
                                                            } else if (pixelValues[0] === 1) {
                                                                return "#d43333";
                                                            } else if (pixelValues[0] === 2) {
                                                                return "#79a037";
                                                            } else if (pixelValues[0] === 3) {
                                                                return "#398e3b";
                                                            }
                                                        }else {
                                                            const min = georaster.mins[0];
                                                            const max = georaster.maxs[0];
                                                            const range = georaster.ranges[0];

                                                            var pixelValue = pixelValues[0]; // there's just one band in this raster

                                                            // if there's zero wind, don't return a color
                                                            if (pixelValue <= 0) return null;

                                                            // scale to 0 - 1 used by chroma
                                                            var scaledPixelValue = (pixelValue - min) / range;

                                                            var color = scale(scaledPixelValue).hex();
                                                            pixelValuesLegend.push(pixelValues);

                                                        }

                                                        //console.log(color);

                                                        return color;
                                                    },
                                                    resolution: 256 // optional parameter for adjusting display resolution
                                                });


                                                //Legend
                                                if (palette === 1) {
                                                    legend.current = L.control({position: "bottomright"});
                                                    legend.current.onAdd = function () {
                                                        var div = L.DomUtil.create("div", "legend");
                                                        div.innerHTML += '<i style="background: #d43333"></i><span>Reverse & Reduce: Degraded areas with high risk</span><br>';
                                                        div.innerHTML += '<i style="background: #e05f2f"></i><span>Reverse: Degraded areas with low risk</span><br>';
                                                        div.innerHTML += '<i style="background: #ed8f2f"></i><span>Avoid: Stable areas with high risk</span><br>';

                                                        return div;
                                                    };
                                                    legend.current.addTo(glowglobe.current);
                                                }if (palette === 2) {
                                                    legend.current= L.control({position: "bottomright"});
                                                    legend.current.onAdd = function () {
                                                        var div = L.DomUtil.create("div", "legend");
                                                        div.innerHTML += '<i style="background: #42b05c"></i><span>Tree-covered</span><br>';
                                                        div.innerHTML += '<i style="background: #a0dc67"></i><span>Grassland</span><br>';
                                                        div.innerHTML += '<i style="background: #c67f5f"></i><span>Cropland</span><br>';
                                                        div.innerHTML += '<i style="background: #12AAB5"></i><span>Wetland</span><br>';
                                                        div.innerHTML += '<i style="background: #5D7F99"></i><span>Artificial area</span><br>';
                                                        div.innerHTML += '<i style="background: #f5d680"></i><span>Bare land</span><br>';
                                                        div.innerHTML += '<i style="background: #67b7dc"></i><span>Water body</span><br>';

                                                        return div;
                                                    };
                                                    legend.current.addTo(glowglobe.current);
                                                }if (palette === 4) {
                                                    legend.current= L.control({position: "bottomright"});
                                                    legend.current.onAdd = function () {
                                                        var div = L.DomUtil.create("div", "legend");
                                                        div.innerHTML += '<i style="background: #398e3b"></i><span>Suitable</span><br>';
                                                        div.innerHTML += '<i style="background: #79a037"></i><span>Partially Suitable</span><br>';
                                                        div.innerHTML += '<i style="background: #fcdd90"></i><span>Neutral</span><br>';
                                                        div.innerHTML += '<i style="background: #d43333"></i><span>Non Suitable</span><br>';
                                                        return div;
                                                    };
                                                    legend.current.addTo(glowglobe.current);
                                                }

                                                layerR.addTo(glowglobe.current);

                                                layerR.removable = true;
                                                sidebyside.current = L.control.sideBySide(layer, layerR);
                                                sidebyside.current.addTo(glowglobe.current);
                                            })
                                        })
                                    glowglobe.current.setMaxBounds(layer.getBounds());
                                })
                            })
                    }
                }
            })
    }

    const loadSelectedRegion = ()=>{
        if (props.regionLayer.point !== undefined) {
            let regionLayer = L.geoJSON(props.regionLayer.point, {
                style: function (feature) {
                    return {
                        color: 'black',
                        opacity: 1,
                        weight: 2,
                        fillOpacity: .1
                    };
                }
            });
            console.log(regionLayer);
            regionLayer.addTo(glowglobe.current);
            glowglobe.current.fitBounds(regionLayer.getBounds());
        }
    }
    useEffect(() => {

        if(props.container !== undefined){
            setContainerName(props.container);
        }

        initializeMap();
        if(props.regionLayer !== undefined){
            loadSelectedRegion();
        }
    },[]);

    useEffect(() => {
        if((props.country !== undefined)&&(props.country !== null)){
            let requestCountry = "";
            if(props.country === "TN"){
                requestCountry = "TUN";
            }else if (props.country === "BF"){
                requestCountry = "BFA";
            }

            const glowglobeID = {
                functionality:'administrationSelection',
                country:requestCountry,
                administrationLevel: props.defaultAdminLevel
            }

            const qvantumService = new QvantumService();
            qvantumService.getGADMPolygon(requestCountry,props.defaultAdminLevel).then(
                (response)=>{
                    loadRegion(response,glowglobeID,true);
                }
            )

            let classes = glowglobe.current.pm.Toolbar.getButtons().AdministrationLevelSelector.
            buttonsDomNode.
            firstChild.
            firstChild.className.split(" ");

            let filteredClasses = classes.filter(
                (item)=>{
                    if(!item.startsWith("admin-level")){
                        return item
                    }
                }
            )
            if(props.defaultAdminLevel === '1'){
                filteredClasses.push("admin-level-1");
                glowglobe.current.pm.Toolbar.getButtons().AdministrationLevelSelector.
                    buttonsDomNode.
                    firstChild.
                    firstChild.className = filteredClasses.join(" ");
            }

        }
    },[props.country]);

    useEffect(() => {
        if((props.layers !== undefined)&&(props.layers !== null)){
            loadLayers();
        }
    },[props.layers]);

    return (
        <div id={containerName} className="p-mb-4 p-mt-4"></div>
    );

}
