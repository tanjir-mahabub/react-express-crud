import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Toaster position="top-center" reverseOrder={false} />
                {children}
            </body>
        </html>
    );
} 