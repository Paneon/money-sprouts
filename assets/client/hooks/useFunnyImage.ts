import { useMemo } from 'react';
import { balanceImageMap } from '@/client/config/balance-image-map';

const useFunnyImage = (balance: number | undefined) => {
    const imagePath = useMemo(() => {
        if (typeof balance === 'undefined') {
            return balanceImageMap[balanceImageMap.length - 1].imagePath;
        }

        if (balance === 0) {
            return (
                balanceImageMap.find((item) => item.threshold === 0)
                    ?.imagePath || ''
            );
        }

        return (
            balanceImageMap.find((item) => balance <= item.threshold)
                ?.imagePath ||
            balanceImageMap[balanceImageMap.length - 1].imagePath
        );
    }, [balance]); // useMemo will only recompute the imagePath if balance changes

    return { imagePath };
};

export default useFunnyImage;
