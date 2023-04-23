import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo } from 'react';
import { AppLink } from '../../AppLink';
import classes from './Text.module.scss';

export enum TextTheme {
    PRIMARY ='primary',
    INVERTED = 'inverted',
    ERROR = 'error'
}

export enum TextAlign {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l'
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};
interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    indent?: string | number;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    href?: string;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        indent,
        href,
    } = props;

    const add = [
        className,
        classes[theme],
        classes[align],
        classes[size],
    ];

    const HeaderTag = mapSizeToHeaderTag[size];

    const styles: CSSProperties = {
        textIndent: indent,
    };

    if (href) {
        return (
            <div
                className={classNames(classes.Text, {}, add)}
                style={styles}
            >
                {title && (
                    <AppLink
                        to={href}
                        className={classes.title}
                    >
                        {title}
                    </AppLink>
                )}
            </div>
        );
    }

    return (
        <div
            className={classNames(classes.Text, {}, add)}
            style={styles}
        >
            {title && <HeaderTag className={classes.title}>{title}</HeaderTag>}
            {text && <p className={classes.text}>{text}</p>}
        </div>
    );
});
