import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import BooksMarquee from "@/components/shared/BooksMarquee";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <BooksMarquee />
      <main className='min-h-screen'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;