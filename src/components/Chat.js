import React from 'react';

export const Chat = () => {

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
                                        <div>Can you check the impact indicators that I proposed? Thanks!
                                        </div></li>
                                    <li className="message-own"><img src="assets/demo/images/avatar/onyamalimba.png"
                                                                     alt="diamond-layout"/>
                                        <div>Thanks, Amy, great job! I just added a few more, have a look.
                                        </div></li>
                                    <li className="message-from"><img src="assets/demo/images/avatar/ionibowcher.png"
                                                                      alt="diamond-layout"/>
                                        <div>I agree, with your suggested indicators. Let’s start with an LU plan.</div></li>
                                    <li className="message-own"><img src="assets/demo/images/avatar/onyamalimba.png"
                                                                     alt="diamond-layout"/>
                                        <div>OK, I made my first effort for the LU plan. Amelia, can you check it please?
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
