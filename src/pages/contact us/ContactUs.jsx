import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <section
      className="app-section d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <article className="app-card contact-card">
              <div className="card-body p-4 p-md-5">
                <h2 className="fw-bold  mb-4 text-center d-flex align-items-center justify-content-center gap-2">
                  <i></i>Contact Us
                </h2>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label
                        className="form-label fw-semibold"
                        htmlFor="firstName"
                      >
                        <i className="bi bi-person me-1"></i>First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="form-label fw-semibold"
                        htmlFor="lastName"
                      >
                        <i className="bi bi-person me-1"></i>Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" htmlFor="email">
                        <i className="bi bi-envelope me-1"></i>Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label
                        className="form-label fw-semibold"
                        htmlFor="message"
                      >
                        <i className="bi bi-chat-dots me-1"></i>Your Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="5"
                        placeholder="Your Message"
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn app-btn-gradient w-100 py-3 fw-bold"
                        type="submit"
                        style={{
                          border: "none",
                          borderRadius: "2rem",
                          letterSpacing: "1px",
                        }}
                      >
                        <i className="bi bi-send me-2"></i>Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
