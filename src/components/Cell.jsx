import { useState, useEffect } from 'react';
import { useLongPress } from '@uidotdev/usehooks';
import { useMediaQuery } from 'react-responsive';

import '../styles/cell.scss';

export default function Cell({ values, updateFlag, revealCell }) {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const [isDefused, setIsDefused] = useState(false);

    useEffect(() => {
        // Comprueba si la celda está desactivada
        setIsDefused(values.defused);
    }, [values.defused]);

    const handleClick = () => {
        if (!values.flagged) {
            revealCell(values.row, values.column)
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        if (!isMobile) {
            updateFlag(values.row, values.column);
        }
    };

    const handleLongClick = useLongPress(
        () => {
            if (isMobile) {
                updateFlag(values.row, values.column);
            }
        },
        { threshold: 700 }
    );

    const valueColorClassName = isDefused && values.surroundingMinesCount > 0 ? ` color-${values.surroundingMinesCount}` : '' ;
    const cellClasses = `cell${values.flagged ? ' is-flagged' : ''}${isDefused ? ' is-defused' : ''}${values.exploded ? ' has-mine' : ''}${valueColorClassName}`;

    return (
        <div
            className={cellClasses}
            onClick={handleClick}
            {...(isMobile ? handleLongClick : { onContextMenu: handleRightClick })}
        >
            {isDefused && values.surroundingMinesCount != 0 ? <>{values.surroundingMinesCount}</> : ''}
        </div>
    );
}
