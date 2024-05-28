import React from 'react';
import styles from './CoinProgress.module.css';
import Image, { StaticImageData } from 'next/image';

interface CoinProgressBarProps {
    currentCoins: number;
    maxCoins: number;
    coinIcon: StaticImageData;
}

const CoinProgressBar: React.FC<CoinProgressBarProps> = ({ currentCoins, maxCoins, coinIcon }) => {
    const progressPercentage = (currentCoins / maxCoins) * 100;

    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            {/* <div className={styles.coinText}>{currentCoins}/{maxCoins}</div> */}
            <div className={styles.coinIconContainer}>
                <Image src={coinIcon} alt="Coin Icon" className={styles.coinIcon} width={200} height={200} />
            </div>
        </div>
    );
};

export default CoinProgressBar;
