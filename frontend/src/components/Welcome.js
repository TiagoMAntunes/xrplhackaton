import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "shards-react";

export default class Welcome extends React.Component {
    render() {
        return (
            <Navbar theme='primary' type='dark' expand='md'>
                <NavbarBrand href="#">CryptoCare</NavbarBrand>
                <Nav navbar>
                    <NavItem>
                        <div style={{ color: 'white' }}>
                            Wallet: {this.props.userWallet || "Loading..."}
                        </div>

                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}