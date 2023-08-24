import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "CohesionHub",
  description:
    "Where Unity Finds Its Hub: Connect, Play, and Thrive Together with CohesionHub.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
