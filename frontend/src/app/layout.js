import '../styles/globals.css';

export const metadata = {
  title: 'Almanasa LMS',
  description: 'Single instructor LMS'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
