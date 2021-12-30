import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { GenericSection, Section } from '../components/Section'
import { layout, compositionOf, children, variants, rule } from '@cssfn/cssfn'
import { createUseSheet } from '@cssfn/react-cssfn'
import { siteVars } from '../website.config'
import { colors } from '@nodestrap/colors'
import { borders } from '@nodestrap/borders'
import { spacers } from '@nodestrap/spacers'
import { isScreenWidthAtLeast } from '@nodestrap/breakpoints'
import { cssProps as containerConfig } from '@nodestrap/container'
import { usesThemeVariant, OrientationName } from '@nodestrap/basic'
import { Form } from '@nodestrap/form'
import { EditableTextControl } from '@nodestrap/editable-text-control'
import { Email } from '@nodestrap/input'
import { Group } from '@nodestrap/group'
import { Label } from '@nodestrap/label'
import { ButtonIcon as Button } from '@nodestrap/button-icon'
import { ResponsiveProvider } from '@nodestrap/responsive'



const useSheet = createUseSheet(() => {
    const [, themeRefs] = usesThemeVariant();
    
    return [
        compositionOf('contact', [
            layout({
                ...children('&&', [
                    layout({
                        minBlockSize: `calc(${siteVars.viewportHeight} - ${siteVars.footerHeight})`,
                        display: 'grid',
                        gridTemplateColumns: [['1fr']],
                        gridTemplateRows: [['2fr', '1fr', '1fr']],
                        gridTemplateAreas: [[
                            '"illus"',
                            '"shared"',
                            '"content"',
                        ]],
                        justifyItems: 'center',
                        alignItems: 'center',

                        borderBlockStartWidth: borders.hair,
                        borderColor: themeRefs.backg,
            
                        ...children('.illustration', [
                            layout({
                                gridArea: 'illus/illus / content/content',

                                position: 'absolute', // do not taking space
                                // justifySelf: 'stretch',
                                // alignSelf: 'stretch',
                                // width: '100%',
                                // height: '100%',
                                inlineSize: `calc(100% + (2 * ${containerConfig.paddingInline}))`,
                                blockSize: `calc(100% + (2 * ${containerConfig.paddingBlock}))`,
                                objectFit: 'cover',
                                objectPosition: '50% 35%',

                            }),
                        ]),
                        ...children('article', [
                            layout({
                                gridArea: 'shared/shared / content/content',
                                alignSelf: 'end',

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
            
                                backgroundImage: [
                                    `linear-gradient(${(colors as any).primaryThinner}, ${(colors as any).primaryThinner})`,
                                    'linear-gradient(rgba(255,255,255, 0.2), rgba(255,255,255, 0.2))'
                                ],
                                border: `solid 1px ${colors.white}`,
                                backdropFilter: [['blur(10px)']],
                                filter: [[`drop-shadow(0px 0px 10px ${colors.primaryBold})`]],
            
                                paddingInline: containerConfig.paddingInline,
                                paddingBlock: containerConfig.paddingBlock,
            
                                // marginInline: `calc(0px - ${containerConfig.paddingInline})`,
                                // marginBlock: `calc(0px - ${containerConfig.paddingBlock})`,
                                // inlineSize: `calc(100% + (2 * ${containerConfig.paddingInline}))`
                                inlineSize: '100%',
                            }),
                        ]),
                    }),
                    variants([
                        isScreenWidthAtLeast('sm', [
                            layout({
                                // background: 'red',
                                gridTemplateColumns: [['1fr', '1fr', '1fr']],
                                gridTemplateRows: [['1fr']],
                                gridTemplateAreas: [[
                                    '"illus shared content"',
                                ]],
            
                                ...children('.illustration', [
                                    layout({
                                        gridArea: 'illus/illus / shared/shared',
                                    }),
                                ]),
                                ...children('article', [
                                    layout({
                                        gridArea: 'shared/shared / content/content',
                                    }),
                                ]),
                            })
                        ])
                    ]),
                ]),
            }),
        ]),
        compositionOf('form', [
            layout({
                ...children('&&', [
                    layout({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        gap: spacers.default,
                    }),
                ]),

                ...children('*', [
                    variants([
                        rule('.inline', [
                            layout({
                                ...children('*:first-child', [
                                    layout({
                                        flex: '0 0 auto',
                                        inlineSize: '10em',
                                        boxSizing: 'content-box',
                
                                        ...children('span', [
                                            layout({
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center',
                                            }),
                                        ]),
                                    }),
                                ]),
                            }),
                        ]),
                        rule('.block', [
                            layout({
                                ...children('*:first-child', [
                                    layout({
                                        flex: '0 0 auto',
                
                                        ...children('span', [
                                            layout({
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }),
                                        ]),
                                    }),
                                ]),
                            }),
                        ]),
                    ]),
                ]),

                ...children('button', [
                    layout({
                        alignSelf: 'end',
                        minInlineSize: '10em',
                    }),
                ]),
            }),
        ]),
    ];
}, /*sheetId :*/'home');



const Page : NextPage = () => {
    const sheet = useSheet();

    const [enableValidation, setEnableValidation] = useState(false);
    const handleSend = () => {
        setEnableValidation(true);
    }

    return (<>
        <Head>
            <title>Contact Me</title>
            <meta name="description" content="Contact Paulina (and/or her team)." />
        </Head>
        <GenericSection classes={[sheet.contact]} theme='primary' mild={true}>
            <img className='illustration' src='/images/hello.svg' alt='' />
            <article>
                <h1>
                    Contact Me
                </h1>
                <p className='lead'>
                    For buisness inquiry, <strong>please fell free</strong> to contact me.
                </p>
                <p className='lead'>
                    We can discus about your need later.
                </p>
            </article>
        </GenericSection>
        <Section title='Contact Form'>
            <ResponsiveProvider<OrientationName> fallbacks={['inline', 'block']}>{(fallback) => (
                <Form classes={[sheet.form]} enableValidation={enableValidation}>
                    <Group orientation={fallback}>
                        <Label>Your email</Label>
                        <Email required={true} />
                    </Group>
                    <Group orientation={fallback}>
                        <Label>Message</Label>
                        <EditableTextControl tag='textarea' required={true} minLength={30} />
                    </Group>
                    <Button onClick={handleSend} theme='primary'>
                        Send
                    </Button>
                </Form>
            )}
            </ResponsiveProvider>
        </Section>
    </>);
}
export default Page;
