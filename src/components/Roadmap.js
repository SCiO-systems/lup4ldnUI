import React, {useEffect, useState} from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export const Roadmap = (props) => {

    return (

        <div>
            <VerticalTimeline className="vertical-timeline vertical-timeline-custom-line">
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#6ea1d7', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #6ea1d7' }}
                    date="Sep. 2020"
                    iconStyle={{ background: '#0e62bd', color: '#fff' }}
                    icon={<i className="fad fa-check fa-3x" style={{paddingLeft:"8px",paddingTop:"10px"}}></i>}
                >
                    <h3 className="vertical-timeline-element-title">Idea & Concept</h3>

                    <p>
                        Concept formulation, Consortium build-up, reaching out to representatives of (sub)national stakeholder groups
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="Oct. 2020"
                    iconStyle={{ background: '#0e62bd', color: '#fff' }}
                    icon={<i className="fad fa-check fa-3x" style={{paddingLeft:"8px",paddingTop:"10px"}}></i>}
                >
                    <h3 className="vertical-timeline-element-title">From idea to implementation</h3>
                    <p>
                        Concretisation requirements, high-level architecture, initial work plan
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="Dec. 2020"
                    iconStyle={{ background: '#0e62bd', color: '#fff' }}
                    icon={<i className="fad fa-check fa-3x" style={{paddingLeft:"8px",paddingTop:"10px"}}></i>}
                >
                    <h3 className="vertical-timeline-element-title">Kicking-off development</h3>
                    <p>
                        User journey design, definition of underlying scientific methodology
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="Mar. 2021"
                    iconStyle={{ background: '#0e62bd', color: '#fff' }}
                    icon={<i className="fad fa-check fa-3x" style={{paddingLeft:"8px",paddingTop:"10px"}}></i>}

                >
                    <h3 className="vertical-timeline-element-title">LUP4LDN beta</h3>
                    <p>
                        Agile development of wireframes and mock-ups, integration of GeOC, WOCAT and Trends.Earth, MVP implementation
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="May. 2021"
                    iconStyle={{ background: '#46a084', color: '#fff' }}
                    icon={<i className="fad fa-bullseye-arrow fa-3x" style={{paddingLeft:"10px",paddingTop:"9px"}}></i>}

                >
                    <h3 className="vertical-timeline-element-title">From Beta to Version 1.0</h3>
                    <p>
                        <ul>
                            <li>Support custom weighting of impact indicators</li>
                            <li>Upload and usage of custom data</li>
                            <li>Handling of custom, user-defined LU type classification schemes</li>
                        </ul>
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="Jun. 2021"
                    iconStyle={{ background: '#46a084', color: '#fff' }}
                    icon={<i className="fad fa-bullseye-arrow fa-3x" style={{paddingLeft:"10px",paddingTop:"9px"}}></i>}

                >
                    <h3 className="vertical-timeline-element-title">Iterative Piloting</h3>

                    <p>
                        Tool testing and validation from consortium stakeholder representatives
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="Aug. 2021"
                    iconStyle={{ background: '#46a084', color: '#fff' }}
                    icon={<i className="fad fa-bullseye-arrow fa-3x" style={{paddingLeft:"10px",paddingTop:"9px"}}></i>}

                >
                    <h3 className="vertical-timeline-element-title">Infrastructure optimisation</h3>
                    <p>
                        Collaborate with Trends.Earth to support:
                        <ul>
                            <li>Serverless computing components</li>
                            <li>Cloud-optimised GeoTIFFs (COGs)</li>
                            <li>Optimized Caching and storage mechanisms</li>
                        </ul>

                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="Sep. 2021"
                    iconStyle={{ background: '#46a084', color: '#fff' }}
                    icon={<i className="fad fa-bullseye-arrow fa-3x" style={{paddingLeft:"10px",paddingTop:"9px"}}></i>}

                >
                    <h3 className="vertical-timeline-element-title">User-validated Version</h3>

                    <p>
                        Tool fully assessed by consortium stakeholder representatives
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="Oct. 2021"
                    iconStyle={{ background: '#46a084', color: '#fff' }}
                    icon={<i className="fad fa-bullseye-arrow fa-3x" style={{paddingLeft:"10px",paddingTop:"9px"}}></i>}

                >
                    <h3 className="vertical-timeline-element-title">Making the tool Global</h3>
                    <p>
                        Use GEE computation in collaboration with Trends.Earth to support all world countries
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#E3E3E3', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E3E3E3' }}
                    date="Nov. - Dec. 2021"
                    iconStyle={{ background: '#46a084', color: '#fff' }}
                    icon={<i className="fad fa-bullseye-arrow fa-3x" style={{paddingLeft:"10px",paddingTop:"9px"}}></i>}

                >
                    <h3 className="vertical-timeline-element-title">Capacity Building</h3>

                    <p>
                        Open workshop and webinars with global participation
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={{ background: '#90c6b5', color: '#030607' }}
                    contentArrowStyle={{ borderRight: '7px solid  #90c6b5' }}
                    date="End of 2021"
                    iconStyle={{ background: '#46a084', color: '#fff' }}
                    icon={<i className="fad fa-bullseye-arrow fa-3x" style={{paddingLeft:"10px",paddingTop:"9px"}}></i>}

                >
                    <h3 className="vertical-timeline-element-title">LUP4LDN official launch </h3>
                </VerticalTimelineElement>
            </VerticalTimeline>

        </div>

    );
}
