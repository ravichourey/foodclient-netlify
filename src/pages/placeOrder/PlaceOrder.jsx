import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotal } from "../../util/CartUtil";
import "./PlaceOrder.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import Razorpay from "razorpay";

const PlaceOrder = () => {
  const {
    foodList,
    increaseQty,
    decreaseQty,
    quantity,
    removeFromCart,
    token,
    setQuantity,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    address2: "",
  });

  const cartItems = foodList.filter((item) => quantity[item.id] > 0);

  const OnChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      userEmail: data.email,
      userPhone: data.phoneNumber,
      orderItems: cartItems.map((item) => ({
        fooId: item.foodId,
        quantity: quantity[item.id],
        price: item.price * quantity[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: totalPrice.toFixed(2),
      orderStatus: "Pending",
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201 && response.data.razorpayOrderId) {
        // initiate the payment process
        initiateRazorpayPayment(response.data);
      } else {
        toast.error("Unable to place order, please try again.");
      }
    } catch (error) {
      toast.error("Unable to place order, please try again later.");
    }
  };

  const initiateRazorpayPayment = (orderData) => {
    const options = {
      key: "rzp_test_KhHVCxc8Anjtk3",
      amount: orderData.amount * 100,
      currency: orderData.currency,
      name: "Foodies",
      description: "Order Payment",
      order_id: orderData.razorpayOrderId,
      handler: async function (response) {
        await verifyPayment(response);
      },
      prefill: {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        contact: data.phoneNumber,
      },
      theme: {
        color: "#3399cc",
        modal: {
          ondismiss: async function () {
            toast.error("Payment cancelled");
            await deleteOrder(orderData.id);
          },
        },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (response) => {
    const paymentData = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/orders/verify",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Payment successful");
        // Redirect to order confirmation page or show success message
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment failed. Please try again.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      navigate("/");
    }
  };
  const deleteOrder = async (orderId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  const clearCart = async () => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuantity({});
    } catch (error) {
      toast.error("Unable to clear cart. Please try again.");
    }
  };

  const { totalPrice, shippingCost, tax, finalTotal } = calculateCartTotal(
    foodList,
    quantity
  );

  return (
    <main className="placeorder-main">
      <div className="container py-5">
        <Row className="justify-content-center">
          <Col md={5} lg={4} className="order-md-last mb-4">
            <Card className="placeorder-summary-card">
              <Card.Body className="p-0">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold">Your cart</span>
                  <Badge bg="primary" pill style={{ fontSize: "1rem" }}>
                    {foodList.filter((item) => quantity[item.id] > 0).length}
                  </Badge>
                </h4>
                <ListGroup className="mb-3">
                  {foodList
                    .filter((item) => quantity[item.id] > 0)
                    .map((item, i) => (
                      <ListGroup.Item
                        key={i}
                        className="d-flex justify-content-between lh-sm"
                      >
                        <div>
                          <h6 className="my-0 fw-semibold">{item.name}</h6>
                          <small className="text-body-secondary">
                            Qty : {quantity[item.id]}
                          </small>
                        </div>
                        <span className="text-body-secondary fw-bold">
                          &#8377;{item.price}
                        </span>
                      </ListGroup.Item>
                    ))}
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>&#8377;{totalPrice.toFixed(2)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Shipping</span>
                    <span>&#8377;{shippingCost.toFixed(2)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Tax(10%)</span>
                    <span>&#8377;{tax.toFixed(2)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span className="fw-bold">Total (INR)</span>
                    <strong className="text-primary">
                      &#8377;{finalTotal.toFixed(2)}
                    </strong>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={7} lg={8}>
            <Card className="placeorder-card shadow-sm border-0">
              <Card.Body className="p-2 p-md-3">
                <h4 className="mb-4 mt-0 fw-bold text-center">
                  Billing Address
                </h4>
                <Form onSubmit={OnSubmitHandler}>
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          First name
                        </Form.Label>
                        <Form.Control
                          required
                          name="firstName"
                          value={data.firstName}
                          onChange={OnChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          Last name
                        </Form.Label>
                        <Form.Control
                          required
                          name="lastName"
                          value={data.lastName}
                          onChange={OnChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          Email{" "}
                          <span className="text-body-secondary">
                            (Optional)
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="you@example.com"
                          name="email"
                          value={data.email}
                          onChange={OnChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          Phone{" "}
                          <span className="text-body-secondary">
                            (Optional)
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="enter your phone no."
                          name="phoneNumber"
                          value={data.phoneNumber}
                          onChange={OnChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">Address</Form.Label>
                        <Form.Control
                          required
                          placeholder="1234 Main St"
                          name="address"
                          value={data.address}
                          onChange={OnChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">
                          Address 2{" "}
                          <span className="text-body-secondary">
                            (Optional)
                          </span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Apartment or suite"
                          name="address2"
                          value={data.address2}
                          onChange={OnChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">City</Form.Label>
                        <Form.Select
                          required
                          name="country"
                          value={data.country}
                          onChange={OnChangeHandler}
                        >
                          <option value="">Choose...</option>
                          <option>Bhopal</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">State</Form.Label>
                        <Form.Select
                          required
                          name="state"
                          value={data.state}
                          onChange={OnChangeHandler}
                        >
                          <option value="">Choose...</option>
                          <option>MP</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label className="fw-semibold">Zip</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          name="zip"
                          value={data.zip}
                          onChange={OnChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr className="my-4" />
                  <Button
                    className="w-100 btn-lg placeorder-btn-gradient"
                    type="submit"
                  >
                    Continue to checkout
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default PlaceOrder;
