import NavBar from "@/components/shared/NavBar";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
  }
    return (
      <div className="flex h-screen flex-col">
        <NavBar />
        <main className="flex-1 px-5 sm:px-14">{children}</main>
      </div>
    );
}