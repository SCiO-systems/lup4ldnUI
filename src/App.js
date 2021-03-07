import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';

import AppTopBar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppMenu from './AppMenu';
import AppSearch from './AppSearch';
import AppRightMenu from './AppRightMenu';

import { TDashboard } from './components/Dashboard';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { ButtonDemo } from './components/ButtonDemo';
import { TableDemo } from './components/TableDemo';
import { ListDemo } from './components/ListDemo';
import { TreeDemo } from './components/TreeDemo';
import { PanelDemo } from './components/PanelDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { MediaDemo } from './components/MediaDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { FileDemo } from './components/FileDemo';
import { ChartDemo } from './components/ChartDemo';
import { MiscDemo } from './components/MiscDemo';
import { Documentation } from './components/Documentation';
import { IconsDemo } from './utilities/IconsDemo';
import { Widgets } from './utilities/Widgets';
import { GridDemo } from './utilities/GridDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { DisplayDemo } from './utilities/DisplayDemo';
import { FlexBoxDemo } from './utilities/FlexBoxDemo';
import { CrudDemo } from './pages/CrudDemo';
import { CalendarDemo } from './pages/CalendarDemo';
import { Invoice } from './pages/Invoice';
import { Help } from './pages/Help';
import { EmptyPage } from './pages/EmptyPage';

import PrimeReact from 'primereact/utils';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import {Browser} from "./components/Browser";
import {MapDashboard} from "./components/MapDashboard";
import {Geography} from "./components/Geography";
import {CurrentStatus} from "./components/CurrentStatus";
import {History} from "./components/History";
import {Team} from "./components/Team";
import {ScenarioBuilder} from "./components/ScenarioBuilder";
import {Chat} from "./components/Chat";
import {Timeline} from "./components/Timeline";
import {Invite} from "./components/Invite";
import {DataSources} from "./components/DataSources";
import {ClimateProspects} from "./components/ClimateProspects";
import {LDNTargets} from "./components/LDNTargets";
import {RiskProfile} from "./components/RiskProfile";
import {OpenSource} from "./components/OpenSource";
import {Roadmap} from "./components/Roadmap";

