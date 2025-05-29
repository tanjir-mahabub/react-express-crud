'use client';
import { type ReactNode, useEffect, useRef, useState } from 'react';

type TooltipProps = {
    children: ReactNode;
    text: string;
    width?: string;
};

export default function Tooltip({ children, text, width = 'max-w-xs' }: TooltipProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (show && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top - 10,
                left: rect.left + rect.width / 2,
            });
        }
    }, [show]);

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className="inline-block"
            >
                {children}
            </div>

            {show && (
                <div
                    className={`fixed z-50 ${width}`}
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        transform: 'translate(-50%, -100%)',
                    }}
                >
                    <div className="relative bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg">
                        <div
                            className="absolute left-1/2 translate-x-[-50%] top-full w-2 h-2 bg-gray-800 rotate-45"
                            style={{ marginTop: '2px' }}
                        />
                        {text}
                    </div>
                </div>
            )}
        </>
    );
}
