import React, { useState, useEffect, useRef } from "react";
import "./LiveSupport.css";
import { useSelector } from "react-redux";
import { OidcSecure } from "@axa-fr/react-oidc";

const LiveSupport = (props) => {
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const { status, user } = useSelector((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        props.liveSupportModal();
        props.leaveChatRoom();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props]);

  const messages = props.messages;

  useEffect(() => {
    setTimeout(() => {
      const messageContainer = document.querySelector(
        "div[style='height: 40vh; overflow-y: auto; min-width: 80%;']"
      );
      messageContainer.scrollTop =
        messageContainer.scrollHeight - messageContainer.clientHeight;
    }, 10);
  }, [messages]);

  return (
    <OidcSecure>
      {status ? (
        <aside id="live-support-modal">
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              props.sendMessage(message);
              setMessage("");
            }}
          >
            <header>
              <h2>Canlı Destek</h2>
              <button
                onClick={() => {
                  props.liveSupportModal();
                  props.leaveChatRoom();
                }}
              >
                &times;
              </button>
            </header>
            <section>
              <h3>Müşteri Temsilcisi</h3>
              <p>Merhaba {user.name}! Size nasıl yardımcı olabiliriz?</p>
            </section>
            <div style={{ height: "40vh", overflowY: "auto", minWidth: "80%" }}>
              <ul>
                {messages.map((message, index) => (
                  <li
                    key={index}
                    className={
                      message.username === "Customer"
                        ? "messageCustomer"
                        : "messageAdmin"
                    }
                    style={
                      message.username === "Customer"
                        ? { textAlign: "right", maxWidth: "60%" }
                        : { textAlign: "left", maxWidth: "60%" }
                    }
                  >
                    {message.msg}
                  </li>
                ))}
              </ul>
            </div>
            <footer>
              <textarea
                placeholder="Mesajınız"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button disabled={!message}>Gönder</button>
            </footer>
          </form>
        </aside>
      ) : null}
    </OidcSecure>
  );
};

export default LiveSupport;
