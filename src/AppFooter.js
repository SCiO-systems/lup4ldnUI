import React from 'react';

const AppFooter = () => {

    return (
        <div>
            <div className="layout-footer"
                 style={{
                        position:"fixed",
                        bottom:"0",
                        right:"0 !important",width:"calc(100%-225px) !important"}}>
                <div className="footer-logo-container">
                    <a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/"
                       title="Creative Commons Attribution-ShareAlike 4.0 International License"
                       target="_blank">
                        <span className="hover-item">
                            <i className="fab fa-creative-commons fa-2x p-mr-2"></i>
                            <i className="fab fa-creative-commons-by fa-2x p-mr-2"></i>
                            <i className="fab fa-creative-commons-sa fa-2x p-mr-2"></i>
                        </span>
                    </a>
                </div>
                <div>
                    <span className="p-mr-2">powered by </span>
                    <a href="https://scio.systems" target="_blank">
                        <img height="40px" src="assets/layout/images/SCiO-sLogo-Dark.png"/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AppFooter;
