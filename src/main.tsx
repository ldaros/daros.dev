import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import "~/styles/globals.scss";

import { contentful } from "./services/cms/config";

const client = new ApolloClient({
  uri: `${contentful.endpoint}${contentful.spaceID}`,
  headers: {
    Authorization: `Bearer ${contentful.accessToken}`,
  },
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
