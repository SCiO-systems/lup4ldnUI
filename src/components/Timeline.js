import React from 'react';

export const Timeline = () => {

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <div className="p-col-12 p-lg-9">
                        <div className="card"><h4>Timeline</h4>
                            <div className="widget-timeline">
                                <div className="timeline-event"><span className="timeline-event-icon"
                                                                      ><i
                                    className="pi pi-dollar"></i></span>
                                    <div className="timeline-event-title">Collaborator enrolled </div>
                                    <div className="timeline-event-detail">Amy accepted your invitation
                                    </div>
                                </div>
                                <div className="timeline-event"><span className="timeline-event-icon"
                                                                      ><i
                                    className="timeline-icon pi pi-download"></i></span>
                                    <div className="timeline-event-title">Collaborator enrolled</div>
                                    <div className="timeline-event-detail">Bernardo accepted your invitation
                                    </div>
                                </div>
                                <div className="timeline-event"><span className="timeline-event-icon"
                                                                      ><i
                                    className="timeline-icon pi pi-question"></i></span>
                                    <div className="timeline-event-title">Indicators proposed</div>
                                    <div className="timeline-event-detail">Amy suggested a new set of indicators
                                    </div>
                                </div>
                                <div className="timeline-event"><span className="timeline-event-icon"
                                                                      ><i
                                    className="timeline-icon pi pi-comment"></i></span>
                                    <div className="timeline-event-title">Indicators proposed</div>
                                    <div className="timeline-event-detail">Bernardo proposed a new set of indicators
                                    </div>
                                </div>
                                <div className="timeline-event"><span className="timeline-event-icon"
                                ><i
                                    className="timeline-icon pi pi-comment"></i></span>
                                    <div className="timeline-event-title">SLM proposed</div>
                                    <div className="timeline-event-detail">You (Amelia) proposed a new SLM method
                                    </div>
                                </div>
                                <div className="timeline-event"><span className="timeline-event-icon"
                                ><i
                                    className="timeline-icon pi pi-comment"></i></span>
                                    <div className="timeline-event-title">Plan finalized</div>
                                    <div className="timeline-event-detail">Bernardo proposed a new LU plan
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
