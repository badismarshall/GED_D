import NavBar from "@/components/shared/NavBar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex h-screen flex-col">
        <NavBar />
        <main className="flex-1 px-5 sm:px-14">{children}</main>
      </div>
    );
}