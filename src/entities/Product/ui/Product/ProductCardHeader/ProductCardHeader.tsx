import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import { Button } from 'react-bootstrap';

interface ProductCardHeaderProps {
    readonly?: boolean;
    readonlyHandler?: (event: any) => void;
    saveChangesHandler?: () => void;
    cancelChangesHandler?: () => void;
}

export const ProductCardHeader = memo((props: ProductCardHeaderProps) => {
    const {
        readonly,
        readonlyHandler,
        saveChangesHandler,
        cancelChangesHandler,
    } = props;

    return (
        <>
            {readonly
                ? (
                    <HStack max justify="end">
                        <Button
                            variant="warning"
                            onClick={readonlyHandler}
                            type="button"
                        >
                            Редактировать
                        </Button>
                    </HStack>
                )
                : (
                    <HStack max justify="end">
                        <Button
                            variant="success"
                            type="button"
                            onClick={saveChangesHandler}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="danger"
                            onClick={cancelChangesHandler}
                            type="button"
                        >
                            Отставить
                        </Button>
                    </HStack>
                )}
        </>
    );
});
