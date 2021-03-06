import { config as iconConfig } from '@nodestrap/icon'
import { createSheet, globalDef, rules, rule, atRoot, fontFace, layout, vars } from '@cssfn/cssfn'
import { createCssVar } from '@cssfn/css-var'
import { colors, defineTheme, defineForeg } from '@nodestrap/colors'
import Color from 'color'
import { cssProps as navbarConfig } from '@nodestrap/navbar'



interface SiteVars {
    windowHeight   : any
    headerHeight   : any
    footerHeight   : any
    viewportHeight : any
}
export const [siteVars, siteVarDecls] = createCssVar<SiteVars>({ minify: false });



createSheet(() => [
    globalDef([
        rule('*', [
            layout({
                boxSizing : 'border-box',
            }),
        ]),

        rule('html', [
            layout({
                blockSize: '100%',
            }),
        ]),
        rule(['html', 'body'], [
            layout({
                padding : '0px',
                margin  : '0px',
            }),
        ]),
        rule('body>*>header', [
            layout({
                zIndex          : 1020,
                position        : 'sticky',
                insetBlockStart : '0px',
            }),
        ]),

        rule('a', [
            layout({
                color          : 'inherit',
                textDecoration : 'none',
            }),
        ]),
        
        rule('.logo', [
            rules([
                fontFace([
                    layout({
                        fontFamily : '"Embassy"',
                        src        : [
                            'url("/fonts/Embassy W01 Regular.woff") format("woff")',
                            'url("/fonts/Embassy W01 Regular.ttf") format("truetype")'
                        ].join(','),
                    }),
                ]),
            ]),
            layout({
                fontFamily : '"Embassy"',
                fontSize   : '50px',
                overflow   : 'hidden', // fix to fontSize 51px on firefox
                lineHeight : 1,
                whiteSpace : 'nowrap',
            }),
        ]),

        atRoot([
            vars({
                [siteVarDecls.viewportHeight] : `calc(${siteVars.windowHeight} - ${siteVars.headerHeight})`,
            }),
        ]),
    ]),
])
.attach();



const primary = Color('#FE90C3');
defineTheme('primary', primary);

const secondary = primary.rotate(-30).darken(0.2);
defineTheme('secondary', secondary);

const textColor = Color('#491D31');
colors.dark = textColor as any;
colors.primaryText = textColor as any;
colors.primaryBold = textColor as any;
(colors as any).primaryThinner = primary.alpha(0.2) as any;
defineForeg(textColor);


iconConfig.img.files.push('paulina-logo.svg');
iconConfig.img.files.push('scroll-down.svg');


(navbarConfig as any).menuFontWeight = 400;
