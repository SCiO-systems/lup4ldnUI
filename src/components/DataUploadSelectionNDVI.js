import React, { useState, useEffect, useRef } from 'react';
import {RadioButton} from "primereact/components/radiobutton/RadioButton";
import {FileUpload} from "primereact/components/fileupload/FileUpload";


export const DataUploadSelectionNDVI = (props) => {

    const [customData, setCustomData] = useState('default');
    const [uploadHidden, setUploadHidden] = useState(true);
    const [dataSource, setDataSource] = useState(null);

    const [defaultTabIndex, setDafaultTabIndex] = useState(1);

    useEffect(() => {

    },[]);


    const enableUserUploadData = (e) =>{
        setCustomData(e.value);

        if(e.value === "default"){
            setUploadHidden(true);
        }else if(e.value === "gndvi"){
            setUploadHidden(true);
        }else if(e.value === "ndvi"){
            setUploadHidden(false);
        }

    }

    const onUpload = () => {
        console.log("upload");
    }

    return (
        <div>
            <div className="p-col-12">
                <div className="p-field-radiobutton">
                    <RadioButton
                        inputId="default"
                        name="data_selection"
                        value="default"
                        onChange={(e) => enableUserUploadData(e)}
                        checked={customData === 'default'} />
                        <label htmlFor="default">
                            Skip step
                        </label>
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton
                        inputId="city2"
                        name="data_selection"
                        value="gndvi"
                        onChange={(e) => enableUserUploadData(e)}
                        checked={customData === 'gndvi'} />
                    <label htmlFor="city2">Use gridded maps of NDVI projections (NOT SUPPORTED YET)</label>
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton
                        inputId="city3"
                        name="data_selection_ld"
                        value="ndvi"
                        onChange={(e) => enableUserUploadData(e)}
                        checked={customData === 'ndvi'} />
                    <label htmlFor="city3">Use custom NDVI projection data</label>
                </div>
            </div>

            <div className="p-col-12" hidden={uploadHidden}>
                <h4>Upload your Data</h4>
                <FileUpload name="demo[]"
                            url="./upload.php"
                            onUpload={onUpload}
                            multiple
                            accept="image/*"
                            maxFileSize={1000000} />
            </div>
        </div>
    )
}
