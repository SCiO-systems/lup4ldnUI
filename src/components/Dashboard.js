import React from 'react';

export const Dashboard = () => {

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <div className="p-col-12 p-lg-9">
                        <div className="card"><h4>Chat</h4>
                            <div className="widget-chat">
                                <ul>
                                    <li className="message-from"><img src="assets/demo/images/avatar/ionibowcher.png"
                                                                      alt="diamond-layout"/>
                                        <div>Retro occupy organic, stumptown shabby chic pour-over roof party DIY
                                            normcore.
                                        </div></li>
                                    <li className="message-own"><img src="assets/demo/images/avatar/onyamalimba.png"
                                                                     alt="diamond-layout"/>
                                        <div>Actually artisan organic occupy, Wes Anderson ugh whatever pour-over
                                            gastropub selvage.
                                        </div></li>
                                    <li className="message-from"><img src="assets/demo/images/avatar/ionibowcher.png"
                                                                      alt="diamond-layout"/>
                                        <div>Chillwave craft beer tote bag stumptown quinoa hashtag.</div></li>
                                    <li className="message-own"><img src="assets/demo/images/avatar/onyamalimba.png"
                                                                     alt="diamond-layout"/>
                                        <div>Dreamcatcher locavore iPhone chillwave, occupy trust fund slow-carb
                                            distillery art party narwhal.
                                        </div>
                                    </li>
                                </ul>
                                <div className="new-message">
                                    <div className="message-attachment"><i className="pi pi-paperclip"></i></div>
                                    <div className="message-input">
                                        <input type="text" placeholder="Write a message"
                                                                          className="p-inputtext"/>
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
