import { useEffect, useRef, useState } from "react";

import CheckBox from "./CheckBox";
import RangePrice from "./RangePrice";

function Filter({
    MIN,
    MAX
}:{
    MIN: number,
    MAX: number
}){
    useEffect(() => {
        if (MIN === 0 && MAX === 0) return;
        setPriceMin(MIN);
        setPriceMax(MAX);
    }, [MIN, MAX]);

    const [priceMin, setPriceMin] = useState(MIN);
    const [priceMax, setPriceMax] = useState(MAX);
    const sliderInstance = useRef<any>(null);
    const [styleFont, setStyleFont] = useState('#B9B9B9');

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = Number(e.target.value);
        if (val < MIN) val = MIN;
        if (val >= priceMax) val = priceMax - 1;
        setPriceMin(val);
        sliderInstance.current?.set([val, null]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = Number(e.target.value);
        if (val > MAX) val = MAX;
        if (val <= priceMin) val = priceMin + 1;
        setPriceMax(val);
        sliderInstance.current?.set([null, val]);
    };

    return <div className="filter">
        <div className="section">
            <h2>Цена, ₽</h2>
            <div className="price-inputs">
                <div className="input-template">
                    <label htmlFor="priceMin">От</label>
                    <input
                        style={{ color: styleFont }}
                        id="priceMin"
                        type="number"
                        value={priceMin}
                        onChange={(e) => setPriceMin(Number(e.target.value))}
                        onFocus={() => setStyleFont('#000')}
                        onBlur={(e) => {
                            setStyleFont('#B9B9B9');
                            handleMinChange(e);
                        }}
                        min="0"
                        max={MAX}
                    />
                </div>
                <div className="input-template">
                    <label htmlFor="priceMax">До</label>
                    <input
                        style={{ color: styleFont }}
                        id="priceMax"
                        type="number"
                        value={priceMax}
                        onChange={(e) => setPriceMax(Number(e.target.value))}
                        onFocus={() => setStyleFont('#000')}
                        onBlur={(e) => {
                            setStyleFont('#B9B9B9')
                            handleMaxChange(e);
                        }}
                        min="0"
                        max={MAX}
                    />
                </div>
            </div>
            <RangePrice
                MIN={MIN}
                MAX={MAX}
                min={priceMin}
                max={priceMax}
                onUpdate={(min, max) => {
                    setPriceMin(min);
                    setPriceMax(max);
                }}
                sliderInstance={sliderInstance}
            />
        </div>

        <div className="section">
            <h2>Тип товара</h2>
            <div className="check-list">
                <CheckBox title="Смартфоны"/>
                <CheckBox title="Фитнес браслеты"/>
                <CheckBox title="Портативная акустика"/>
                <CheckBox title="Очки виртуальной реальности"/>
                <CheckBox title="Электротранспорт"/>
                <CheckBox title="Умные часы"/>
            </div>
        </div>

        <div className="section">
            <h2>Цвет</h2>
            <div className="check-list">
                <CheckBox title="Красный"/>
                <CheckBox title="Оранжевый"/>
                <CheckBox title="Желтый"/>
                <CheckBox title="Зеленый"/>
                <CheckBox title="Голубой"/>
                <CheckBox title="Синий"/>
                <CheckBox title="Фиолетовый"/>
            </div>
        </div>

        <div className="buttons">
            <button className="button-blue-template">
                <span>Показать</span>
            </button>
            <button className="button-pink-template">
                <span>Сбросить</span>
            </button>
        </div>
    </div>
}

export default Filter;