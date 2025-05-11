import styles from './ProductSection.module.css'
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownSectionProps {
    title: string;
    price: number;
    children: React.ReactNode;
}

export default function ProductSection({ title, price, children }: DropdownSectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
                <h2>{title}</h2>
                <p>{price}$</p>
                <button onClick={() => setIsOpen(!isOpen)}>Select</button>
            </div>
            {isOpen && <div className={styles.content}>{children}</div>}
        </div>
    );
}