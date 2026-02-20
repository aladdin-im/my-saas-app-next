export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1>Protected</h1>
            {children}
        </div>
    );
}