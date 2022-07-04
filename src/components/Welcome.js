import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "shards-react";

export default class Welcome extends React.Component {
    render() {
        return (
            <Navbar theme='primary' type='dark' expand='md'>
                <NavbarBrand href="#">AppName</NavbarBrand>
                <Nav navbar>
                    <NavItem>
                        <NavLink active href="#">
                            Home
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}