import './globals.css'
import type { AppProps } from 'next/app'
import { Icon, config as iconConfig } from '@nodestrap/icon'
import { createSheet, globalDef, composition, rule, rules, fontFace, layout, atRoot, vars } from '@cssfn/cssfn'
import { createCssVar } from '@cssfn/css-var'
import { defineTheme } from '@nodestrap/colors'
import { useEffect } from 'react'



interface SiteVars {
    bodyHeight   : any
    headerHeight : any
    footerHeight : any
}
export const [siteVars, siteVarDecls] = createCssVar<SiteVars>({ minify: false });



createSheet(() => [
    globalDef([
        rule('.logo', [
            rules([
                fontFace([
                    layout({
                        fontFamily : '"Embassy"',
                        src : 'url("/fonts/Embassy W01 Regular.woff") format("woff"), url("/fonts/Embassy W01 Regular.ttf") format("truetype")',
                    }),
                ]),
            ]),
            layout({
                fontFamily : '"Embassy"',
                fontSize   : '50px',
                lineHeight : 1,
                whiteSpace : 'nowrap',
            }),
        ]),
        rule('body>*>header', [
            layout({
                zIndex: 1020,
                position: 'sticky',
                insetBlockStart: '0px',
            }),
        ]),
    ]),
])
.attach();



defineTheme('primary', '#FE90C3')


iconConfig.img.files.push('paulina-logo.svg');



function MyApp({ Component, pageProps }: AppProps) {
    



    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp
