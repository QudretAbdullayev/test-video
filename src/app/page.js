import styles from "./page.module.css";
import VideoStatic from "./VideoStatic/VideoStatic";

export default function Home() {
  return (
      <main className={styles.main}>
        <VideoStatic src="/videos/background.mp4" alt="video" />
      </main>
  );
}
