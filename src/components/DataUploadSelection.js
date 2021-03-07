import React, { useState, useEffect, useRef } from 'react';
import {RadioButton} from "primereact/components/radiobutton/RadioButton";
import {FileUpload} from "primereact/components/fileupload/FileUpload";


export const DataUploadSelection = (props) => {

    const [customData, setCustomData] = useState('default');
    const [uploadHidden, setUploadHidden] = useState(true);
    const [dataSource, setDataSource] = useState(null);

    const [defaultTabIndex, setDafaultTabIndex] = useState(1);

    useEffect(() => {
        const dataSourceLabels = props.defaultDataTag;
        if(props.tabIndex !== null){
            const tab = "tab_"+props.tabIndex;
            setDataSource(dataSourceLabels[tab]);
            setCustomData("default");
            setUploadHidden(true);
        }else{
            const tab = "tab_"+defaultTabIndex;
            setDataSource(dataSourceLabels[tab]);
            setCustomData("default");
            setUploadHidden(true);
        }
    },[props.tabIndex]);


    const enableUserUploadData = (e) =>{
        setCustomData(e.value);

        if(e.value === "default"){
            setUploadHidden(true);
        }else if(e.value === "custom"){
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
                        {
                        dataSource?
                            <label htmlFor="default">
                                Use default data ({
                                dataSource.map(
                                    (item,i)=>{
                                        let ubersand = "&";
                                        if(i !== 0){
                                            return <span> {ubersand} <a href={item.url} target="_blank">
                                                {item.label}</a>
                                            </span>

                                        }else{
                                            return <span><a href={item.url} target="_blank">
                                                {item.label}</a>
                                            </span>
                                        }

                                    })

                                })
                            </label>
                            :console.log()
                        }
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton
                        inputId="city2"
                        name="data_selection"
                        value="custom"
                        onChange={(e) => enableUserUploadData(e)}
                        checked={customData === 'custom'} />
                    <label htmlFor="city2">Use custom data</label>
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
