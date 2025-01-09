'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from 'react-redux';
import { store } from './rtk/index';
import { Toaster } from 'react-hot-toast';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Header, Footer } from "@/components";
const App = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Header />
          <Toaster />
          <main className="">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}

export default App