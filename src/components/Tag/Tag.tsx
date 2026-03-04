import styles from "./Tag.module.css";

interface TagProps {
  fontColor?: string;
  bgColor?: string;
  children: React.ReactNode;
}

export default function Tag({
  fontColor = "#EF4444",
  bgColor = "#FFE0E0",
  children,
}: TagProps) {
  return (
    <div
      className={styles.tag}
      style={{ color: fontColor, backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
}
