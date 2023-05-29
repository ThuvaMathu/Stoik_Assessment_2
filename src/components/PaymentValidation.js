import React, { useState } from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [expiryMonth, setExpiryMonth] = useState("");
  const [isValidMonth, setIsValidMonth] = useState(false);
  const [expiryYear, setExpiryYear] = useState("");
  const [isValidYear, setIsValidYear] = useState(false);
  const [cvv, setCVV] = useState("");
  const [isValidCvv, setIsValidCvv] = useState(false);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
    setIsValidNumber(
      event.target.value.length === 16 && /^\d+$/.test(event.target.value)
    );
  };

  const handleCardholderNameChange = (event) => {
    setCardholderName(event.target.value);
    setIsValidName(/^[a-zA-Z]+$/.test(event.target.value));
  };

  const handleExpiryMonthChange = (event) => {
    setExpiryMonth(event.target.value);
    setIsValidMonth(
      /^\d{2}$/.test(event.target.value) &&
        parseInt(event.target.value, 10) >= 1 &&
        parseInt(event.target.value, 10) <= 12
    );
  };

  const handleExpiryYearChange = (event) => {
    const inputYear = event.target.value;
    const sanitizedYear = inputYear.replace(/[^0-9]/g, ""); // Remove non-digit characters
    const truncatedYear = sanitizedYear.slice(0, 4); // Limit to 4 digits

    setExpiryYear(truncatedYear);
    const currentYear = new Date().getFullYear();
    const isValidYear =
      /^\d{4}$/.test(truncatedYear) &&
      parseInt(truncatedYear, 10) >= currentYear &&
      parseInt(truncatedYear, 10) <= currentYear + 3;

    setIsValidYear(isValidYear);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
    setIsValidCvv(/^\d{3}$/.test(event.target.value));
  };

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">
              {cardNumber.length > 0 ? cardNumber : "XXXXXXXXXXXXXXXX"}
            </p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">
                {cardholderName.length > 0 ? cardholderName : "HOLDER NAME"}
              </span>
              <span className="debit-card-date">
                {expiryMonth.length > 0 ? expiryMonth : "MM"}/
                {expiryYear.length > 0 ? expiryYear : "YYYY"}
              </span>
              <span className="debit-card-cvv">
                {cvv.length > 0 ? cvv : "CVV"}
              </span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="layout-column mb-15">
                <input
                  placeholder="Card Number"
                  data-testid="cardNumberInput"
                  value={cardNumber}
                  type="text"
                  onChange={handleCardNumberChange}
                />
                {!isValidNumber && (
                  <p className="invalid-text" data-testid="numberInputError">
                    Invalid Card Number
                  </p>
                )}
              </div>
              <div className="layout-column mb-15">
                <input
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  type="text"
                  value={cardholderName}
                  onChange={handleCardholderNameChange}
                />
                {!isValidName && (
                  <p className="invalid-text" data-testid="nameInputError">
                    Invalid Card Name
                  </p>
                )}
              </div>
              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    type="number"
                    value={expiryMonth}
                    onChange={handleExpiryMonthChange}
                  />
                  {!isValidMonth && (
                    <p className="invalid-text" data-testid="monthInputError">
                      Invalid Month
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Year"
                    type="number"
                    data-testid="yearInput"
                    value={expiryYear}
                    onChange={handleExpiryYearChange}
                  />
                  {!isValidYear && (
                    <p className="invalid-text" data-testid="yearInputError">
                      Invalid Year
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    type="number"
                    placeholder="CVV"
                    data-testid="cvvInput"
                    value={cvv}
                    onChange={handleCVVChange}
                  />
                  {!isValidCvv && (
                    <p className="invalid-text" data-testid="cvvInputError">
                      Invalid CVV
                    </p>
                  )}
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={
                    !isValidCvv ||
                    !isValidYear ||
                    !isValidNumber ||
                    !isValidName ||
                    !isValidMonth
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
