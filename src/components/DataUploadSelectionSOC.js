import React, { useState, useEffect, useRef } from 'react';
import {RadioButton} from "primereact/components/radiobutton/RadioButton";
import {FileUpload} from "primereact/components/fileupload/FileUpload";


export const DataUploadSelectionSOC = (props) => {

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
        }else if(e.value === "matrix"){
            setUploadHidden(true);
        }else if(e.value === "soc"){
            setUploadHidden(false);
        }

        props.selectedValue(e.value);

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
                        value="matrix"
                        onChange={(e) => enableUserUploadData(e)}
                        checked={customData === 'matrix'} />
                    <label htmlFor="city2">Use SOC transfer coefficient matrix</label>
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton
                        inputId="city3"
                        name="data_selection_ld"
                        value="soc"
                        onChange={(e) => enableUserUploadData(e)}
                        checked={customData === 'soc'} />
                    <label htmlFor="city3">Use custom SOC projection data</label>
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
