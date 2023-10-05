import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enterdName = nameInputRef.current.value;
    const enterdStreet = streetInputRef.current.value;
    const enterdPostal = postalInputRef.current.value;
    const enterdCity = cityInputRef.current.value;

    const enterdNameIsValid = !isEmpty(enterdName);
    const enterdStreetIsValid = !isEmpty(enterdStreet);
    const enterdCityIsValid = !isEmpty(enterdCity);
    const enterdPostalIsValid = isFiveChars(enterdPostal);

    setFormInputsValidity({
      name: enterdNameIsValid,
      street: enterdStreetIsValid,
      postal: enterdPostalIsValid,
      city: enterdCityIsValid,
    });

    const formIsValid =
      enterdNameIsValid &&
      enterdCityIsValid &&
      enterdStreetIsValid &&
      enterdPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enterdName,
      city: enterdCity,
      postal: enterdPostal,
      street: enterdStreet,
    });
  };

  const nameControleClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControleClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const cityControleClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const postalControleClasses = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={nameControleClasses}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControleClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControleClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please enter a valid postal</p>}
      </div>
      <div className={cityControleClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
