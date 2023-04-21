import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import { Button } from 'react-bootstrap';

interface ProductCardHeaderProps {
    readonly?: boolean;
    readonlyHandler?: (event: any) => void;
    cancelChangesHandler?: () => void;
}

export const ProductCardHeader = memo((props: ProductCardHeaderProps) => {
    const {
        readonly,
        readonlyHandler,
        cancelChangesHandler,
    } = props;

    if (!readonly) {
        return (
            <HStack max justify="end">
                <Button
                    variant="danger"
                    onClick={cancelChangesHandler}
                    type="button"
                >
                    Отставить
                </Button>
                <Button
                    variant="success"
                    type="submit"
                >
                    Сохранить
                </Button>
            </HStack>
        );
    }

    return (
        <HStack max justify="end">
            <Button
                style={{ marginLeft: 'auto' }}
                variant="warning"
                onClick={readonlyHandler}
                type="button"
            >
                Редактировать
            </Button>
        </HStack>
    );
});
