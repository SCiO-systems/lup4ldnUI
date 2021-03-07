import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import ProductService from '../service/ProductService';

export const DataTableEditDemo = () => {
    const [products1, setProducts1] = useState(null);
    const [products2, setProducts2] = useState(null);
    const [products3, setProducts3] = useState(null);
    const toast = useRef(null);
    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Price' }
    ];

    const statuses = [
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];

    let editingCellRows = {};
    let originalRows = {};

    const dataTableFuncMap = {
        'products1': setProducts1,
        'products2': setProducts2,
        'products3': setProducts3
    };

    const productService = new ProductService();

    useEffect(() => {
        fetchProductData('products1');
        fetchProductData('products2');
        fetchProductData('products3');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProductData = (productStateKey) => {
        productService.getProductsSmall().then(data => dataTableFuncMap[`${productStateKey}`](data));
    }

    const positiveIntegerValidator = (e) => {
        const { rowData, field } = e.columnProps;
        return isPositiveInteger(rowData[field]);
    }

    const emptyValueValidator = (e) => {
        const { rowData, field } = e.columnProps;
        return rowData[field].trim().length > 0;
    }

    const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    const onEditorInit = (e) => {
        const { rowIndex: index, field, rowData } = e.columnProps;
        if (!editingCellRows[index]) {
            editingCellRows[index] = {...rowData};
        }
        editingCellRows[index][field] = products2[index][field];
    }

    const onEditorCancel = (e) => {
        const { rowIndex: index, field } = e.columnProps;
        let products = [...products2];
        products[index][field] = editingCellRows[index][field];
        delete editingCellRows[index][field];

        setProducts2(products);
    }

    const onEditorSubmit = (e) => {
        const { rowIndex: index, field } = e.columnProps;
        delete editingCellRows[index][field];
    }

    const onRowEditInit = (event) => {
        originalRows[event.index] = { ...products3[event.index] };
    }

    const onRowEditCancel = (event) => {
        let products = [...products3];
        products[event.index] = originalRows[event.index];
        delete originalRows[event.index];

        setProducts3(products);
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case 'INSTOCK':
                return 'In Stock';

            case 'LOWSTOCK':
                return 'Low Stock';

            case 'OUTOFSTOCK':
                return 'Out of Stock';

            default:
                return 'NA';
        }
    }

    const onEditorValueChange = (productKey, props, value) => {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        dataTableFuncMap[`${productKey}`](updatedProducts);
    }

    const inputTextEditor = (productKey, props, field) => {
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productKey, props, e.target.value)} />;
    }

    const codeEditor = (productKey, props) => {
        return inputTextEditor(productKey, props, 'code');
    }

    const nameEditor = (productKey, props) => {
        return inputTextEditor(productKey, props, 'name');
    }

    const priceEditor = (productKey, props) => {
        return <InputNumber value={props.rowData['price']} onValueChange={(e) => onEditorValueChange(productKey, props, e.value)} mode="currency" currency="USD" locale="en-US" />
    }

    const statusEditor = (productKey, props) => {
        return (
            <Dropdown value={props.rowData['inventoryStatus']} options={statuses} optionLabel="label" optionValue="value"
                      onChange={(e) => onEditorValueChange(productKey, props, e.value)} style={{ width: '100%' }} placeholder="Select a Status"
                      itemTemplate={(option) => {
                          return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
                      }} />
        );
    }

    const statusBodyTemplate = (rowData) => {
        return getStatusLabel(rowData.inventoryStatus);
    }

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(rowData.price);
    }
    const requiredValidator = (props) => {
        //console.log(e);
        //let props = e.columnProps;
        let value = props.rowData[props.field];
        console.log(value && value.length > 0)

        if(value>15){
            return true;
        }else{
            return false;
        }
    }

    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />

            <div className="card">
                <h5>Basic Cell Editing</h5>
                <DataTable value={products1} className="editable-cells-table">
                    <Column field="code" header="Code" editor={(props) => codeEditor('products1', props)}></Column>
                    <Column field="name" header="Name" editor={(props) => nameEditor('products1', props)}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} editor={(props) => statusEditor('products1', props)}></Column>
                    <Column field="price" header="Price"
                            body={priceBodyTemplate}
                            editor={(props) => priceEditor('products1', props)}
                            editorValidator={(props) => requiredValidator(props)}
                            editorValidatorEvent="blur"
                    >

                    </Column>
                </DataTable>
            </div>
            <div className="card">
                <h5>Row Editing</h5>
                <DataTable value={products3} editMode="row" dataKey="id" onRowEditInit={onRowEditInit} onRowEditCancel={onRowEditCancel}>
                    <Column field="code" header="Code" editor={(props) => codeEditor('products3', props)}></Column>
                    <Column field="name" header="Name" editor={(props) => nameEditor('products3', props)}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} editor={(props) => statusEditor('products3', props)}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} editor={(props) => priceEditor('products3', props)}></Column>
                    <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        </div>
    );
}
