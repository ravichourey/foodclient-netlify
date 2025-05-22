import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  ListGroup,
  Badge,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import "./MyOrder.css";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [token]);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    }
    setLoading(false);
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    setDeleting(orderId);
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prev) =>
        prev.filter((order) => (order.id || order._id) !== orderId)
      );
    } catch (err) {
      alert("Failed to delete order.");
    }
    setDeleting(null);
  };

  // Sort orders by createdAt descending (latest first)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="myorders-container container py-4">
      <h2 className="mb-4 fw-bold text-center">My Orders</h2>
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : sortedOrders.length === 0 ? (
        <Alert variant="info" className="text-center">
          No orders found.
        </Alert>
      ) : (
        <div className="order-list">
          {sortedOrders.map((order) => {
            const orderId = order.id || order._id;
            return (
              <Card className="order-card mb-4 shadow-sm" key={orderId}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span className="fw-semibold">Order ID:</span>{" "}
                      <span className="text-secondary">{orderId}</span>
                    </div>
                    <Badge
                      bg={
                        order.orderStatus === "PENDING"
                          ? "warning"
                          : order.orderStatus === "PAID"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {order.orderStatus}
                    </Badge>
                  </div>
                  <div className="mb-2 small text-muted">
                    Placed On:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "N/A"}
                  </div>
                  <div className="mb-2">
                    <span className="fw-semibold">Delivery Address:</span>{" "}
                    {order.userAddress}
                  </div>
                  <div className="mb-2">
                    <span className="fw-semibold">Amount:</span>{" "}
                    <span className="text-success fw-bold">
                      ₹{order.amount}
                    </span>
                  </div>
                  <ListGroup variant="flush" className="mt-3">
                    {order.orderItems &&
                      order.orderItems.map((item, idx) => (
                        <ListGroup.Item key={idx} className="order-item-row">
                          <div className="d-flex align-items-center">
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="order-item-img"
                              />
                            )}
                            <div>
                              <div className="fw-semibold">{item.name}</div>
                              <div
                                className="text-muted"
                                style={{ fontSize: 14 }}
                              >
                                Qty: {item.quantity} × ₹{item.price}
                              </div>
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                  <div className="d-flex justify-content-end mt-3">
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={deleting === orderId}
                      onClick={() => handleDelete(orderId)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 40,
                        minHeight: 40,
                        padding: 0,
                      }}
                    >
                      {deleting === orderId ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <FiTrash2 size={20} />
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