const App = () => {

    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('static');
    const [colorScheme, setColorScheme] = useState('light');
    const [menuTheme, setMenuTheme] = useState('layout-sidebar-darkgray');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] = useState(false);
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);

    let menuClick = false;
    let searchClick = false;
    let userMenuClick = false;
    let notificationMenuClick = false;
    let rightMenuClick = false;
    let configClick = false;

    const menu = [

        {
            label: "My Projects", icon: "fad fa-folders",
            items: [
                { label: "Create New", icon: "fad fa-file-plus", to: "/newproject" },
                { label: "Invite", icon: "fad fa-envelope", to: "/invite" },
                { label: "Dashboard", icon: "fad fa-columns", to: "/dashboard" },
            ]
        },
        { separator: true },
        {
            label: "Country Level", icon: "fad fa-map-marked",
            items: [
                { label: "LDN Targets", icon: "fad fa-bullseye-arrow", to: "/ldntargets" },
                { label: "Risk Profiles", icon: "fad fa-analytics", to: "/riskprofile" },
                { label: "Prospects", icon: "fad fa-function", to: "/climateprospects" }
            ]
        },
        { separator: true },
        {
            label: "Region of Interest", icon: "fad fa-hand-holding-seedling",
            items: [
                { label: "History", icon: "fad fa-history", to: "/roihistory" },
                { label: "Current State", icon: "fad fa-check-double", to: "/currentstate" },
                { label: "Land Use Planning", icon: "fad fa-abacus", to: "/scenariobuilder" }
            ]
        },
        { separator: true },
        {
            label: "Project Tools", icon: "fad fa-tools",
            items: [
                { label: "Timeline", icon: "fad fa-hourglass-start", to: "/timeline" },
                { label: "Chat", icon: "fad fa-comment-lines", to: "/chat" }
            ]
        },
        { separator: true },
        {
            label: "ABOUT", icon: "fad fa-info-circle",
            items: [
                { label: "Team", icon: "fad fa-user-friends", to: "/" },
                { label: "Data Sources", icon: "fad fa-database", to: "/datasources" },
                { label: "Source Code", icon: "fab fa-github", to: "/opensource" },
                { label: "Roadmap", icon: "fad fa-road", to: "/roadmap" }
            ]
        },
    ];

    const routers = [
        { path: '/', component: Team, exact: true, meta: { breadcrumb: [{ parent: 'Dashboard', label: 'About the tool' }] } },
        { path: '/datasources', component: DataSources, exact: true, meta: { breadcrumb: [{ parent: 'Dashboard', label: 'Data Sources' }] } },
        { path: '/opensource', component: OpenSource, exact: true, meta: { breadcrumb: [{ parent: 'Dashboard', label: 'LUP4LDN Source Code' }] } },
        { path: '/roadmap', component: Roadmap, exact: true, meta: { breadcrumb: [{ parent: 'Dashboard', label: 'Roadmap' }] } },
        { path: '/newproject', component: Geography, exact: true, meta: { breadcrumb: [{ parent: 'My Projects', label: 'New Project' }] } },
        { path: '/currentstate', component: CurrentStatus, exact: true, meta: { breadcrumb: [{ parent: 'Land Use Planning', label: 'RoI Current State Assessment' }] } },
        { path: '/scenariobuilder', component: ScenarioBuilder, exact: true, meta: { breadcrumb: [{ parent: 'Land Use Planning', label: 'LU Planning' }] } },
        { path: '/roihistory', component: History, exact: true, meta: { breadcrumb: [{ parent: 'ROI INFO', label: 'ROI Historical Data' }] } },
        { path: '/ldntargets', component: LDNTargets, exact: true, meta: { breadcrumb: [{ parent: 'ROI INFO', label: 'Country Level Prospects' }] } },
        { path: '/riskprofile', component: RiskProfile, exact: true, meta: { breadcrumb: [{ parent: 'ROI INFO', label: 'Country Profiles' }] } },
        { path: '/climateprospects', component: ClimateProspects, exact: true, meta: { breadcrumb: [{ parent: 'ROI INFO', label: 'Country Level Prospects' }] } },
        { path: '/timeline', component: Timeline, exact: true, meta: { breadcrumb: [{ parent: 'PROJECT TOOLS', label: 'Timeline' }] } },
        { path: '/chat', component: Chat, exact: true, meta: { breadcrumb: [{ parent: 'PROJECT TOOLS', label: 'Chat' }] } },
        { path: '/invite', component: Invite, exact: true, meta: { breadcrumb: [{ parent: 'MY PROJECTS', label: 'Invite' }] } },
        { path: '/dashboard', component: Invite, exact: true, meta: { breadcrumb: [{ parent: 'MY PROJECTS', label: 'Dashboard' }] } },
        { path: '/browse', component: MapDashboard, meta: { breadcrumb: [{ parent: 'Discover Geospatial Data', label: 'Discover Geospatial Data' }] } },
        { path: '/formlayout', component: FormLayoutDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }] } },
        { path: '/input', component: InputDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Input' }] } },
        { path: '/floatlabel', component: FloatLabelDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Float Label' }] } },
        { path: '/button', component: ButtonDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Button' }] } },
        { path: '/table', component: TableDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Table' }] } },
        { path: '/list', component: ListDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'List' }] } },
        { path: '/tree', component: TreeDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Tree' }] } },
        { path: '/panel', component: PanelDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Panel' }] } },
        { path: '/overlay', component: OverlayDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Overlay' }] } },
        { path: '/media', component: MediaDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Media' }] } },
        { path: '/menu', component: MenuDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }] } },
        { path: '/messages', component: MessagesDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Messages' }] } },
        { path: '/file', component: FileDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'File' }] } },
        { path: '/chart', component: ChartDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Charts' }] } },
        { path: '/misc', component: MiscDemo, meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Misc' }] } },
        { path: '/icons', component: IconsDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Icons' }] } },
        { path: '/widgets', component: Widgets, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Widgets' }] } },
        { path: '/grid', component: GridDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Grid System' }] } },
        { path: '/spacing', component: SpacingDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Spacing' }] } },
        { path: '/elevation', component: ElevationDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Elevation' }] } },
        { path: '/typography', component: TypographyDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Typography' }] } },
        { path: '/display', component: DisplayDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Display' }] } },
        { path: '/flexbox', component: FlexBoxDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Flexbox' }] } },
        { path: '/text', component: TextDemo, meta: { breadcrumb: [{ parent: 'Utilities', label: 'Text' }] } },
        { path: '/crud', component: CrudDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Crud' }] } },
        { path: '/calendar', component: CalendarDemo, meta: { breadcrumb: [{ parent: 'Pages', label: 'Calendar' }] } },
        { path: '/invoice', component: Invoice, meta: { breadcrumb: [{ parent: 'Pages', label: 'Invoice' }] } },
        { path: '/help', component: Help, meta: { breadcrumb: [{ parent: 'Pages', label: 'Help' }] } },
        { path: '/empty', component: EmptyPage, meta: { breadcrumb: [{ parent: 'Pages', label: 'Empty Page' }] } },
        { path: '/documentation', component: Documentation, meta: { breadcrumb: [{ parent: 'Pages', label: 'Documentation' }] } }
    ];

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        }
        else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!userMenuClick) {
            setTopbarUserMenuActive(false);
        }

        if (!notificationMenuClick) {
            setTopbarNotificationMenuActive(false);
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (!menuClick) {
            if (isSlim()) {
                setMenuActive(false);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        searchClick = false;
        configClick = false;
        userMenuClick = false;
        rightMenuClick = false;
        notificationMenuClick = false;
        menuClick = false;
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setTopbarNotificationMenuActive(false);
        setRightMenuActive(false);

        if (isOverlay()) {
            setOverlayMenuActive(prevOverlayMenuActive => !prevOverlayMenuActive);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive(prevStaticMenuDesktopInactive => !prevStaticMenuDesktopInactive);
        }
        else {
            setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
        }

        event.preventDefault();
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const onMenuThemeChange = (name) => {
        setMenuTheme('layout-sidebar-' + name);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
    };

    const onColorSchemeChange = (e) => {
        setColorScheme(e.value);
    };

    const onTopbarUserMenuButtonClick = (event) => {
        userMenuClick = true;
        setTopbarUserMenuActive(prevTopbarUserMenuActive => !prevTopbarUserMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarNotificationMenuButtonClick = (event) => {
        notificationMenuClick = true;
        setTopbarNotificationMenuActive(prevTopbarNotificationMenuActive => !prevTopbarNotificationMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const toggleSearch = () => {
        setSearchActive(prevSearchActive => !prevSearchActive);
        searchClick = true;
    };

    const onSearchClick = () => {
        searchClick = true;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        setRightMenuActive(prevRightMenuActive => !prevRightMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive(prevConfigActive => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const isSlim = () => {
        return menuMode === "slim";
    };

    const isOverlay = () => {
        return menuMode === "overlay";
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const containerClassName = classNames('layout-wrapper',
        {
            'layout-overlay': menuMode === "overlay",
            'layout-static': menuMode === "static",
            'layout-slim': menuMode === "slim",
            'layout-sidebar-dim': colorScheme === "dim",
            'layout-sidebar-dark': colorScheme === "dark",
            'layout-overlay-active': overlayMenuActive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-static-inactive': staticMenuDesktopInactive && menuMode === "static",
            'p-input-filled': inputStyle === "filled",
            'p-ripple-disabled': !ripple,
        },
        colorScheme === 'light' ? menuTheme : '');

    return (
        <div className={containerClassName} data-theme={colorScheme} onClick={onDocumentClick}>
            <div className="layout-content-wrapper">
                <AppTopBar routers={routers} topbarNotificationMenuActive={topbarNotificationMenuActive} topbarUserMenuActive={topbarUserMenuActive} onMenuButtonClick={onMenuButtonClick} onSearchClick={toggleSearch}
                    onTopbarNotification={onTopbarNotificationMenuButtonClick} onTopbarUserMenu={onTopbarUserMenuButtonClick} onRightMenuClick={onRightMenuButtonClick} onRightMenuButtonClick={onRightMenuButtonClick}></AppTopBar>

                <div className="layout-content">
                    {
                        routers.map((router, index) => {
                            if (router.exact) {
                                return <Route key={`router${index}`} path={router.path} exact component={router.component} />
                            }

                            return <Route key={`router${index}`} path={router.path} component={router.component} />
                        })
                    }
                </div>

                <AppFooter />
            </div>

            <AppMenu model={menu} menuMode={menuMode} active={menuActive} mobileMenuActive={staticMenuMobileActive} onMenuClick={onMenuClick} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick}></AppMenu>

            <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick}></AppRightMenu>

            <AppSearch searchActive={searchActive} onSearchClick={onSearchClick} onSearchHide={onSearchHide} />

            <div className="layout-mask modal-in"></div>
        </div>
    );
}

export default App;
