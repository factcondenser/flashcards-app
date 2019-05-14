import React from 'react';
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

function NavBar(props) {
  const { userEmail, onPushToggledHandler, pushToggled } = props;
  const pushToggleButton = pushToggled ?
      <Button className="header__webpush-button--off" onClick={onPushToggledHandler}>{'Turn Push Notifications OFF'}</Button>
    :
      <Button className="header__webpush-button--on" onClick={onPushToggledHandler}>{'Turn Push Notifications ON'}</Button>;

  return (
    <Navbar className='header' color="faded" light expand="md" sticky='top'>
      <NavbarBrand className='header__brand' href="/flashcards">Flashcards Study App</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink id='header__user-info'>Logged in as <b>{userEmail}</b></NavLink>
        </NavItem>
        {pushToggleButton}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
