import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import {Column} from "primereact/components/column/Column";
import {InputNumber} from "primereact/components/inputnumber/InputNumber";
import {Button} from "primereact/components/button/Button";
import {ToggleButton} from "primereact/components/togglebutton/ToggleButton";

export const TransitionMatrix = (props) => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [scenarioStart, setScenarioStart] = useState(null);
    const [scenarioEnd, setScenarioEnd] = useState(null);
    const [scenario, setScenario] = useState(null);
    const [scenarioName,setScenarioName] = useState(null)
    const [onChecked,setOnChecked] = useState(false)
    const [toggleButtonState,setToggleButtonState] = useState(false)


    useEffect(() => {
        if(props.scenario !== undefined){
            setScenarioName(props.scenario.scenarioName);
            setScenario(props.scenario.landTypes);
            setScenarioStart(props.scenario.scenarioPeriod.scenarioStart);
            setScenarioEnd(props.scenario.scenarioPeriod.scenarioEnd);
        }

    }, []);

    const format = (num,decimals) => {
        return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    const onEditorValueChange = (props, value,landId) => {
        var row = scenario.find(function(item) {
            return item.landId === landId;
        });

        var endRow = scenario.find(function(item) {
            return item.landId === props.rowData.landId;
        });

        var fluent_breakDown = row.breakDownLimit.value + row.breakDown[props.rowIndex].landCoverage.value;

        if(fluent_breakDown <= value){
            row.breakDown[props.rowIndex].landCoverage.value = fluent_breakDown;
            row.breakDownLimit.value = 0;
        }else{
            row.breakDown[props.rowIndex].landCoverage.value = value;
            row.breakDownLimit.value = fluent_breakDown - value;
        }

        //SUM
        var sumBaseline = 0;
        scenario.forEach(
            (item)=>{
                if(item.landId !== landId){
                    item.breakDown.forEach(
                        (breakDownItem)=>{
                            if(breakDownItem.landId === landId){
                                sumBaseline = sumBaseline + breakDownItem.landCoverage.value;
                            }
                        }
                    )
                }
            }
        )
        row.endLandCoverage.value = row.breakDownLimit.value + sumBaseline;

        var sumEditline = 0;
        scenario.forEach(
            (item)=>{
                if(item.landId !== props.rowData.landId){
                    item.breakDown.forEach(
                        (breakDownItem)=>{
                            if(breakDownItem.landId === props.rowData.landId){
                                sumEditline = sumEditline + breakDownItem.landCoverage.value;
                            }
                        }
                    )
                }
            }
        )
        endRow.endLandCoverage.value =  endRow.breakDownLimit.value + sumEditline;

        setScenario([...scenario]);
    }

    const coverageEditor = (props,landId) => {
        //setOnChecked
        if(onChecked === true){
            return <InputNumber
                value={props.rowData.landCoverage.value}
                showButtons={true}
                suffix="ha"
            />
        }else{

            var row = scenario.find(function(item) {
                return item.landId === landId;
            });

            var value = props.rowData.landCoverage.value;

            return <InputNumber
                value={props.rowData.landCoverage.value}
                onValueChange={(e) => onEditorValueChange(props,e.value,landId)}
                min={0} max={row.breakDownLimit.value+value} showButtons={true}
                suffix="ha"
            />
        }
    }

    const requiredValidator = () => {
        return true;
    }

    const pickAreaButton = () => {
        return <Button label="Map" tooltip="Define transition area on the map" icon="fad fa-map-pin"/>;
    }

    const uploadButton = () => {
        return <Button label="" tooltip="Upload a polygon for this transition" icon="fad fa-upload"/>;
    }

    const rowExpansionTemplate = (scenario) => {
        return (
            <div className="orders-subtable datatable-editing-demo">
                <DataTable
                    value={scenario.breakDown}
                    className="editable-cells-table"
                    rowHover={true}
                >
                    <Column
                        field="landType"
                        header="BECOMES"
                        body={basicColumn}>
                    </Column>
                    <Column
                        field="landCoverage"
                        header=""
                        body={startCoverageHeader}
                        editorValidatorEvent="blur"
                        editor={(props) => coverageEditor(props,scenario.landId)}
                        editorValidator={(props) => requiredValidator(props)}
                    >
                    </Column>
                    <Column
                        field="pickArea"
                        header=""
                        body={pickAreaButton}
                        headerStyle={{width: '6em', textAlign: 'center'}}
                        bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                    >
                    </Column>
                    <Column
                        field="upload"
                        header=""
                        body={uploadButton}
                        headerStyle={{width: '6em', textAlign: 'center'}}
                        bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                    >
                    </Column>
                </DataTable>
            </div>
        );
    };

    const saveStatus = (e) =>{
        props.callback(e,scenario)
        setOnChecked(e);
        setToggleButtonState(true);

    }

    const productsTableHeader =
        (

            <div className="p-grid p-col-12 justify-content-between  vertical-container">
                <div>
                    {
                        scenarioName
                    }
                </div>
                <div>
                    <ToggleButton
                        onLabel="Saved"
                        offLabel="Save"
                        onIcon="fad fa-check"
                        offIcon="fad fa-save"
                        className="g-save"
                        checked={onChecked}
                        disabled = {toggleButtonState}
                        onChange={(e) => saveStatus(e.value)} />
                </div>
            </div>

        );

    const basicColumn = (scenario, props) => {

        return (
            <>
                <span className="p-column-title">{props.header}</span>
                {
                    scenario.landType
                }
            </>
        );
    };

    const startCoverageHeader = (scenario) =>{

        let startingCoverage = format(scenario.landCoverage.value,2)+" "+scenario.landCoverage.unit;
        return (<>{startingCoverage}</>);

    }

    const endCoverageHeader = (scenario) =>{
        let endCoverage = format(scenario.endLandCoverage.value,2)+" "+scenario.landCoverage.unit;
        return (<>{endCoverage}</>);

    }

    return (
        <div>
            <div className="table-demo">
                {
                    scenario?
                        <DataTable
                            value={scenario}
                            expandedRows={expandedRows}
                            className="p-datatable-customers"
                            dataKey="landId"
                            onRowToggle={(e) => {setExpandedRows(e.data);}
                            }
                            header = {productsTableHeader}
                            rowExpansionTemplate = {rowExpansionTemplate}
                            rowHover = {true}
                        >
                            <Column expander headerStyle={{ width: '3rem' }} />
                            <Column field="landType" header="Land Type" body={basicColumn}></Column>
                            <Column style={{textAlign:"right"}} field="landCoverage" header={scenarioStart} body={startCoverageHeader}></Column>
                            <Column style={{textAlign:"right"}} field="landCoverage" header={scenarioEnd} body={endCoverageHeader}></Column>
                        </DataTable>
                        :console.log()
                }

            </div>
        </div>
    )



}
