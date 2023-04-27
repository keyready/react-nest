import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './UserCard.module.scss';

interface UserCardProps {
    className?: string;
}

export const UserCard = memo((props: UserCardProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(classes.UserCard, {}, [className])}>
            //
        </div>
    );
});
