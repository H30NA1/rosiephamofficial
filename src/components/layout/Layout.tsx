import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ZaloChat from "@/components/ZaloChat";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <ZaloChat />
    </div>
  );
};

export default Layout;
