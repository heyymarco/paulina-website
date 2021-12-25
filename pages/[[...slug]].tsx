import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { Navbar, NavbarMenu } from '@nodestrap/navbar'
import { Link } from '@nodestrap/react-router-link'
import { Icon, config as iconConfig } from '@nodestrap/icon'
import { useRouter } from 'next/router'
import { Container } from '@nodestrap/container'
import Home from '../routes/Home'
import NotFound from '../routes/404'
import { StyleSheet, createSheet, globalDef, composition, rule, rules, fontFace, layout, atRoot, vars } from '@cssfn/cssfn'
import { siteVarDecls } from './_app'
import type { Cust } from '@cssfn/css-types'



const isServer = (typeof window === 'undefined');
const IsomorphicRouter = isServer ? StaticRouter : BrowserRouter;



iconConfig.img.files.push('paulina-logo.svg');


const useOnResize = (callback: ResizeObserverCallback) => {
    const [elmRef, setElmRef] = useState<HTMLElement|null>(null);

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
const useObserveHeight = (variable: Cust.Decl) => {
    const sheet = useRef<StyleSheet|null>(null);
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



export default (function Page() {
    const router = useRouter();
    
    
    const setHeaderRef = useObserveHeight(siteVarDecls.headerHeight);
    const setFooterRef = useObserveHeight(siteVarDecls.footerHeight);
    const setBodyRef   = useObserveHeight(siteVarDecls.bodyHeight);
    useEffect(() => {
        setBodyRef(window.document.documentElement)
    }, []);
    
    
    
    return (
        <IsomorphicRouter location={router.pathname}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header ref={setHeaderRef}>
                <Navbar
                    theme='primary'
                    logo={<NavbarMenu classes={['logo']}><Link to='/'>Paulina</Link></NavbarMenu>}
                >
                    <NavbarMenu><Link to='/'>Home</Link></NavbarMenu>
                    <NavbarMenu><Link to='/gallery'>Gallery</Link></NavbarMenu>
                    <NavbarMenu><Link to='/about'>About</Link></NavbarMenu>
                    <NavbarMenu><Link to='/contact'>Contact Us</Link></NavbarMenu>
                    <NavbarMenu href='https://www.instagram.com/shpakovskayapolya' target='_blank'>Instagram</NavbarMenu>
                </Navbar>
            </header>

            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>

            <Container elmRef={setFooterRef} tag='footer' theme='primary' mild={false}>
                <h3 className='h5'>Support Us</h3>
            </Container>
        </IsomorphicRouter>
    )
} as NextPage)