import styles from './Filters.module.css'

interface FilterProps {
    label: string;
    onFilterToggle: (event: React.BaseSyntheticEvent ) => void
}

export default function Filter({ label, onFilterToggle }: FilterProps) {
    return (
        <div className={styles.wrapper}>
            <p>{label}</p>
            <input type='checkbox' onChange={(event) => { onFilterToggle(event) }} />
        </div>
    )
}