import React from "react";
import {Nav, Navbar} from "react-bootstrap";

const NavbarApp = () => {
    return (
        <Navbar
            expand="md"
            style={{fontFamily: "monospace"}}
            className="sticky-top border-bottom shadow-sm rounded border bg-light border-light shadow-lg p-3 rounded-6"
        >
            {/* Logo */}
            <Navbar.Brand href="/" className={'d-flex align-items-center rounded-3 bg-gradient p-2 shadow-lg mr-2'}>
                <i className="fas fa-virus"></i>
                {' '}
                Covid-19
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbar-nav"/>
            <Navbar.Collapse>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/data" tooltip="Data">
                            <i className="fas fa-file"></i> Data
                        </Nav.Link>

                        <Nav.Link href="/" tooltip="Registration">
                            <i className="fas fa-user-plus"></i> Registration
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarApp;
