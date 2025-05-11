import styles from './SkipPage.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ProductSection from '../components/section/ProductSection';
import { useEffect, useState } from 'react';
import getSkipData from '../api/skip-api/skip.api';
import type SkipEntry from '../types/skip.interface';
import Filter from '../components/sidebar/Filters';
import Sort from '../components/sort/Sort';
import WhiteDivider from '../components/divider/BarDivider';

export default function SkipPage() {
    const [data, setData] = useState<SkipEntry[]>([]); // Working data set with all entries
    const [displayData, setDisplayData] = useState<SkipEntry[]>([]); // Data set used for display

    // Filter state section
    const [filterAllowedOnRoads, setFilterAllowedOnRoads] = useState<boolean>(false);
    const [filterAllowsHeavyWaste, setFilterAllowsHeavyWaste] = useState<boolean>(false);
    // const [filterFreeTransport, setFilterFreeTransport] = useState<boolean>(false);
    // const [filterExtraWeightCost, setFilterExtraWeightCost] = useState<boolean>(false);

    // Sorting state section
    const [sortSize, setSortSize] = useState<boolean>(false);
    //const [sortHiringPeriod, setSortHiringPeriod] = useState<boolean>(false);

    // Fetch and set skip data
    useEffect(() => {
        const fetchData = async () => {
            const skipData = await getSkipData('NR32', 'Lowestoft');
            setData(skipData);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setDisplayData(data);
    }, [data]);

    // Filter functions
    function onFilterAllowedRoadsToggle(event: React.BaseSyntheticEvent) {
        setFilterAllowedOnRoads(event.target.checked);
    }

    function onFilterAllowsHeavyWasteToggle(event: React.BaseSyntheticEvent) {
        setFilterAllowsHeavyWaste(event.target.checked);
    }

    // function onFilterFreeTransport(event: React.BaseSyntheticEvent) {
    //     setFilterFreeTransport(event.target.checked);
    // }

    // function onFilterExtraWeightCost(event: React.BaseSyntheticEvent) {
    //     setFilterExtraWeightCost(event.target.checked);
    // }

    // Sort functions
    function onSortSize(event: React.BaseSyntheticEvent) {
        setSortSize(event.target.checked);
    }

    // function onSortHiringPeriod(event: React.BaseSyntheticEvent) {
    //     setSortHiringPeriod(event.target.checked);
    // }

    // Filter effect
    useEffect(() => {
        setDisplayData(data.filter((dataEntry) => {
            console.log(dataEntry);
            //const perTonneCost = dataEntry.per_tonne_cost != null && dataEntry.per_tonne_cost > 0;
            //const transportCost = dataEntry.transport_cost != null && dataEntry.transport_cost > 0;
            return filterAllowedOnRoads ? dataEntry.allowed_on_road : true
                && filterAllowsHeavyWaste ? dataEntry.allows_heavy_waste : true;
            // && filterFreeTransport ? transportCost : true
            //     && filterExtraWeightCost ? perTonneCost : true;
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
            <h1 className={styles.heading}>Choose Your Skip Size</h1>
            <p className={styles.centeredText}>Select the skip size that best suits your needs</p>
            <div className={styles.pageSeparation}>
                <div className={styles.sideBar}>
                    <h1>Filters</h1>
                    <Filter label={'Allowed on roads'} onFilterToggle={onFilterAllowedRoadsToggle} />
                    <Filter label={'Allows heavy waste'} onFilterToggle={onFilterAllowsHeavyWasteToggle} />
                    <Filter label={'Free transport'} onFilterToggle={/*onFilterFreeTransport*/ onFilterAllowsHeavyWasteToggle} />
                    <Filter label={'Extra weight cost'} onFilterToggle={/*onFilterExtraWeightCost*/ onFilterAllowedRoadsToggle} />
                    <WhiteDivider />
                    <h1>Sort by</h1>
                    <Sort label={'Size'} onSortToggle={onSortSize} />
                    <Sort label={'Hiring period'} onSortToggle={/*onSortHiringPeriod*/ onSortSize} />
                </div>
                <div className={styles.mainContent}>
                    {displayData.map((skip) => {
                        return <ProductSection key={skip.id} title={`${skip.size} Yard Skip`} price={skip.price_before_vat + (skip.vat / 100 * skip.price_before_vat)}>
                            <div className={styles.productSectionWrapper}>
                                <div className={styles.productSectionLeft}>
                                    <p>Hire period: {skip.hire_period_days ? `${skip.hire_period_days} days` : 'Unavailable'}</p>
                                    <p>Price: {skip.price_before_vat ? `${skip.price_before_vat}$ + ${skip.vat}% VAT` : 'Out of stock'}</p>
                                    <p>Shipping costs: {skip.transport_cost ? `${skip.transport_cost}$` : 'FREE'}</p>
                                    <p>Per-tonne costs: {skip.per_tonne_cost ? `${skip.per_tonne_cost}$` : 'No per tonnage costs added'}</p>
                                </div>
                                <div className={styles.productSectionRight}>
                                    <img className={styles.productPhoto} src='/assets/skip.jpg' alt="Beautiful skip" />
                                </div>
                            </div>
                        </ProductSection>
                    })}
                </div>
            </div>
        </div >
        <Footer />
    </>)
};


