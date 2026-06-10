import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "../db";
import { AuthService } from "../email/services/AuthService";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url}) => {
      const { email, name } = user;
      await AuthService.sendPasswordResetToken({
        name,
        email,
        url
      })
    }
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { name, email } = user;
      await AuthService.sendVerificationEmail({
        name,
        email,
        url,
      });
    },
  },
  plugins: [nextCookies()],
});
