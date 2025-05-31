'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Tooltip from './Tooltip';

type TruncatedCellProps = {
    children: ReactNode;
    text: string;
    width?: string;
};

function TruncatedCell({ children, text, width = 'max-w-[250px]' }: TruncatedCellProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (el) {
            setIsTruncated(el.scrollWidth > el.clientWidth);
        }
    }, [text]);

    return isTruncated ? (
        <Tooltip text={text} width={width}>
            <div ref={ref} className="truncate max-w-[200px] cursor-pointer">
                {children}
            </div>
        </Tooltip>
    ) : (
        <div ref={ref} className="truncate max-w-[200px] cursor-pointer">
            {children}
        </div>
    );
}

export default TruncatedCell;
