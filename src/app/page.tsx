import { Hero } from "@/components/hero/hero";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />

      <Hero />
    </>
  );
}
