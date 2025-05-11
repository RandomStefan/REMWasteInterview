import styles from './HeaderDivider.module.css'

type DividerProps = {
    color?: 'blue' | 'gray';
};

export default function HeaderDivider({ color = 'gray' }: DividerProps) {
    const lineColor = color === 'blue' ? '#0037C1' : '#6c757d84';

    return (
        <hr className={styles.wrapper} style={{ border: 'none', borderTop: `2px solid ${lineColor}`, margin: '1rem 0' }} />
    );
}