'use client';

import Header from "./ui/Header";
import AppWrapper from "./ui/AppWrapper";
import Footer from "./ui/Footer";
import { ContextWrapperQuoteDays } from "./context/ContextQuoteDays";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <ContextWrapperQuoteDays>
        <Header></Header>
        <main className="flex-1 bg-white">
          <AppWrapper />
        </main>
        <Footer></Footer>
      </ContextWrapperQuoteDays>      
    </div>
    );
}
