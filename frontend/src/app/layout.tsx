export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ padding: 0, margin: 0 }}>{children}</body>
    </html>
  );
}
