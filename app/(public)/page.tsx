import Hero from "@/components/ui/Hero";
import { generatePageTitle } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: generatePageTitle("Home")
}

export default async function Home() {

  return (
    <>
      <Hero />

    </>
  );
}
