import { requireAuth } from "@/lib/requireAuth";
import Header from "./../../../components/Header/Header";
import Footer from './../../../components/Footer';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth(["user"]);

  return (
    <section >
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </section>
  );
}
