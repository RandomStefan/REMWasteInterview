import styles from './SkipPage.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ProductSection from '../components/section/ProductSection';
import { useEffect, useState } from 'react';
import getSkipData from '../api/skip-api/skip.api';
import type SkipEntry from '../types/skip.interface';
import Filter from '../components/sidebar/Filters';
import Sort from '../components/sort/Sort';

export default function SkipPage() {
    const [data, setData] = useState<SkipEntry[]>([]);
    const [displayData, setDisplayData] = useState<SkipEntry[]>([]);
    const [filterAllowedOnRoads, setFilterAllowedOnRoads] = useState<boolean>(false);
    const [filterAllowsHeavyWaste, setFilterAllowsHeavyWaste] = useState<boolean>(false);
    const [sortSize, setSortSize] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const skipData = await getSkipData('NR32', 'Lowestoft');
            setData(skipData);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setDisplayData(data);
        console.log('hit');
    }, [data]);

    function onFilterAllowedRoadsToggle(event: React.BaseSyntheticEvent) {
        setFilterAllowedOnRoads(event.target.checked);
    }

    function onFilterAllowsHeavyWasteToggle(event: React.BaseSyntheticEvent) {
        setFilterAllowsHeavyWaste(event.target.checked);
    }

    function onSortSize(event: React.BaseSyntheticEvent) {
        console.log(event.target.checked);
        setSortSize(event.target.checked);
    }

    useEffect(() => {
        setDisplayData(data.filter((dataEntry) => {
            return filterAllowedOnRoads ? dataEntry.allowed_on_road : true && filterAllowsHeavyWaste ? dataEntry.allows_heavy_waste : true;
        }))
    }, [filterAllowedOnRoads, filterAllowsHeavyWaste]);

    useEffect(() => {
        const sortedData = [...displayData].sort((a, b) =>
            sortSize ? b.size - a.size : a.size - b.size
        );
        setDisplayData(sortedData);

    }, [sortSize])
    return (<>
        <Header />
        <div className={styles.wrapper}>
            <h1 className={`${styles.heading}`}>Choose Your Skip Size</h1>
            <div className={styles.pageSeparation}>
                <div className={styles.sideBar}>
                    <h1>Filters</h1>
                    <Filter label={'Allowed on roads'} onFilterToggle={onFilterAllowedRoadsToggle} />
                    <Filter label={'Allows heavy weights'} onFilterToggle={onFilterAllowsHeavyWasteToggle} />
                    <p>Free transport</p>
                    <p>Extra weight cost</p>
                    <h1>Sort by</h1>
                    <Sort label={'Size'} onSortToggle={onSortSize} />
                    <p>Hiring period</p>
                </div>
                <div className={styles.mainContent}>
                    {displayData.map((skip) => {
                        return <ProductSection key={skip.id} title={`${skip.id} lmao`} price={123}>
                            <p>This is some detailed content.</p>
                            <button>Click me</button></ProductSection>
                    })}
                </div>
            </div>
        </div >
        <Footer />
    </>)
};


