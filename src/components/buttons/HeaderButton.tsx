import styles from './HeaderButton.module.css'

interface HeaderButtonProps {
    icon: React.ElementType;
    text: string;
    url: string;
}

export default function HeaderButton({ icon: Icon, text, url }: HeaderButtonProps) {
    return (<div className={styles.wrapper} >
        <Icon />
        <span>{`${text} ${url}`}</span>
    </div>)
}