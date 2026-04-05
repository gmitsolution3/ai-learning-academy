import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDB } from "./mongodb";

const db = await getDB();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      profilePhoto: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});
