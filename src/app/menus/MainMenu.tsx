import * as React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";

export const mainListItems = (
  <Nav className="ml-auto" navbar>
      <NavItem>
          <NavLink href="/modules" className="header-title">Модули</NavLink>
      </NavItem>
      <NavItem>
          <NavLink href="/auth" className="header-title">Вход</NavLink>
      </NavItem>
  </Nav>
);