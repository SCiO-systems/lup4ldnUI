import React, {useState, useEffect, useRef} from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import {Toast} from "primereact/components/toast/Toast";
import {DataTable} from "primereact/components/datatable/DataTable";
import ProductService from '../service/ProductService';
import CustomerService from '../service/CustomerService';
import {InputText} from "primereact/components/inputtext/InputText";
import {Dialog} from "primereact/components/dialog/Dialog";
import {Toolbar} from "primereact/components/toolbar/Toolbar";
import {SplitButton} from "primereact/components/splitbutton/SplitButton";
import {InputSwitch} from "primereact/components/inputswitch/InputSwitch";
import {DataView, DataViewLayoutOptions} from "primereact/components/dataview/DataView";
import {Dropdown} from "primereact/components/dropdown/Dropdown";
import {Fieldset} from "primereact/components/fieldset/Fieldset";
import CacipGeonode from '../service/CacipGeonode';
import {OverlayPanel} from "primereact/components/overlaypanel/OverlayPanel";


export const Browser = () => {

    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayTitle, setDisplayTitle] = useState(false);

    const [customer1, setCustomer1] = useState(null);
    const [customer2, setCustomer2] = useState(null);
    const [customer3, setCustomer3] = useState(null);
    const [selectedCustomers1, setSelectedCustomers1] = useState(0);
    const [selectedCustomers2, setSelectedCustomers2] = useState(null);
    const [globalFilter1, setGlobalFilter1] = useState('');
    const [globalFilter2, setGlobalFilter2] = useState('');
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [products, setProducts] = useState(null);
    const [expandedRows, setExpandedRows] = useState([]);

    const [imageDialog, setImage] = useState("");
    const [switchValue, setSwitchValue] = useState(false);
    const [dataGrid, setDataGrid] = useState(false);
    const [dataviewLabel, setdataviewLabel] = useState("Simple");
    const [dataviewValue, setDataviewValue] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [closeBrowser, setCloseBrowser] = useState(false);
    const [layersList, setLayersList] = useState(null);

    const [downloadList,setDownloadList] = useState([]);
    const [browseReady,setBrowseReady] = useState(false);

    const dt = useRef(null);
    const toast = useRef();
    const op2 = useRef(null);

    const geoserverLocation = "https://test.geonode.centralasiaclimateportal.org/geoserver/";

    const items = [
        {
            label: 'SHP',
            icon: 'fad fa-globe',
            command: (e) => {
                toast.current.show(
                    {
                        severity:'success',
                        summary:'Downloading...',
                        detail:'Number of Layers: '+downloadList.length+'/Type: SHP'}
                );
                const cacipGeonode = new CacipGeonode();
                cacipGeonode.downloadData(geoserverLocation,downloadList,"SHP");
            }
        },
        {
            label: 'CSV',
            icon: 'fad fa-file-csv',
            command: (e) => {
                toast.current.show(
                    {
                        severity:'success',
                        summary:'Downloading...',
                        detail:'Number of Layers: '+downloadList.length+'/Type: CSV'}
                    );
                const cacipGeonode = new CacipGeonode();
                cacipGeonode.downloadData(geoserverLocation,downloadList,"CSV");
            }
        },
        {
            label: 'PNG',
            icon: 'fad fa-file-image',
            command: (e) => {
                toast.current.show(
                    {
                        severity:'success',
                        summary:'Downloading...',
                        detail:'Number of Layers: '+downloadList.length+'/Type: PNG'}
                );
                const cacipGeonode = new CacipGeonode();
                cacipGeonode.downloadData(geoserverLocation,downloadList,"PNG");
            }
        },
        {
            label: 'JPG',
            icon: 'fad fa-file-image',
            command: (e) => {
                toast.current.show(
                    {
                        severity:'success',
                        summary:'Downloading...',
                        detail:'Number of Layers: '+downloadList.length+'/Type: JPG'}
                );
                const cacipGeonode = new CacipGeonode();
                cacipGeonode.downloadData(geoserverLocation,downloadList,"JPG");
            }
        },
        {
            label: 'XLS',
            icon: 'fad fa-file-spreadsheet',
            command: (e) => {
                toast.current.show(
                    {
                        severity:'success',
                        summary:'Downloading...',
                        detail:'Number of Layers: '+downloadList.length+'/Type: XLS'}
                );
                const cacipGeonode = new CacipGeonode();
                cacipGeonode.downloadData(geoserverLocation,downloadList,"XLS");
            }
        },
        {
            label: 'JSON',
            icon: 'fad fa-brackets-curly',
            command: (e) => {
                toast.current.show(
                    {
                        severity:'success',
                        summary:'Downloading...',
                        detail:'Number of Layers: '+downloadList.length+'/Type: JSON'}
                );
                const cacipGeonode = new CacipGeonode();
                cacipGeonode.downloadData(geoserverLocation,downloadList,"JSON");
            }
        },
        {
            label: 'KML',
            icon: 'fad fa-vector-square',
            command: (e) => {
                toast.current.show(
                    {
                        severity:'success',
                        summary:'Downloading...',
                        detail:'Number of Layers: '+downloadList.length+'/Type: KML'}
                );
                const cacipGeonode = new CacipGeonode();
                cacipGeonode.downloadData(geoserverLocation,downloadList,"KML");
            }
        },
        {
            label: 'GML',
            icon: 'fad fa-file-code',
            command: (e) => {
                toast.current.show(
                    {
                        severity:'success',
                        summary:'Downloading...',
                        detail:'Number of Layers: '+downloadList.length+'/Type: GML'}
                );
                const cacipGeonode = new CacipGeonode();
                cacipGeonode.downloadData(geoserverLocation,downloadList,"GML");
            }
        },
        {
            label: 'PDF',
            icon: 'fad fa-file-pdf'
        }
    ];

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const sortOptions = [
        { label: 'A -> Z', value: 'name' },
        { label: 'Z -> A', value: '!name' }
    ];


    const toggleDataTable = (event) => {
        op2.current.toggle(event);
    };

    const rowClick = (event) => {
        if(event.originalEvent.target.nodeName === "IMG"){
            setImage(event.originalEvent.target.src);
            setDisplayTitle("Thumbnail Of "+event.originalEvent.target.id);
            setDisplayBasic(true);
        }

    };

    const closeBrowserWidget = (event) => {
        setCloseBrowser(!closeBrowser);
    };

    const changeDataView = (event) => {
        setSwitchValue(!switchValue);
        setDataGrid(!dataGrid);

        if(switchValue == true){
            setdataviewLabel("Simple");
        }else if (switchValue == false){
            setdataviewLabel("Advanced");
        }

    };

    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };

    const basicDialogFooter =
        <Button type="button"
                label="OK"
                onClick={() => setDisplayBasic(false)}
                icon="pi pi-check" className="p-button-text" />;

    const customer1TableHeader = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="fal fa-filter" />
                <InputText value={globalFilter1} onChange={(e) => setGlobalFilter1(e.target.value)} placeholder=" Filter" />
            </span>
        </div>
    );


    const bodyTemplate = (layersList, props) => {
        return (
            <>
                <span className="p-column-title" title={layersList[props.field]}>{props.header}</span>
                {layersList[props.field]}
            </>
        );
    };

    const imageBodyTemplate = (layersList) => {
        return (
            <>

                <span className="p-column-title">Image</span>
                <img width="67" height="100" id={layersList.name} src={layersList.thumbnail} alt={layersList.name} className="product-image" />
            </>
        );
    };

    const srsBodyTemplate = (layersList,props) => {
        return (
            <>
                <span className="p-column-title">{props.header}</span>
                {layersList.srs}
            </>
        );
    };

    const rowExpansionTemplate = (layersList) => {
        return (
            <div className="orders-subtable">
                <h5>Attributes of {layersList.name}</h5>
                <DataTable value={layersList.attributes}>
                    <Column field="name" header="Attribute" sortable body={bodyTemplate}></Column>
                    <Column field="dataType" header="Data Type" sortable body={bodyTemplate}></Column>
                </DataTable>
            </div>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button tooltip="Click to proceed" type="button" label={"Selected Layers: "+downloadList.length}
                        onClick={toggleDataTable} className="p-button-outlined p-button-success"
                        disabled = {!browseReady}
                />
                <OverlayPanel ref={op2} appendTo={document.body} showCloseIcon id="overlay_panel" style={{ width: '450px' }}>
                    <DataTable
                        ref={dt}
                        value={downloadList}
                        expandedRows={expandedRows}
                        className="p-datatable-customers"
                        dataKey="name"
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowCollapse={onRowCollapse}
                        selection={selectedCustomers1}
                        onSelectionChange={(e) => setSelectedCustomers1(e.value)}
                        rowExpansionTemplate={rowExpansionTemplate}
                        paginator
                        rows={5}
                        loading={loading1}
                        autoLayout={true}
                    >

                        <Column field="name" header="Name" body={bodyTemplate}></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                    </DataTable>
                </OverlayPanel>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    tooltip="Click to proceed"
                    label="Load Layers"
                    type="button"
                    icon="fad fa-truck-loading"
                    className="p-mr-2"
                    disabled = {!browseReady}
                />
                <SplitButton
                    tooltip="Click to proceed"
                    label="Download Layers"
                    icon="fad fa-download"
                    model={items}
                    className="p-button-secondary p-mr-2 " >
                    disabled = {!browseReady}
                </SplitButton>
            </React.Fragment>
        )
    }

    const leftUpperToolbarTemplate = () => {
        return (
            <React.Fragment>
                <span className="p-mr-2">{dataviewLabel}</span>
                <InputSwitch
                    tooltip="Click to proceed"
                    className="p-mr-6"
                    checked={switchValue}
                    onChange={(e) => changeDataView(e)}
                    disabled = {!browseReady}
                />
            </React.Fragment>
        )
    }

    const rightUpperToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    className="p-mr-2 p-button-outlined"
                    tooltip="Click to proceed"
                    label="Export List"
                    icon="fad fa-file-csv"
                    onClick={exportCSV}
                    disabled = {!browseReady}
                />
                <Button
                    icon="fad fa-times"
                    tooltip="Click to proceed"
                    className="p-button-outlined p-button-danger"
                    onClick={closeBrowserWidget}
                    disabled = {!browseReady}
                />
            </React.Fragment>
        )
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const dataviewHeader = (
        <div className="p-grid p-nogutter">
            <div className="p-col-6" style={{ textAlign: 'left' }}>
                <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Sort By Title" onChange={onSortChange} />
            </div>
            <div className="p-col-6" style={{ textAlign: 'right' }}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        }
        else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    const dataviewListItem = (localLayersList) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img height="131" width="196" id={localLayersList.name} src={localLayersList.thumbnail} alt={localLayersList.thumbnail} />
                    <div className="product-list-detail">
                        <div className="product-name">{localLayersList.name}</div>
                        <div className="product-description">{layersList.abstract}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{localLayersList.type}</span>
                    </div>
                    <div className="product-list-action">
                        <Button
                            icon="fad fa-layer-plus"
                            data={JSON.stringify(localLayersList)}
                            onClick={(e) => {
                                let tempLayers = [...layersList];
                                localLayersList.disable = !localLayersList.disable;
                                tempLayers[localLayersList.index] = localLayersList;
                                setLayersList(tempLayers);
                                updateDownloadList(e)
                            }
                            }
                            label="Add to Download List"
                            disabled = {localLayersList.disable}
                        >
                        </Button>
                        <Button
                            className="p-button-danger"
                            icon = "fad fa-layer-minus"
                            data={JSON.stringify(localLayersList)}
                            onClick={(e) =>{
                                let tempLayers = [...layersList];
                                localLayersList.disable = !localLayersList.disable;
                                tempLayers[localLayersList.index] = localLayersList;
                                setLayersList(tempLayers);
                                removeDownloadList(e);
                            }
                            }
                            label="Remove from Download List"
                            disabled = {!localLayersList.disable}
                        >

                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (localLayersList) => {
        let title = localLayersList.name;
        if(localLayersList.name.length>15){
            title = title.substr(0,13)+". . . ";
        }
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{localLayersList.type}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <img height="131" width="196" id={localLayersList.name} src={localLayersList.thumbnail} alt={localLayersList.thumbnail} />
                        <div className="product-name">{title}</div>
                        <div className="product-description">{localLayersList.abstract}</div>
                    </div>
                    <div className="product-grid-item-bottom p-d-flex">
                        <div className="p-ml-auto">
                            <Button
                                className="p-mr-2"
                                icon = "fad fa-layer-plus"
                                data={JSON.stringify(localLayersList)}
                                onClick={(e) => {
                                    let tempLayers = [...layersList];
                                    localLayersList.disable = !localLayersList.disable;
                                    tempLayers[localLayersList.index] = localLayersList;
                                    setLayersList(tempLayers);
                                    updateDownloadList(e)
                                }
                                }
                                disabled = {localLayersList.disable}
                            >
                            </Button>
                            <Button
                                className="p-button-danger"
                                icon = "fad fa-layer-minus"
                                data={JSON.stringify(localLayersList)}
                                onClick={(e) =>{
                                        let tempLayers = [...layersList];
                                        localLayersList.disable = !localLayersList.disable;
                                        tempLayers[localLayersList.index] = localLayersList;
                                        setLayersList(tempLayers);
                                        removeDownloadList(e);
                                    }
                                }
                                disabled = {!localLayersList.disable}
                            >
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const updateDownloadList = (event) => {
        if("value" in event){
            setDownloadList(event.value);
        }else if(event.target.className.includes("fad") ||
            event.target.className.includes("p-button")){
            if(event.target.offsetParent.getAttribute("data") !== null){
                setDownloadList([...downloadList, JSON.parse(event.target.offsetParent.getAttribute("data"))]);
            }else if(event.target.getAttribute("data") !== null){
                setDownloadList([...downloadList,JSON.parse(event.target.getAttribute("data"))]);
            }
        }
    }

    const removeDownloadList = (event) => {
        let layerName = "";
        if("value" in event){
            layerName=event.value.name;
        }else if(event.target.className.includes("fad") ||
            event.target.className.includes("p-button")){
            if(event.target.offsetParent.getAttribute("data") !== null){
                let layer = JSON.parse(event.target.offsetParent.getAttribute("data"));
                layerName = layer.name;
            }else if(event.target.getAttribute("data") !== null){
                let layer = JSON.parse(event.target.getAttribute("data"));
                layerName = layer.name;
            }
        }
        const reducedDownloadList = downloadList.filter((layer) => layer.name !== layerName);
        setDownloadList(reducedDownloadList);
    }

    useEffect(() => {

        const cacipGeonode = new CacipGeonode();
        cacipGeonode.buildData(geoserverLocation).then(
            data => {
                setLayersList(data);
                setLoading1(false);
                setBrowseReady(true);
            }
        );

        setSelectedCustomers1(0);
        const customerService = new CustomerService();
        const productService = new ProductService();
        productService.getProductsWithOrdersSmall().then(data => setProducts(data));
        customerService.getCustomersMedium().then(data => { setCustomer1(data); setLoading2(false) });
        customerService.getCustomersLarge().then(data => { setCustomer2(data); setLoading2(false) });
        customerService.getCustomersMedium().then(data => setCustomer3(data));
        productService.getProducts().then(data1 => setDataviewValue(data1));

    }, []);

    return (


        <div className="p-col-12" hidden={closeBrowser}>

        <div className="card p-shadow-6">
            <Fieldset legend="Browse" toggleable>
            <Toast ref={toast} />
            <Toolbar className="p-mb-4"
                     left={leftUpperToolbarTemplate} right={rightUpperToolbarTemplate}></Toolbar>
            <div className="table-demo" hidden={!dataGrid}>
                <DataTable
                    ref={dt}
                    value={layersList}
                    expandedRows={expandedRows}
                    className="p-datatable-customers"
                    dataKey="name"
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand}
                    onRowCollapse={onRowCollapse}
                    selection={downloadList}
                    onSelectionChange={(e) => updateDownloadList(e)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    exportable
                    rowHover
                    globalFilter={globalFilter1}
                    header={customer1TableHeader}
                    onRowClick={rowClick}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    loading={loading1}
                    autoLayout={true}
                >

                    <Column expander headerStyle={{ width: '3rem' }} />
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="name" header="Name" sortable body={bodyTemplate}></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="srs" header="Spatial Reference System" sortable body={srsBodyTemplate}></Column>
                    <Column field="type" header="Type" sortable body={bodyTemplate}></Column>
                </DataTable>
            </div>

            <div className="list-demo" hidden={dataGrid}>
                <DataView
                    value={layersList}
                    layout={layout}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    sortOrder={sortOrder}
                    sortField={sortField}
                    itemTemplate={itemTemplate}
                    header={dataviewHeader}
                    globalFilter={globalFilter1}
                    loading={loading1}
                >

                </DataView>
            </div>

            <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            </Fieldset>

            <Dialog id="image-dialog"
                    header={displayTitle}
                    visible={displayBasic}
                    footer={basicDialogFooter}
                    modal={false}
                    closable = {false}
                    onHide={() => setDisplayBasic(false)}
            >
                <div class="p-col-12">
                    <img src={imageDialog}/>
                </div>
            </Dialog>
        </div>
        </div>
    )
}
