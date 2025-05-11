import styles from './Sort.module.css'

interface SortProps {
    label: string;
    onSortToggle: (event: React.BaseSyntheticEvent ) => void
}

export default function Sort({ label, onSortToggle }: SortProps) {
    return (
        <div className={styles.wrapper}>
            <p>{label}</p>
            <input type='checkbox' onChange={(event) => { onSortToggle(event) }} />
        </div>
    )
}