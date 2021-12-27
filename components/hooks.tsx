import { useRef, useState } from 'react'
import { StyleSheet, createSheet, globalDef, atRoot, vars } from '@cssfn/cssfn'
import type { Cust } from '@cssfn/css-types'
import { useIsomorphicLayoutEffect } from '@nodestrap/hooks'



export type BoxOptions = 'border-box' | 'content-box'
export interface SizeOptions {
    box: BoxOptions
}
const defaultElementSizeOptions : SizeOptions = { box: 'border-box'  };
const defaultWindowSizeOptions  : SizeOptions = { box: 'content-box' };



export type OnElementResizeCallback = (elm: HTMLElement) => void
export const useElementOnResize = (callback: OnElementResizeCallback, options = defaultElementSizeOptions) => {
    const [elmRef, setElmRef] = useState<HTMLElement | null>(null);
    
    
    
    useIsomorphicLayoutEffect(() => {
        if (!elmRef) return;
        
        
        
        // handlers:
        const handleResize = () => {
            callback(elmRef);
        }
        
        
        
        // setups:
        const observer = new ResizeObserver(handleResize);
        observer.observe(elmRef, options);
        
        
        
        // cleanups:
        return () => {
            observer.disconnect();
        };
    }, [elmRef]);
    
    
    
    return setElmRef;
}

export const useElementSize = (options = defaultElementSizeOptions) => {
    const borderBox = (options.box === 'border-box');
    
    const [elmWidth,  setElmWidth ] = useState<number|null>(null);
    const [elmHeight, setElmHeight] = useState<number|null>(null);
    
    
    
    const setElmRef = useElementOnResize((elm) => {
        setElmWidth(borderBox  ? elm.offsetWidth  : elm.clientWidth);
        setElmHeight(borderBox ? elm.offsetHeight : elm.clientHeight);
    }, options);
    
    
    
    return [elmWidth, elmHeight, setElmRef] as const;
}

export interface CssSizeOptions extends Partial<SizeOptions> {
    varWidth  ?: Cust.Decl
    varHeight ?: Cust.Decl
}
export const useElementCssSize = (options: CssSizeOptions) => {
    const [elmWidth, elmHeight, setElmRef] = useElementSize({...defaultElementSizeOptions, ...options});
    
    
    
    const { varWidth, varHeight } = options;
    const sheetWidth  = useRef<StyleSheet | null>(null);
    const sheetHeight = useRef<StyleSheet | null>(null);
    
    useIsomorphicLayoutEffect(() => {
        if (elmWidth === null) return;
        if (!varWidth) return;
        
        
        
        // setups:
        sheetWidth.current = createSheet(() => [
            globalDef([
                atRoot([
                    vars({
                        [varWidth]: `${elmWidth}px`,
                    }),
                ]),
            ]),
        ]);
        
        
        
        // cleanups:
        return () => {
            sheetWidth.current?.detach();
        };
    }, [elmWidth]);
    
    useIsomorphicLayoutEffect(() => {
        if (elmHeight === null) return;
        if (!varHeight) return;
        
        
        
        // setups:
        sheetHeight.current = createSheet(() => [
            globalDef([
                atRoot([
                    vars({
                        [varHeight]: `${elmHeight}px`,
                    }),
                ]),
            ]),
        ])
        .attach()
        ;
        
        
        
        // cleanups:
        return () => {
            sheetHeight.current?.detach();
        };
    }, [elmHeight]);
    
    
    
    return setElmRef;
}



export type OnWindowResizeCallback = (window: Window) => void
export const useWindowOnResize = (callback: OnWindowResizeCallback) => {
    useIsomorphicLayoutEffect(() => {
        if (typeof(window) === 'undefined') return;
        
        
        
        // handlers:
        const handleResize = () => {
            callback(window);
        };
        
        
        
        // setups:
        window.addEventListener('resize', handleResize);
        
        
        
        // cleanups:
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
}

export const useWindowSize = (options = defaultWindowSizeOptions) => {
    const borderBox = (options.box === 'border-box');
    
    const [windowWidth,  setWindowWidth ] = useState<number|null>(() => {
        if (typeof(window) === 'undefined') return null;
        return (borderBox  ? window.outerWidth  : window.innerWidth);
    });
    const [windowHeight, setWindowHeight] = useState<number|null>(() => {
        if (typeof(window) === 'undefined') return null;
        return (borderBox  ? window.outerHeight  : window.innerHeight);
    });
    
    
    
    useWindowOnResize((window) => {
        setWindowWidth(borderBox  ? window.outerWidth  : window.innerWidth);
        setWindowHeight(borderBox ? window.outerHeight : window.innerHeight);
    });
    
    
    
    return [windowWidth, windowHeight] as const;
}

export const useWindowCssSize = (options: CssSizeOptions) => {
    const [windowWidth, windowHeight] = useWindowSize({...defaultWindowSizeOptions, ...options});
    
    
    
    const { varWidth, varHeight } = options;
    const sheetWidth  = useRef<StyleSheet | null>(null);
    const sheetHeight = useRef<StyleSheet | null>(null);
    
    useIsomorphicLayoutEffect(() => {
        if (windowWidth === null) return;
        if (!varWidth) return;
        
        
        
        // setups:
        sheetWidth.current = createSheet(() => [
            globalDef([
                atRoot([
                    vars({
                        [varWidth]: `${windowWidth}px`,
                    }),
                ]),
            ]),
        ]);
        
        
        
        // cleanups:
        return () => {
            sheetWidth.current?.detach();
        };
    }, [windowWidth]);
    
    useIsomorphicLayoutEffect(() => {
        if (windowHeight === null) return;
        if (!varHeight) return;
        
        
        
        // setups:
        sheetHeight.current = createSheet(() => [
            globalDef([
                atRoot([
                    vars({
                        [varHeight]: `${windowHeight}px`,
                    }),
                ]),
            ]),
        ])
        .attach()
        ;
        
        
        
        // cleanups:
        return () => {
            sheetHeight.current?.detach();
        };
    }, [windowHeight]);
}