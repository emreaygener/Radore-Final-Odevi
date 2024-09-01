import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOidcFetch } from "@axa-fr/react-oidc";
import loadable from "./components/Common/loadable";
import pMinDelay from "p-min-delay";
import Loader from "./components/Common/Loader";
import "./assets/css/style.css";
import "./assets/css/animate.min.css";
import "./assets/css/color.css";
const Fashion = loadable(() => pMinDelay(import("./page/"), 250), {
  fallback: <Loader />,
});
const Register = loadable(() => pMinDelay(import("./page/register"), 250), {
  fallback: <Loader />,
});
const ProductDetailsTwos = loadable(
  () => pMinDelay(import("./page/Product/product-details-two"), 250),
  { fallback: <Loader /> }
);
const About = loadable(() => pMinDelay(import("./page/about"), 250), {
  fallback: <Loader />,
});
const ContactTwo = loadable(
  () => pMinDelay(import("./page/Contact/contact-two"), 250),
  { fallback: <Loader /> }
);
const Login = loadable(() => pMinDelay(import("./page/login"), 250), {
  fallback: <Loader />,
});
const Cart = loadable(() => pMinDelay(import("./page/cart/index"), 250), {
  fallback: <Loader />,
});
const Favorites = loadable(
  () => pMinDelay(import("./page/Wishlist/index"), 250),
  { fallback: <Loader /> }
);

const ShopLeftSideBar = loadable(
  () => pMinDelay(import("./page/shop/shop-left-sidebar"), 250),
  { fallback: <Loader /> }
);
const OrderComplete = loadable(
  () => pMinDelay(import("./page/order/order-complete"), 250),
  { fallback: <Loader /> }
);
const CheckoutTwos = loadable(
  () => pMinDelay(import("./page/checkout/checkout-two"), 250),
  { fallback: <Loader /> }
);
const CustomerOrder = loadable(
  () => pMinDelay(import("./page/my-account/customer-order"), 250),
  { fallback: <Loader /> }
);
const CustomerAddress = loadable(
  () => pMinDelay(import("./page/my-account/customer-address"), 250),
  { fallback: <Loader /> }
);
const CustomerAccountDetails = loadable(
  () => pMinDelay(import("./page/my-account/customer-account-details"), 250),
  { fallback: <Loader /> }
);
function App() {
  const dispatch = useDispatch();
  const { fetch } = useOidcFetch();
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://localhost:44390/api/products")
        .then((res) => res.json())
        .then((data) => {
          const dataMapped = data.result.map((product) => {
            return {
              id: product.productId,
              labels: "Trending",
              category: product.categoryName,
              img: product.imageUrl,
              hover_img: product.imageUrl,
              title: product.name,
              price: product.price,
              description: product.description,
              rating: {
                rate: 3.9,
                count: 30,
              },
              color: [
                {
                  color: "green",
                  img: product.imageUrl,
                  quantity: 1,
                },
                {
                  color: "red",
                  img: product.imageUrl,
                  quantity: 1,
                },
                {
                  color: "blue",
                  img: product.imageUrl,
                  quantity: 1,
                },
              ],
            };
          });
          dispatch({ type: "products/GetProducts", payload: dataMapped });
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Fashion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Favorites />} />

          <Route path="/login" element={<Login />} />
          <Route
            path="/product-details-two/:id"
            element={<ProductDetailsTwos />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactTwo />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/checkout-two" element={<CheckoutTwos />} />
          <Route
            path="/my-account/customer-order"
            element={<CustomerOrder />}
          />
          <Route
            path="/my-account/customer-address"
            element={<CustomerAddress />}
          />
          <Route
            path="/my-account/customer-account-details"
            element={<CustomerAccountDetails />}
          />
          <Route path="/shop/shop-left-sidebar" element={<ShopLeftSideBar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
