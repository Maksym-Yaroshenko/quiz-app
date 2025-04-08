// src/api/contentful.js

import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
  environment: "master",
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export default client;
