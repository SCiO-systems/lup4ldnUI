import axios from 'axios';

export default class CacipGeonode {

    downloadData(geoserverLocation,downloadList,type){

        let outputFormat = '';
        let extension = '';
        let mime = '';

        if(type === 'CSV'){
            outputFormat = 'csv';
            extension =  '.csv';
            mime = 'text/csv;charset=utf-8';
        }else if(type === 'XLS'){
            outputFormat = 'excel';
            extension =  '.xls';
            mime = 'application/vnd.ms-excel';
        }else if(type === 'JSON'){
            outputFormat = 'text/javascript';
            extension =  '.json';
            mime = 'text/javascript;charset=utf-8';
        }else if(type === 'JPG'){
            outputFormat = 'image/jpeg';
            extension =  '.jpg';
            mime = 'image/jpeg';
        }else if(type === 'PNG'){
            outputFormat = 'image/png';
            extension =  '.png';
            mime = 'image/png';
        }else if(type === 'KML'){
            outputFormat = 'KML';
            extension =  '.kml';
            mime = 'application/vnd.google-earth.kml+xml;';
        }else if(type === 'GML'){
            outputFormat = 'GML2';
            extension =  '.gml';
            mime = 'application/gml+xml;';
        }

        downloadList.map(
            (layer) =>{
                axios.get(
                    geoserverLocation+'/wfs?' +
                    'request=GetFeature&service=wfs&version=1.0.0&' +
                    'typename=geonode:'+layer.name+'&' +
                    'outputformat='+outputFormat
                ).then(
                    (response) => {
                        console.log(response);
                        let blob = new Blob([response.data],{type:mime});
                        const element = document.createElement("a");
                        element.href = URL.createObjectURL(blob);
                        element.download = layer.name+extension;
                        document.body.appendChild(element);
                        element.click();
                    }
                )
            }
        )

    }

    async buildData(geoserverLocation){

        const layersList = await axios.get(
            geoserverLocation+'/rest/layers.json',
            {headers:{'Content-Type':'application/json'}})
            .then((res) => res.data);

        const layers = layersList.layers.layer;

        const data = await Promise.all(layers.map(
            async (layer,index) => {
                const href = layer.href
                try{
                    //Fetch Basic Details
                    const layerDetails = await axios.get(
                        href,
                        {headers: {'Content-Type': 'application/json'}})
                        .then((res) => res.data);

                    //Fetch Feature Types
                    const layerFeatureTypes = await axios.get(
                        layerDetails.layer.resource.href,
                        {headers: {'Content-Type': 'application/json'}})
                        .then((res) => res.data);

                    //Construct Full Layer
                    if(layerFeatureTypes.featureType !== undefined){

                        const attributes = layerFeatureTypes.featureType.attributes.attribute;

                        const attributesList = attributes.map(
                            (value) => {
                                let dataType = "Other";
                                if(value.binding.includes("Double")){
                                    dataType = "Double";
                                }else if(value.binding.includes("Integer")){
                                    dataType = "Integer";
                                }else if(value.binding.includes("Long")){
                                    dataType = "Long";
                                }else if(value.binding.includes("String")){
                                    dataType = "String";
                                }else if(value.binding.includes("MultiPolygon")){
                                    dataType = "MultiPolygon";
                                }

                                const attribute = {
                                    name: value.name,
                                    dataType: dataType
                                }
                                return attribute;
                            }
                        )

                        const fullLayerObject = {
                            name : layerDetails.layer.name,
                            type: layerDetails.layer.type,
                            abstract: layerFeatureTypes.featureType.abstract,
                            attributes: attributesList,
                            keywords: layerFeatureTypes.featureType.keywords,
                            srs: layerFeatureTypes.featureType.srs,
                            boundingBox: layerFeatureTypes.featureType.nativeBoundingBox,
                            thumbnail: geoserverLocation +
                            "/wms/reflect?layers="+layerDetails.layer.name,
                            disabled: false,
                            index: index
                        }
                        return fullLayerObject;
                    }
                }catch(err){
                    console.log(err);
                }
            }
        ))

        const fullLayersList = data.filter(function( element ) {
            return element !== undefined;
        });

        return fullLayersList;
    }


    //https://test.geonode.centralasiaclimateportal.org/geoserver/rest/workspaces/geonode/datastores/cacip_data/featuretypes/Agricultural_Lands_Aksuu.json
    getThumbnail(){
        return axios.get('https://test.geonode.centralasiaclimateportal.org/geoserver/wms/reflect?layers=Kvartals_Aksuu').then((res) => res.data.data);
    }
}
