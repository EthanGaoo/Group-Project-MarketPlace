import { Link } from "react-router-dom";
import {useState} from 'react'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const TheNavbar = (props) => {
  const [searchItem,setSearchItem]=useState('')
  const handlechange=(event)=>{
    setSearchItem(event.target.value)
  }
  const handleSubmit=(event)=>{
    event.preventDefault()
    props.handleSearch(searchItem)
    setSearchItem('')

  }
  const handleClick = async () => {
    const res = await fetch("/users/logout", {
      method: "POST",
    });
    const data = await res.json();
    props.handleLogout();
  };
  return (
    <Navbar  expand="lg"  >
      <Container fluid>
        <Navbar.Brand href="/marketplace">Marketplace</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!props.authorised ? (
              <Nav.Link href="/login">Login</Nav.Link>
            ) : (
              <Nav.Link onClick={handleClick}>Logout</Nav.Link>
            )}
            {props.authorised && (
              <Nav.Link href="/marketplace/newitem">Add</Nav.Link>
            )}
          </Nav>

             <NavDropdown   title="Sort By" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={props.handleSort}>Price(low-to-high)</NavDropdown.Item>
              <NavDropdown.Item onClick={props.handleDeliverable}>
                Deliverable
              </NavDropdown.Item>
            </NavDropdown>
            <Form className="d-flex mx-3 " onSubmit={handleSubmit} >
              <Form.Control
                type="search"
                name='search'
                value={searchItem}
                onChange={handlechange}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button type='submit'  variant="outline-success">Search</Button>
            </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TheNavbar;
