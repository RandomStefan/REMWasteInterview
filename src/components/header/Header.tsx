import styles from './Header.module.css';
import HeaderButton from '../buttons/HeaderButton';
import HeaderDivider from '../divider/HeaderDivider';
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard } from 'lucide-react';

export default function Header() {
    return (<>
        <div className={styles.wrapper}>
            <HeaderButton icon={MapPin} text="Postcode" url='' />
            <HeaderDivider />
            <HeaderButton icon={Trash2} text="Waste Type" url='' />
            <HeaderDivider />
            <HeaderButton icon={Truck} text="Select Skip" url='' />
            <HeaderDivider />
            <HeaderButton icon={Shield} text="Permit Check" url='' />
            <HeaderDivider />
            <HeaderButton icon={Calendar} text="Choose Date" url='' />
            <HeaderDivider />
            <HeaderButton icon={CreditCard} text="Payment" url='' />
        </div>
    </>)
}
