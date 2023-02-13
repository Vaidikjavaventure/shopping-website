import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CloseButton from 'react-bootstrap/CloseButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { DLT } from '../redux/actions/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Header = () => {

    const [price,setPrice] = useState(0);

    const getdata = useSelector((state)=> state.cartreducer.carts);
    console.log(getdata);

    const dispatch = useDispatch();


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt =(id)=>{
        dispatch(DLT(id))
    }

    const total = ()=>{
        let price = 0;
        getdata.map((e,k)=>{
            price = e.price * e.qnty + price
        });
        setPrice(price);
    };

    useEffect(()=>{
        total();
    },[total]);

    const dlttoast = () =>{
        toast.error('Your item is been removed', {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">E-Kart</NavLink>

                    <Nav className="me-auto">
                        <NavLink className="text-decoration-none text-light" to="/">Home</NavLink>
                        <Nav.Link className='justify-content-end' href="#cart"></Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Badge badgeContent={getdata.length} color="primary"
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                                <i style={{ cursor: "pointer" }}><ShoppingCartIcon /></i>
                            </Badge>

                        </Navbar.Text>
                    </Navbar.Collapse>

                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        getdata.length?
                        <div className="card_details" style={{width:"24rem", padding:10}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Product Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getdata.map((e)=>{
                                            return(
                                                <>
                                                <tr>
                                                    <td>
                                                    <NavLink to ={`/product/${e.id}`} onClick={handleClose}><img src={e.imgdata} style={{width:"5rem", height:"7rem"}} alt="" /></NavLink> 
                                                    </td>
                                                    <td>
                                                        <p>{e.rname}</p>
                                                        <p>Price : ₹{e.price}</p>
                                                        <p>Quantity : {e.qnty}</p>
                                                        <p style={{color:"red", fontSize:20, cursor:"pointer"}} onClick={()=>{dlt(e.id); dlttoast();}}>
                                                            <i className='fas fa-trash smalltrash'></i>
                                                        </p>
                                                    </td>
                                                    <td style={{color:"red", fontSize:20, cursor:"pointer"}}onClick={()=>{dlt(e.id); dlttoast();}}>
                                                        <i className='fas fa-trash largetrash'></i>
                                                    </td>
                                                </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className='text-center'>Total : ₹{price}</p>
                                </tbody>
                            </Table>
                        </div> :
                        <div className='card_details d-flex justifiy-content-center align-items-center'style={{width:"15rem",padding:10,position:"relative"}}>
                        <i onClick={handleClose} style={{position:"absolute",top:3,right:10,fontSize:10,cursor:"pointer"}}><CloseButton aria-label="Hide" /></i>
                        <p style={{fontSize:15}}>Your cart is empty</p>
                        <img src="./cart.png" alt="" className='emptycart_img' style={{width:"4rem", padding:8}}/>
                        </div>
                    }
                    
                </Menu>
            </Navbar>
        </>
    )
}

export default Header
