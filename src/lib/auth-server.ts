import { headers } from "next/headers";
import { auth } from "./auth";


export default async function getAuthServerSession() {
  
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return session; 
}


// Helper function to check if the user is authenticated and return the session data
export async function requireAuth() {
  const session = await getAuthServerSession();

  return {
    session,
    isAuth : session ? true : false
  }
}