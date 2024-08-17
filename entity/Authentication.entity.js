import { Entity } from "electrodb"; 
import { client } from "../util/dbconnection.js";

const User = new Entity(
  {
    model: {
      entity: "User",
      version: "1",
      service: "AuthService",
    },
    attributes: {
      email: {
        type: "string",
        required: true,
      },
      username: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
      },
    admin:{
        type:"string"
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          facets: ["userId"],
        },
        sk: {
          field: "sk",
          facets: [],
        },
      },
      emailIndex: {
        index: "email-index",
        pk: {
          field: "emailPk",
          facets: ["email"],
        },
        sk: {
          field: "emailSk",
          facets: [],
        },
      },
    },
  },
  { client, table: "users" }
);

export { User };
