import { loadScript } from "@paypal/paypal-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function Donate() {
  loadScript({
    "client-id":
      "Ae6uokzck9jINxn9UYjAqys6-rkOoSX4fgCmAeJm5_0HR1LO7uCIFOBvkQ4Zraxut3sRZMY2TxyurVJ5",
  })
    .then((paypal) => {
      console.log("success");
    })
    .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
    });
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Ae6uokzck9jINxn9UYjAqys6-rkOoSX4fgCmAeJm5_0HR1LO7uCIFOBvkQ4Zraxut3sRZMY2TxyurVJ5",
      }}
    />
  );
}
