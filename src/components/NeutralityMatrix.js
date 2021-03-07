import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import {Column} from "primereact/components/column/Column";
import {InputNumber} from "primereact/components/inputnumber/InputNumber";
import {Button} from "primereact/components/button/Button";
import {ToggleButton} from "primereact/components/togglebutton/ToggleButton";

export const NeutralityMatrix = (props) => {

    const [scenario, setScenario] = useState(null);
    const [selectedCustomers2, setSelectedCustomers2] = useState(null);
    const [loading2, setLoading2] = useState(true);
    const [scenarioName,setScenarioName] = useState(null)


    const format = (num,decimals) => {
        return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    useEffect(() => {
        if(props.scenario !== undefined){


            var headerTitle = "Scenario "+props.scenario.scenarioStart +" - "+props.scenario.scenarioEnd
            setScenarioName(headerTitle);

            var sumLC = 0;
            var sumImpact = 0;
            var tabularScenario = props.scenario.final_lc_per_class.map(
                (item,index) =>{
                    var row = {}

                    if(item.landId === "treecovered"){
                        row.title = "Tree-covered"
                    }else if(item.landId === "grassland"){
                        row.title = "Grassland"
                    }else if(item.landId === "cropland"){
                        row.title = "Cropland"
                    }else if(item.landId === "wetland"){
                        row.title = "Wetland"
                    }else if(item.landId === "artificialarea"){
                        row.title = "Artificial area"
                    }else if(item.landId === "bareland"){
                        row.title = "Bare land"
                    }else if(item.landId === "waterbody"){
                        row.title = "Water body"
                    }

                    row.landCoverage = format(item.landCoverage,2);
                    row.impact = format(props.scenario.impacts[index].impact,2);

                    sumLC = sumLC + item.landCoverage;
                    sumImpact = sumImpact + props.scenario.impacts[index].impact;

                    return row;
                }
            )

            var totalRow = {
                title: "Total",
                landCoverage: format(sumLC,2),
                impact: format(sumImpact,2)
            }

            tabularScenario.push(totalRow);

            setScenario(tabularScenario);
            setLoading2(false);
        }

    }, []);

    const staticColumn = (data, props) => {
        return (
            <>
                {data.title}
            </>
        );
    };

    const impactColumn = (data, props) => {
        return (
            <>
                {data.impact} ha
            </>
        );
    };

    const coverageColumn = (data, props) => {
        return (
            <>
                {data.landCoverage} ha
            </>
        );
    };

    const header =(
            <div className="table-header">
                {scenarioName}
            </div>
        )



    return (
        <div>
            <div className="table-demo">
                {
                    scenario?
                        <div>
                            <DataTable
                                value={scenario}
                                className="p-datatable-gridlines p-datatable-striped p-datatable-sm p-datatable-customers"
                                rows={10}
                                dataKey="id"
                                rowHover
                                selection={selectedCustomers2}
                                onSelectionChange={(e) => setSelectedCustomers2(e.value)}
                                loading={loading2}
                                editMode="row"
                                header = {header}
                            >

                                <Column
                                    field="name"
                                    header="Land Type"
                                    body={staticColumn}>
                                </Column>
                                <Column
                                    field="impact"
                                    header="Land Degradation Impact"
                                    body={impactColumn}>
                                </Column>
                                <Column
                                    field="landcoverage"
                                    header="Land Coverage"
                                    body={coverageColumn}>
                                </Column>

                            </DataTable>
                        </div>
                        :console.log()
                }

            </div>
        </div>
    )



}
