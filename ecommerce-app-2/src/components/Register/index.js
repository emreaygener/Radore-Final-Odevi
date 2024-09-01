import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterArea = () => {
  let dispatch = useDispatch();
  const history = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState({
    user: false,
    email: false,
    pass: false,
  });

  let status = useSelector((state) => state.user.status);
  let userData = useSelector((state) => state.user.user);

  const register = () => {
    if (status) {
      Swal.fire({
        icon: "question",
        title: "" + userData.name,
        html:
          "Zaten Kayıtlısınız<br />" +
          " <b>" +
          "Dashboard</b> " +
          "<b>Shop</b>",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/my-account");
        } else {
          // not clicked
        }
      });
    } else {
      dispatch({ type: "user/register", payload: { user, email, pass } });

      Swal.fire({
        icon: "success",
        title: "Kayıt Başarılı",
        text: "Hoş geldiniz " + user,
      });
      history("/my-account");
    }
  };

  const sanitizeInput = (input) => {
    return input.replace(/<[^>]*>?/gm, "");
  };

  const validateUser = (user) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(user);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePass = (pass) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(pass);
  };

  const validateForm = () => {
    let valid = true;
    let err = {
      user: false,
      email: false,
      pass: false,
    };

    if (!validateUser(user)) {
      valid = false;
      err.user = true;
    }

    if (!validateEmail(email)) {
      valid = false;
      err.email = true;
    }

    if (!validatePass(pass)) {
      valid = false;
      err.pass = true;
    }

    setError(err);

    if (!valid) {
      Swal.fire({
        icon: "error",
        title: "Hata",
        text: "Lütfen tüm alanları doldurunuz",
      });
      return valid;
    }

    Swal.fire({
      icon: "success",
      title: "Kayıt Başarılı",
      text: "Hoş geldiniz " + user,
    });
    history("/");

    return valid;
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
                <h3>Kayıt Ol</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validateForm();
                    // register();
                  }}
                >
                  <div className="default-form-box">
                    <label>
                      Kullanıcı Adı<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={user}
                      onChange={(e) => {
                        setUser(sanitizeInput(e.currentTarget.value));
                        setError({
                          ...error,
                          user: !validateUser(e.currentTarget.value),
                        });
                      }}
                      required
                    />
                    {error.user && (
                      <span className="text-danger">
                        Kullanıcı adı sadece harf ve rakam içermelidir
                      </span>
                    )}
                  </div>
                  <div className="default-form-box">
                    <label>
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => {
                        setEmail(sanitizeInput(e.currentTarget.value));
                        setError({
                          ...error,
                          email: !validateEmail(e.currentTarget.value),
                        });
                      }}
                      required
                    />
                    {error.email && (
                      <span className="text-danger">
                        Geçerli bir email giriniz
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
                      value={pass}
                      onChange={(e) => {
                        setPass(sanitizeInput(e.currentTarget.value));
                        setError({
                          ...error,
                          pass: !validatePass(e.currentTarget.value),
                        });
                      }}
                      required
                      minLength="8"
                    />
                    {error.pass && (
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
                    >
                      Kayıt Ol
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterArea;
