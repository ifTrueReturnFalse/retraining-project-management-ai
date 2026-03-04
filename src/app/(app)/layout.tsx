import MenuBar from "@/components/Menu/MenuBar/MenuBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuBar />
      <main>{children}</main>
    </>
  );
}
