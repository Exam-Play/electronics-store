import { useEffect, useRef } from 'react';
import noUiSlider, { type API } from 'nouislider';
import 'nouislider/dist/nouislider.css';

interface RangePriceProps {
    MIN: number,
    MAX: number,
    onUpdate: (min: number, max: number) => void,
    onSliderReady: (api: API) => void
}

function RangePrice({ MIN, MAX, onUpdate, onSliderReady }: RangePriceProps) {
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sliderRef.current) return;
        const slider = noUiSlider.create(sliderRef.current, {
            start: [MIN, MAX],
            connect: true,
            range: { min: MIN, max: MAX },
        });

        onSliderReady(slider);

        slider.on('update', (values) => {
            onUpdate(Math.round(Number(values[0])), Math.round(Number(values[1])));
        });
        return () => slider.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MIN, MAX]);

    return <div ref={sliderRef}/>;
}

export default RangePrice;