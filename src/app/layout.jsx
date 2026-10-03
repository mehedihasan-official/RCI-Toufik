import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "RCI Vacations",
  description: "Worlds largest vacation exchange platform for resort bookings",
  icons: {
    icon: "/Rci-vertical.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
