import styles from './AppLayout.module.css'
import MenuBar from "@/components/Menu/MenuBar/MenuBar";
import Footer from '@/components/Footer/Footer';
import ModalRouteListener from '@/components/Modals/ModalRouteListener/ModalRouteListener';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.container}>
      <ModalRouteListener />
      <MenuBar />
      <section className={styles.content}>{children}</section>
      <Footer />
    </main>
  );
}
