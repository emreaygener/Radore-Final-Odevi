import { useOidcUser, OidcUserStatus, useOidc } from "@axa-fr/react-oidc";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

const IdentityService = () => {
  const { login, logout, isAuthenticated } = useOidc();
  const { oidcUser, oidcUserLoadingState } = useOidcUser();
  const dispatch = useDispatch();
  const userFromSelector = useSelector((state) => state.user);
  useEffect(() => {
    if (oidcUserLoadingState === OidcUserStatus.Loaded) {
      dispatch({
        type: "user/login",
        payload: {
          name: oidcUser.name ?? "ibrahim",
          email: oidcUser.email ?? "ibr@ibr.com",
          pass: "123456",
          role: oidcUser.role ?? "customer",
        },
      });
    }
  }, [oidcUserLoadingState]);

  return (
    <>
      <span className="text text-primary m-1">Identity User</span>
      {oidcUserLoadingState === OidcUserStatus.Loading && <div>Loading...</div>}
      {oidcUserLoadingState === OidcUserStatus.Unauthenticated && (
        <span className="text m-1">
          {
            "Unauthorized / Admin Account => email:admin1@gmail.com pass:Admin123* / Customer Account => email:customer1@gmail.com pass:Admin123*"
          }
        </span>
      )}
      {oidcUserLoadingState === OidcUserStatus.Loaded && (
        <span className="text m-1">
          {oidcUser.preferred_username + "/" + JSON.stringify(userFromSelector)}
        </span>
      )}
      <button
        className="btn btn-primary m-1"
        onClick={() => {
          login();
        }}
        disabled={isAuthenticated}
      >
        Identity Login
      </button>

      <button
        className="btn btn-danger"
        onClick={() => {
          logout();
        }}
        disabled={!isAuthenticated}
      >
        Clear Identity User
      </button>
    </>
  );
};

export default IdentityService;
