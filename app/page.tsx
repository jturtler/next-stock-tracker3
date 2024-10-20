'use client';

import Header from "./ui/Header";
import AppWrapper from "./ui/AppWrapper";
import Footer from "./ui/Footer";
import { ContextWrapperQuoteDays } from "./context/ContextQuoteDays";
import { ContextWrapperMainModal } from "./context/ContextMainModal";

export default function Home() {

  // if ( !window.GLOBAL_OBJ ) window.GLOBAL_OBJ = {};

  return (
    <div className="flex h-screen flex-col">
      <ContextWrapperMainModal>
        <ContextWrapperQuoteDays>
          <Header></Header>
          <main className="flex-1 bg-white">
            <AppWrapper />
          </main>
          <Footer></Footer>
        </ContextWrapperQuoteDays>      
      </ContextWrapperMainModal>
      </div>
    );
}
