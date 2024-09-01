import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginArea = () => {
  let dispatch = useDispatch();
  const history = useNavigate();

  let status = useSelector((state) => state.user.status);
  let user = useSelector((state) => state.user.user);

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const sanitizeInput = (input) => {
    return input.replace(/<[^>]*>?/gm, "");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
  };

  const validatePass = (pass) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(pass);
  };

  const validateForm = () => {
    let valid = true;
    let err = {
      email: false,
      password: false,
    };

    if (!validateUsername(loginState.email)) {
      valid = false;
      err.email = true;
    }

    if (!validatePass(loginState.password)) {
      valid = false;
      err.password = true;
    }

    setError(err);

    if (!valid) {
      Swal.fire({
        icon: "error",
        title: "Hata",
        text: "Lütfen tüm alanları doğru şekilde doldurunuz",
      });
      return valid;
    }
    Swal.fire({
      icon: "success",
      title: "Giriş Başarılı",
      text: "Hoşgeldiniz " + loginState.email,
    });
    history("/");

    return valid;
  };

  const login = () => {
    if (status) {
      Swal.fire({
        icon: "question",
        title: "" + user.name,
        html:
          "Zaten giriş yapmışsınız<br />" +
          "<b>" +
          "Dashboard</b> " +
          "<b>Shop</b> page",
      }).then((result) => {
        if (result.isConfirmed) {
          history("/");
        }
      });
    } else {
      dispatch({ type: "user/login" });
      let name = user.name || "Customer";
      Swal.fire({
        icon: "success",
        title: "Giriş Başarılı",
        text: "Hoşgeldiniz " + name,
      });
      history("/");
    }
  };

  return (
    <>
      <h1 className="text text-danger text-center">
        Bu sayfa sadece react validasyonlarını örneklemesi amacıyla
        bırakılmıştır. Uygulama Kullanıcı altyapısı, mikroservis tarafındaki
        IdentityService ile değiştirilmiştir.
      </h1>
      <section id="login_area" className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
              <div className="account_form">
                <h3>Giriş Yap</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validateForm();
                  }}
                >
                  <div className="default-form-box">
                    <label>
                      Kullanıcı adı veya Email
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={loginState.email}
                      onChange={(e) => {
                        const sanitizedEmail = sanitizeInput(e.target.value);
                        setLoginState({ ...loginState, email: sanitizedEmail });
                        setError({
                          ...error,
                          email: !validateUsername(sanitizedEmail),
                        });
                      }}
                      required
                    />
                    {error.email && (
                      <span className="text-danger">
                        Kullanıcı adı sadece harf ve rakam içermelidir, boş
                        bırakılamaz
                      </span>
                    )}
                  </div>
                  <div className="default-form-box">
                    <label>
                      Şifre<span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={loginState.password}
                      onChange={(e) => {
                        const sanitizedPass = sanitizeInput(e.target.value);
                        setLoginState({
                          ...loginState,
                          password: sanitizedPass,
                        });
                        setError({
                          ...error,
                          password: !validatePass(sanitizedPass),
                        });
                      }}
                      minLength="8"
                    />
                    {error.password && (
                      <span className="text-danger">
                        Şifre en az 8 karakter olmalıdır ve en az 1 sayı, 1 harf
                        ve 1 özel karakter içermelidir
                      </span>
                    )}
                  </div>
                  <div className="login_submit">
                    <button
                      className="theme-btn-one btn-black-overlay btn_md"
                      type="submit"
                      disabled={
                        loginState.email === "" || loginState.password === ""
                      }
                    >
                      Giriş Yap
                    </button>
                  </div>
                  <div className="remember_area">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="materialUnchecked"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="materialUnchecked"
                      >
                        Beni Hatırla
                      </label>
                    </div>
                  </div>
                  <Link to="/register" className="active">
                    Hesap Oluştur
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginArea;
