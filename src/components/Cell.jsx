import { useState, useEffect } from 'react';
import { useLongPress } from '@uidotdev/usehooks';
import { useMediaQuery } from 'react-responsive';

import '../styles/cell.scss';

export default function Cell({ values, updateFlag, revealCell }) {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const [isFlagged, setIsFlagged] = useState(false);
    const [isDefused, setIsDefused] = useState(false);

    useEffect(() => {
        console.log("useEffect ejecutado");
        if (values.defused) {
            setIsDefused(true);
        } else {
            setIsDefused(false)
        }
    }, [values.defused]);

    const handleClick = () => {
        if (!values.flagged) {
            revealCell(values.row, values.column);
            setIsDefused(true);
        }
    };

    const cellClasses = "cell" + 
    (isDefused ? " is-empty" : '') +
    (isFlagged ? " is-flagged" : '')

    const handleRightClick = (e) => {
        e.preventDefault();
        if (!isMobile) {
            updateFlag(values.row, values.column);
            setIsFlagged((current) => !current);
        }
    };

    const handleLongClick = useLongPress(
        () => {
            if (isMobile) {
                updateFlag(values.row, values.column);
                setIsFlagged((current) => !current);
            }
        },
        { threshold: 700 }
    );

    return (
        <div
            className={cellClasses}
            onClick={handleClick}
            {...(isMobile ? handleLongClick : { onContextMenu: handleRightClick })}
        >
            {isFlagged ? <img /> : null}
        </div>
    );
}
