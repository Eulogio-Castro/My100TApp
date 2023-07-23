import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3">
                    <Container>
                        <NavbarBrand tag={Link} to="/">RUN IT UP!</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow ">
                                <NavItem>
                                    <NavLink tag={Link} to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/LeagueStandings">LCS Standings</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/TeamSchedule">LCS Matches</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/TeamInfoTable">LCS Roster</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/LeagueYoutube">Thieves YouTube </NavLink>

                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
