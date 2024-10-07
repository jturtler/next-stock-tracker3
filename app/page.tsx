import Image from "next/image";
import Header from "./ui/Header";
import AppWrapper from "./ui/AppWrapper";
import Footer from "./ui/Footer";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header></Header>
      <main className="flex-1 bg-white">
        <AppWrapper />
      </main>
      <Footer></Footer>
    </div>
    );
}
