import React from 'react';
import { Link } from 'react-router-dom';
import AppSubmenu from './AppSubmenu';

const AppMenu = (props) => {

    return (
        <div className="layout-sidebar" onClick={props.onMenuClick}>
            <Link to="/" className="logo">
                <img id="app-logo" className="logo-image large-logo"
                     src="assets/layout/images/LUP4LDN-LOGO_small.png"
                     alt="diamond layout" />
                <span className="app-name">LUP4LDN<sub className="beta-logo">BETA</sub></span>

            </Link>

            <div className="layout-menu-container">
                <AppSubmenu items={props.model} menuMode={props.menuMode} parentMenuItemActive menuActive={props.active} mobileMenuActive={props.mobileMenuActive} root onMenuitemClick={props.onMenuitemClick} onRootMenuitemClick={props.onRootMenuitemClick} />
            </div>
        </div>
    );
}

export default AppMenu;
