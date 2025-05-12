import styles from "./Footer.module.css";

interface FooterProps {
  isVisible?: boolean;
  price?: number;
}

export default function Footer({ isVisible = false, price }: FooterProps) {
  return (
    isVisible && (
      <div className={styles.wrapper}>
        <h1 className={styles.footerPrice}>{`${price}$`}</h1>
        <button className={styles.footerButton}>Continue</button>
      </div>
    )
  );
}
