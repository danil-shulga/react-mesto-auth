import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

// хотел попрактиковаться с модульными стилями и по этому решил в этой работе реализовать тх таким образом
import styles from "./AuthorizationPage.module.css";

function AuthorizationForm(props) {
  const {
    title,
    buttonText,
    setLoggedInData,
    handleAuthorizationFormSubmit,
    showSingInLink,
    loggedIn,
  } = props;
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  function handleInputValuesChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setLoggedInData(inputValues);
  }, [inputValues, setLoggedInData]);

  return (
    <>
      {loggedIn && <Navigate to="/" />}
      <section className={styles.page}>
        <h2 className={styles.title}>{title}</h2>
        <form className={styles.form}>
          <input
            className={styles.input}
            value={inputValues.email}
            onChange={handleInputValuesChange}
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className={styles.input}
            value={inputValues.password}
            onChange={handleInputValuesChange}
            name="password"
            type="password"
            placeholder="Пароль"
          />
          <button
            className={styles.button}
            type="submit"
            onClick={handleAuthorizationFormSubmit}
          >
            {buttonText}
          </button>
          {showSingInLink && (
            <Link className={styles.link} to="/sign-in">
              Уже зарегистрированы? Войти
            </Link>
          )}
        </form>
      </section>
    </>
  );
}

export default AuthorizationForm;
