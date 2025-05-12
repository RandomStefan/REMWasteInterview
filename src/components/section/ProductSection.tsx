import styles from "./ProductSection.module.css";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DropdownSectionProps {
  title: string;
  price: number;
  children: React.ReactNode;
  onSelect: () => void;
}

export default function ProductSection({
  title,
  price,
  children,
  onSelect
}: DropdownSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.headerLeft}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
          <h2>{title}</h2>
        </div>
        <div className={styles.headerRight}>
          <p>{price}$</p>
          <button
            className={styles.headerSectionButton}
            onClick={() => {
              setIsOpen(true);
              onSelect();
            }}
          >
            Select
          </button>
        </div>
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
}
