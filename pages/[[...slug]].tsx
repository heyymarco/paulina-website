import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { Navbar, NavbarMenu } from '@nodestrap/navbar'
import { Link } from '@nodestrap/react-router-link'
import { useRouter } from 'next/router'
import { siteVarDecls } from '../website.config'
import Home from '../routes/Home'
import Gallery from '../routes/Gallery'
import UnderConstruct from '../routes/UnderConstruct'
import Contact from '../routes/Contact'
import NotFound from '../routes/404'
import { Section } from '../components/Section'
import { useElementCssSize, UseWindowCssSize } from '@nodestrap/dimensions'



const isServer = (typeof window === 'undefined');
const IsomorphicRouter = isServer ? StaticRouter : BrowserRouter;



function Header() {
    const setHeaderRef = useElementCssSize({ varHeight: siteVarDecls.headerHeight });
    
    
    
    return (
        <header ref={setHeaderRef}>
            <Navbar
                theme='primary'
                logo={<NavbarMenu classes={['logo']}><Link to='/'>Paulina</Link></NavbarMenu>}
            >
                <NavbarMenu><Link to='/'>Home</Link></NavbarMenu>
                <NavbarMenu><Link to='/gallery'>Gallery</Link></NavbarMenu>
                <NavbarMenu><Link to='/about'>About</Link></NavbarMenu>
                <NavbarMenu><Link to='/contact'>Contact Me</Link></NavbarMenu>
                <NavbarMenu href='https://www.instagram.com/shpakovskayapolya' target='_blank'>Instagram</NavbarMenu>
            </Navbar>
        </header>
    );
}

function Footer() {
    const setFooterRef = useElementCssSize({ varHeight: siteVarDecls.footerHeight });
    
    
    
    return (
        <footer ref={setFooterRef}>
            <Section theme='primary' mild={false}>
                <p>
                    © Copyright 2022 Paulina
                </p>
            </Section>
        </footer>
    );
}



export default (function Page(props) {
    const router = useRouter();
    const location = isServer ? ['', ...[router?.query?.slug ?? ['']].flat()].join('/') : window.location.pathname;
    // console.log('server', isServer, router, props, location);



    return (
        <IsomorphicRouter location={location}>
            <UseWindowCssSize options={{ varHeight: siteVarDecls.windowHeight }} />

            <Head>
                <title>Paulina&apos;s Website</title>
                <meta name="description" content="See about Paulina&apos;s bio." />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Header />

            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/gallery' element={<Gallery />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/about' element={<UnderConstruct />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
            
            <Footer />
        </IsomorphicRouter>
    )
} as NextPage)

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: [''] } },
            { params: { slug: ['home'] } },
            { params: { slug: ['gallery'] } },
            { params: { slug: ['about'] } },
            { params: { slug: ['contact'] } },
        ],
        fallback: false,
    };
}
export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {}, // will be passed to the page component as props
    }
}
