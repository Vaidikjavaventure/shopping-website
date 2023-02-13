import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cardsdata from "./CardsData";
import "./Style.css";
import { useDispatch } from "react-redux";
import {ADD} from '../redux/actions/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cards = () => {
  const [data,setData] = useState(Cardsdata); 

  const dispatch = useDispatch();

  const send = (e)=>{
    // console.log(e);
    dispatch(ADD(e));
  };

  const toastmsg = ()=>{
    toast.success('Success: Item added to your cart!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })

  }

  return (
    <div className="container mt-3">
      <h2 className="text-center">DEAL OF THE DAY</h2>

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          return (
            <>
              <Card style={{ width: "19rem",height:"30rem", border:"none" }} className="mx-3 mt-4 card_style">
                <Card.Img variant="top" src={element.imgdata} style={{height:"18rem",width:"18rem"}} className="img-thumbnail"/>
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>
                    price : ₹ {element.price}
                  </Card.Text>
                  <div className="button_div d-flex justifiy-content-center">
                  <Button variant="secondary"
                          onClick={()=>{send(element);toastmsg();}}
                          
                          
                   className="col-lg-12">Add to Cart</Button>
                  </div>
                  
                  
                </Card.Body>
              </Card>
              
            </>
          );
        })}
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default Cards;
