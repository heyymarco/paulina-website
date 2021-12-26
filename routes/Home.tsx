import type { NextPage } from 'next'
import { GenericSection, Section, MainSection, SubSection } from '../components/Section'
import { createSheet, globalDef, rules, rule, atRoot, fontFace, layout, vars, compositionOf, children, variants, descendants } from '@cssfn/cssfn'
import { createUseSheet } from '@cssfn/react-cssfn'
import { siteVars } from '../components/config'
import { colors } from '@nodestrap/colors'
import { spacers } from '@nodestrap/spacers'
import { Carousel } from '@nodestrap/carousel'
import { Masonry } from '@nodestrap/masonry'
import { isScreenWidthSmallerThan, isScreenWidthAtLeast } from '@nodestrap/breakpoints'
import { cssProps as containerConfig } from '@nodestrap/container'
import { Icon } from '@nodestrap/icon'
import { ButtonIcon as Button } from '@nodestrap/button-icon'
import gens from '@nodestrap/typos'
import { Link } from '@nodestrap/react-router-link'



const useSheet = createUseSheet(() => [
    compositionOf('hero', [
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
                    gridTemplateRows: [['2fr', 'max-content', '2fr', '20px', 'auto']],
                    gridTemplateAreas: [[
                        '"....... ......."',
                        '"....... content"',
                        '"....... ......."',
                        '"footer   footer"',
                        '"footer   footer"',
                    ]],
                }),
                variants([
                    isScreenWidthSmallerThan('sm', [
                        layout({
                            // backgroundColor: 'red',
                            // gridTemplateColumns: [['2fr', '5fr']],
                        }),
                    ]),
                    isScreenWidthSmallerThan('sm', [
                        layout({
                            // backgroundColor: 'red',
                            gridTemplateColumns: [['2fr', '5fr']],
                        }),
                    ]),
                ]),
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
                    marginBlockEnd: spacers.default,

                    ...children('*', [
                        layout({
                            fontWeight: '700 !important',
                            margin: '0px !important',
                        }),
                    ]),
                    ...children('.display', [
                        layout({
                            fontSize: [['calc(', 2.5, '*', gens.fontSize, ')']],
                        }),
                        variants([
                            isScreenWidthSmallerThan('md', [
                                layout({
                                    // color: 'blue',
                                    fontSize: [['calc(', 1.75, '*', gens.fontSize, ')']],
                                }),
                            ]),
                        ]),
                        variants([
                            isScreenWidthSmallerThan('sm', [
                                layout({
                                    // color: 'red',
                                    fontSize: [['calc(', 1.25, '*', gens.fontSize, ')']],
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
            ...children('footer', [
                layout({
                    gridArea: 'footer',

                    borderBlockStart: `solid 1px ${colors.white}`,
                    backgroundImage: [
                        `linear-gradient(0deg, ${colors.primary}, ${(colors as any).primaryThinner})`,
                    ],
                    backdropFilter: [['blur(5px)']],

                    display: 'grid',
                    gridTemplateColumns: [['1fr', 'max-content', '1fr']],
                    gridTemplateRows: [['1fr']],
                    gridTemplateAreas: [[
                        '"left middle right"',
                    ]],

                    padding: '0.5em',

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
    compositionOf('gallery', [
        layout({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacers.default,

            ...descendants('.thumb', [
                layout({
                    width: '300px',
                    // height: '300px',
                    aspectRatio: 1.33,
                    flex: [[0, 1, 'auto']],
                }),
            ]),
        }),
    ]),
    compositionOf('endorsement', [
        layout({
            ...children('&&', [
                layout({
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
                                // 'linear-gradient(rgba(255,255,255, 0.3), rgba(255,255,255, 0.3))'
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
        
                            
                            ...children('.contact-btn', [
                                layout({
                                    alignSelf: 'end',
                                }),
                            ]),
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
], /*sheetId :*/'home');



const Page : NextPage = () => {
    const sheet = useSheet();

    return (<>
        <GenericSection classes={[sheet.hero]} theme='primary' mild={true}>
            <article>
                <p className='display display-6'>
                    Hi, i'm Paulina
                </p>
                <h1 className='display display-6'>
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
        <Section title='My Song Albums' theme='primary' mild={true}>
            <p>
                Here some album I&apos;ve created. Not so much because I&apos;m a young singer.
            </p>
            <SubSection title='The Best Damn Thing'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem similique delectus corporis consequuntur amet deserunt, commodi eveniet blanditiis laborum labore facere inventore perspiciatis mollitia impedit earum id nobis error! Possimus.
                </p>
                <div className={sheet.gallery}>
                    <Carousel classes={['thumb']} infiniteLoop={true}>
                        <img src='https://picsum.photos/400/300?random=45' alt='' />
                        <img src='https://picsum.photos/400/300?random=53' alt='' />
                        <img src='https://picsum.photos/400/300?random=75' alt='' />
                        <img src='https://picsum.photos/400/300?random=22' alt='' />
                        <img src='https://picsum.photos/400/300?random=78' alt='' />
                    </Carousel>
                    <Carousel classes={['thumb']} infiniteLoop={true}>
                        <img src='https://picsum.photos/400/300?random=gg' alt='' />
                        <img src='https://picsum.photos/400/300?random=sf' alt='' />
                        <img src='https://picsum.photos/400/300?random=fd' alt='' />
                        <img src='https://picsum.photos/400/300?random=gh' alt='' />
                        <img src='https://picsum.photos/400/300?random=sf' alt='' />
                    </Carousel>
                    <Carousel classes={['thumb']} infiniteLoop={true}>
                        <img src='https://picsum.photos/400/300?random=fe' alt='' />
                        <img src='https://picsum.photos/400/300?random=ys' alt='' />
                        <img src='https://picsum.photos/400/300?random=fj' alt='' />
                        <img src='https://picsum.photos/400/300?random=cr' alt='' />
                        <img src='https://picsum.photos/400/300?random=rg' alt='' />
                    </Carousel>
                </div>
            </SubSection>
            <SubSection title='You&apos;re Crazy'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem similique delectus corporis consequuntur amet deserunt, commodi eveniet blanditiis laborum labore facere inventore perspiciatis mollitia impedit earum id nobis error! Possimus.
                </p>
                <div className={sheet.gallery}>
                    <Carousel classes={['thumb']} infiniteLoop={true}>
                        <img src='https://picsum.photos/400/300?random=jd' alt='' />
                        <img src='https://picsum.photos/400/300?random=hd' alt='' />
                        <img src='https://picsum.photos/400/300?random=jf' alt='' />
                        <img src='https://picsum.photos/400/300?random=sg' alt='' />
                        <img src='https://picsum.photos/400/300?random=hf' alt='' />
                    </Carousel>
                    <Carousel classes={['thumb']} infiniteLoop={true}>
                        <img src='https://picsum.photos/400/300?random=eb' alt='' />
                        <img src='https://picsum.photos/400/300?random=fs' alt='' />
                        <img src='https://picsum.photos/400/300?random=vs' alt='' />
                        <img src='https://picsum.photos/400/300?random=kt' alt='' />
                        <img src='https://picsum.photos/400/300?random=dc' alt='' />
                    </Carousel>
                    <Carousel classes={['thumb']} infiniteLoop={true}>
                        <img src='https://picsum.photos/400/300?random=eg' alt='' />
                        <img src='https://picsum.photos/400/300?random=sb' alt='' />
                        <img src='https://picsum.photos/400/300?random=ef' alt='' />
                        <img src='https://picsum.photos/400/300?random=wc' alt='' />
                        <img src='https://picsum.photos/400/300?random=cw' alt='' />
                    </Carousel>
                </div>
            </SubSection>
        </Section>
        <GenericSection classes={[sheet.endorsement]} theme='secondary' mild={true}>
            <img className='illustration' src='/images/endorsement.svg' alt='' />
            <article>
                <h2>Endorsement</h2>
                <p className='lead'>
                    Need a model for promoting your products?
                </p>
                <p>
                    Maybe I can help. Please contact me for booking.
                </p>
                <hr />
                <Button classes={['contact-btn']} icon='contact_mail' theme='primary'>
                    <Link to='/contact'>Contact Me</Link>
                </Button>
            </article>
        </GenericSection>
        <Section title='Booking for Live Concert' theme='primary' mild={true}>
            <p className='lead'>
                Wanna to create live concert with me as a singer?
            </p>
            <p>
                Sure! We can collaborate with you &amp; team.
            </p>
        </Section>
    </>);
}
export default Page;