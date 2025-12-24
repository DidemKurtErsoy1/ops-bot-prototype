import "./globals.css";

export const metadata = {
  title: "Ops Bot Prototype",
  description: "Mock Calendar to Jira workflow demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
