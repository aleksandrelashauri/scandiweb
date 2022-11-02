import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const rootElement = document.getElementById("root");

const client = new ApolloClient({
  uri: "https://graphqlshoping.herokuapp.com/",
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
