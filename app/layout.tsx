import {ClerkProvider} from '@clerk/nextjs';
import './globals.css';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body>
                    <div className="flex items-center justify-center min-h-screen">{children}</div>
                </body>
            </html>
        </ClerkProvider>
    );
}
