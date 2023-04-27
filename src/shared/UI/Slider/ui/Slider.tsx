import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import classes from './Slider.module.scss';

interface SliderProps {
    className?: string;
}

export const MSlider = memo((props: SliderProps) => {
    const {
        className,
    } = props;

    return (
        <Slider
            range
            max={200}
            defaultValue={[20, 60, 80, 100]}
            pushable
            trackStyle={[
                { backgroundColor: 'red', height: 20 },
                { backgroundColor: 'green', height: 20 },
                { backgroundColor: 'yellow', height: 20 },
            ]}
            dotStyle={{
                backgroundColor: 'red', width: 10, height: 10, borderRadius: '50%',
            }}
            railStyle={{ backgroundColor: 'black', height: 20 }}
        />
    );
});
