import '../globals.css';

export const metadata = {
  title: 'VersaceHub',
  description: 'Free ultra HD gaming wallpapers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
