import type { NextPage } from 'next'
import { GenericSection, Section, MainSection } from '../components/Section'
import { createSheet, globalDef, rules, rule, atRoot, fontFace, layout, vars, mainComposition, children } from '@cssfn/cssfn'
import { createUseSheet } from '@cssfn/react-cssfn'
import { siteVars } from '../components/config'
import { colors } from '@nodestrap/colors'
import { spacers } from '@nodestrap/spacers'
import { cssProps as containerConfig } from '@nodestrap/container'
import { Icon } from '@nodestrap/icon'



const useSheet = createUseSheet(() => [
    mainComposition([
        layout({
            ...children('&&', [
                layout({
                    minBlockSize: siteVars.viewportHeight,
                    boxSizing: 'border-box',
                    backgroundImage: [
                        `url("/images/paulina-beach-backg.svg")`,
                        `linear-gradient(20deg, ${colors.primaryThin}, ${colors.white})`
                    ] as any,
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 40%',
                    backgroundRepeat: 'no-repeat',
        
                    display: 'grid',
                    gridTemplateColumns: [['1fr', '1fr']],
                    gridTemplateRows: [['2fr', 'max-content', '2fr', '20px', '1fr']],
                    gridTemplateAreas: [[
                        '"....... ......."',
                        '"....... content"',
                        '"....... ......."',
                        '"footer   footer"',
                        '"footer   footer"',
                    ]],
                }),
            ]),

            ...children('article', [
                layout({
                    gridArea: 'content',

                    display: 'grid',
                    justifyContent: 'center',
                    alignContent: 'center',

                    background: (colors as any).primaryThinner,
                    border: `solid 1px ${colors.white}`,
                    backdropFilter: [['blur(5px)']],
                    filter: [[`drop-shadow(0px 0px 10px ${colors.primaryBold})`]],

                    paddingBlock: spacers.lg,
                    paddingInline: spacers.lg,
                    gap: spacers.default,

                    ...children('*', [
                        layout({
                            fontWeight: '700 !important',
                            margin: '0px !important',
                        }),
                    ]),
                }),
            ]),
            ...children('footer', [
                layout({
                    gridArea: 'footer',

                    borderBlockStart: `solid 1px ${colors.white}`,
                    background: `linear-gradient(0deg, ${colors.primary}, ${(colors as any).primaryThinner})`,
                    backdropFilter: [['blur(5px)']],

                    display: 'grid',
                    gridTemplateColumns: [['1fr', 'max-content', '1fr']],
                    gridTemplateRows: [['1fr']],
                    gridTemplateAreas: [[
                        '"left middle right"',
                    ]],

                    alignItems: 'center',

                    ...children('.scroller', [
                        layout({
                            gridArea: 'middle',
                            justifySelf: 'center',
                        }),
                    ]),
                    ...children('.message', [
                        layout({
                            gridArea: 'right',
                            justifySelf: 'start',
                            margin: '0px',
                            marginInlineStart: spacers.default,
                        }),
                    ]),
                }),
            ]),
        }),
    ]),
], /*sheetId :*/'home');



const Page : NextPage = () => {
    const sheet = useSheet();

    return (
        <GenericSection classes={[sheet.main]} theme='primary' mild={true}>
            <article>
                <p className='display-6'>
                    Hi, i'm Paulina
                </p>
                <h1 className='display-6'>
                    Singer, Model, Instagrammer
                </h1>
                <p>
                    I&apos;m from Russia. I&apos;ve been working as a <strong>Model</strong> for more than 3 years.
                    I&apos; ve worked as singer for ABC Company for 2 years.
                    Now I currently work as a model in Awesome Photography.
                </p>
                <p>
                    Endorsment offer is welcome. Please contact me for more information.
                </p>
            </article>
            <footer className='fill'>
                <Icon classes={['scroller']} icon='scroll-down' theme='light' size='lg' />
                <p className='message'>
                    scroll down to see more info about me 😋
                </p>
            </footer>
        </GenericSection>
    );
}
export default Page;