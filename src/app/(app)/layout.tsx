import styles from './AppLayout.module.css'
import MenuBar from "@/components/Menu/MenuBar/MenuBar";
import Footer from '@/components/Footer/Footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.container}>
      <MenuBar />
      <section className={styles.content}>{children}</section>
      <Footer />
    </main>
  );
}
