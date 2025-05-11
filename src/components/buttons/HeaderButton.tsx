import styles from './HeaderButton.module.css'

interface HeaderButtonProps {
    icon: React.ElementType;
    text: string;
    url: string;
    color?: 'gray' | 'blue';
}

export default function HeaderButton({ icon: Icon, text, url, color = 'gray' }: HeaderButtonProps) {
    return (<div className={styles.wrapper} >
        <Icon className={styles[color]} />
        <span className={styles[`text${(color)}`]}>{`${text} ${url}`}</span>
    </div>)
}