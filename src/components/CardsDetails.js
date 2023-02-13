import React, { useState, useEffect } from "react";
import "./Style.css";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT, ADD, REMOVE } from "../redux/actions/action";
import Cardsdata from "./CardsData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardsDetails = () => {
  const [data, setData] = useState(Cardsdata);

  const { id } = useParams();

  const history = useNavigate();

  const dispatch = useDispatch();

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  //remove

  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  // add data

  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };
  useEffect(() => {
    compare();
  }, [id]);

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
      <div className="container mt-2">
        <h2 className="text-center">ITEM'S DETAILS PAGE</h2>
        <section className="container mt-3">
          <div className="itemsdetails">
            {data.map((e) => {
              return (
                <>
                  <div className="items_img ">
                    <img src={e.imgdata} alt={e.imgdata} sizes="900px" srcset="" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <h4>
                            <strong>Levi's</strong>
                          </h4>
                          <p>
                            <strong>Price</strong>: ₹ {e.price}
                          </p>
                          <p>
                            <strong>Details</strong>: {e.address}
                          </p>
                          <p>
                            <strong>Total</strong>: ₹ {e.price * e.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              style={{ fontSize: 26 }}
                              onClick={
                                e.qnty <= 1 ? () => dlt(e.id) : () => {remove(e);dlttoast();}
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>{e.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => send(e)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Raiting</strong>:
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {" "}
                              {e.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review</strong>:
                            <span> {e.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove</strong>:
                            <span>
                              {" "}
                              <i
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                              >
                                <DeleteIcon onClick={() =>{dlt(e.id);dlttoast();}} />
                              </i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
