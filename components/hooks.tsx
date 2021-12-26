import { useEffect, useRef, useState } from 'react'
import { StyleSheet, createSheet, globalDef, atRoot, vars } from '@cssfn/cssfn'
import type { Cust } from '@cssfn/css-types'



export const useOnResize = (callback: ResizeObserverCallback) => {
    const [elmRef, setElmRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!elmRef) return;


        const observer = new ResizeObserver(callback);
        observer.observe(elmRef);


        return () => {
            observer.disconnect();
        };
    }, [elmRef]);

    return [elmRef, setElmRef] as const;
}
export const useObserveHeight = (variable: Cust.Decl) => {
    const sheet = useRef<StyleSheet | null>(null);
    const [elmRef, setElmRef] = useOnResize(() => {
        if (!elmRef) return;

        sheet.current?.detach();
        sheet.current = createSheet(() => [
            globalDef([
                atRoot([
                    vars({
                        [variable]: `${elmRef.offsetHeight}px`,
                    }),
                ]),
            ]),
        ]);
        sheet.current.attach();
    });

    return setElmRef;
}