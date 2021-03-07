import {RadioButton} from "primereact/components/radiobutton/RadioButton";
import React, {useEffect, useState} from "react";
import styles from './DataSources.css'

export const DataSources = (props) => {

    return (

        <div>
            <h3>Data / Knowledge Sources</h3>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon" >
                    <i className="fad fa-globe fa-3x"></i>
                    <div className="box">GRIDDED MAPS</div>
                </div>
                <div className="p-col column-description">
                    <div className="box">Global gridded maps for (a) Land Cover, have been retrieved from <a
                        href="http://www.esa-landcover-cci.org/" target="_blank">ESA CCI Land Cover
                        time-series</a> (1992 - 2015) and the <a
                        href="https://climate.esa.int/en/projects/land-cover/news/new-release-c3s-global-land-cover-products-2016-2017-2018-consistent-cci-1992-2015-map-series/"
                        target="_blank">ESA C3S Global Land Cover Product</a> (2016-2018), (b) Soil Organic Carbon, have
                        been retrieved from the <a href="https://www.soilgrids.org/"
                                                   target="_blank">SoilGrids</a> project of the <a
                            href="https://www.isric.org/" target="_blank">International Soil Reference and Information
                            Centre (ISRIC)</a>, (c) Normalized Difference Vegetation Index (NDVI), have been retrieved
                        from the <a href="https://lpdaac.usgs.gov/products/mod13q1v006/" target="_blank">MODIS
                            Vegetation Indices (MOD13Q1)</a> dataset, and (d) Socio-ecological Context, have been
                        retrieved from the <a href="https://wle.cgiar.org/introduction-geoc" target="_blank">Global
                            Geo-Informatics Options by Context (GeOC)</a> tool developed by the <a
                            href="https://www.icarda.org/" target="_blank">International Center for Agricultural
                            Research in the Dry Areas (ICARDA)</a>.
                    </div>
                </div>
            </div>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon">
                    <i className="fad fa-draw-polygon fa-3x"></i>
                    <div className="box">ADMINISTRATIVE AREAS</div>
                </div>
                <div className="p-col column-description">
                    <div className="box">
                        Geo-polygons of country administrative areas at all levels, are retrieved from the
                        <a href="https://gadm.org/" target="_blank"> Database of Global Administrative Areas (GADM)</a> via
                         <a href="https://github.com/SCiO-systems/IndexGADM"> IndexGADM</a>, an Elasticsearch instance containing GADM geo-polygons
                    </div>
                </div>
            </div>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon">
                    <i className="fad fa-chart-network fa-3x"></i>
                    <div className="box">KNOWLEDGE MODELS</div>
                </div>
                <div className="p-col column-description">
                    <div className="box">The Sustainable Land Management (SLM) assessment model used in LUP4LDN is based
                        on the SLM evaluation questionnaire of the <a href="https://www.wocat.net/en/" target="_blank">World
                            Overview of Conservation Approaches and Technologies (WOCAT)</a> and the "6+1 approach to
                        assess the economics of land management" of the <a href="https://www.eld-initiative.org/"
                                                                           target="_blank">Economics of Land Degradation
                            (ELD)</a> initiative.
                    </div>
                </div>
            </div>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon">
                    <i className="fad fa-th fa-3x"></i>
                    <div className="box">SLM PRACTICES</div>
                </div>
                <div className="p-col column-description">
                    <div className="box">WOCAT's <a href="https://www.wocat.net/en/global-slm-database/"
                                                    target="_blank">Global Database on Sustainable Land
                        Management</a> is used for retrieving good SLM practices for user-defined geographies.
                    </div>
                </div>
            </div>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon">
                    <i className="fad fa-users fa-3x"></i>
                    <div className="box">WORLD POPULATION</div>
                </div>
                <div className="p-col column-description">
                    <div className="box">Historical (1950-2019) population data along with population growth projections
                        (up to 2100) have been retreived from the <a href="https://population.un.org/wpp/"
                                                                     target="_blank">UN World Population
                            Prospects</a> dataset.
                    </div>
                </div>
            </div>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon">
                    <i className="fad fa-sun-cloud fa-3x"></i>
                    <div className="box">CLIMATIC VARIABLES</div>
                </div>
                <div className="p-col column-description">
                    <div className="box">Historical data (1961-2018) for climatic variables (temperature & rainfall)
                        have been retreived from the <a href="https://www.worldclim.org/data/monthlywth.html"
                                                        target="_blank">WorldClim CRU-TS-4.03</a> dataset, whereas
                        yearly projections (up to 2100) from <a href="https://www.nasa.gov/nex" target="_blank">NASA
                            Earth Exchange</a>.
                    </div>
                </div>
            </div>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon">
                    <i className="fad fa-align-center fa-3x"></i>
                    <div className="box">SPECTRAL INDICES</div>
                </div>
                <div className="p-col column-description">
                    <div className="box">Historical (1982-2019) data for Normalized Difference Vegetation Index (NDVI)
                        have been retreived from the <a
                            href="https://data.nodc.noaa.gov/cgi-bin/iso?id=gov.noaa.ncdc:C00813" target="_blank">NOAA
                            Climate Data Record</a>, whereas Soil Moisture Index (SMI) data (1979-2019) have been
                        retreived from the <a href="https://www.esa-soilmoisture-cci.org/node/238" target="_blank">ESA
                            CCI Soil Moisture Product</a>. Yearly projections for these indices (up to 2100) are
                        provided via the <a href="https://github.com/SCiO-systems/SIP" target="_blank">SCiO Spectral
                            Indices Prospects (SIP)</a> dataset.
                    </div>
                </div>
            </div>

            <h3 className="p-mt-6">Geoprocessing Platforms</h3>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon">
                    <a href="http://trends.earth/docs/en/" target="_blank">
                        <img src="assets/layout/images/TE-LOGO-tr.png" className="column-img"></img>
                    </a>
                </div>
                <div className="p-col column-description">
                    <div className="box">Off-line data processing for the three sub-indicators (productivity, land
                        cover, and soil organic carbon) of the <a
                            href="https://www.unccd.int/sites/default/files/relevant-links/2017-10/Good%20Practice%20Guidance_SDG%20Indicator%2015.3.1_Version%201.0.pdf"
                            target="_blank">Sustainable Development Goal (SDG) Indicator 15.3.1</a> is executed using
                        scripts provided by <a href="https://github.com/ConservationInternational/trends.earth"
                                               target="_blank">Trends.Earth</a>.
                    </div>
                </div>
            </div>

            <div className="p-grid column-source">
                <div className="p-col-fixed column-icon">
                    <a href="https://scio.systems/qvantum/" target="_blank">
                        <img src="assets/layout/images/QVANTUM-logo-tr.png" className="column-img"></img>
                    </a>
                </div>
                <div className="p-col column-description">
                    <div className="box">Real-time geoprocessing and analytics are provided via SCiO's <a
                        href="https://scio.systems/qvantum/" target="_blank">Qvantum</a> platform; a data platform,
                        capable of gathering, harmonizing, and integrating heterogeneous data from all kind of sources
                        (IoT, proximal and satellite sensing etc.) to support analytics for facilitating decision
                        making.
                    </div>
                </div>
            </div>

        </div>

    );
}
