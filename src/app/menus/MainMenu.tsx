import * as React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";

export const mainListItems = (logged: boolean, onClick: () => void) => (
  <Nav className="ml-auto" navbar>
      {logged ? (
          <NavItem>
            <NavLink href="/modules" className="header-title">Модули</NavLink>
          </NavItem>)
          : (
          <NavItem>
              <NavLink href="/auth" className="header-title">Вход</NavLink>
          </NavItem>)}
      {logged && (
          <NavItem>
              <NavLink href="/results" className="header-title" onClick={onClick}>Результаты</NavLink>
          </NavItem>
      )}
      {logged && (
          <NavItem>
              <NavLink href="" className="header-title" onClick={onClick}>Выход</NavLink>
          </NavItem>
      )}
  </Nav>
);