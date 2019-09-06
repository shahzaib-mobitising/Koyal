import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footerMain">
            <Grid spacing={3} container>
                <Grid item xs={12} >
                    <div className="footerTopBar">
                        <div className="topbarItem">
                            <Link component={Link} to={`/explore/urdu-trend`}>Most Popular<span>|</span></Link>
                        </div>
                        <div className="topbarItem">
                            <Link component={Link} to={`/explore/urdu-artist`}>Featured Artist<span>|</span></Link>
                        </div>
                        <div className="topbarItem">
                            <Link component={Link} to={`/explore/urdu-islamic`}>Trending Songs<span>|</span></Link>
                        </div>
                        <div className="topbarItem">
                            <Link component={Link} to={`/explore/urdu-album`}>Top Album<span>|</span></Link>
                        </div>
                        <div className="topbarItem">
                            <Link component={Link} to={`/explore/urdu-new`}>New Releases</Link>
                        </div>
                    </div>
                    <div className="footerMiddleBar">
                        <div className="footerMiddleItem footer-column-1">
                            <h3>Top Artists</h3>
                            <p><Link component={Link} to={`/artist/3809/Wajid Ali Baghdadi`}>Wajid Ali Baghdadi</Link></p>
                            <p><Link component={Link} to={`/artist/2538/Nooran Lal`}>Noorah Lal</Link></p>
                            <p><Link component={Link} to={`/artist/4435/Gulaab`}>Gulaab</Link></p>
                            <p><Link component={Link} to={`/artist/3281/Shaman Ali Mirali`}>Shaman Ali Mirali</Link></p>
                            <p><Link component={Link} to={`/artist/992/Fozia Soomro`}>Fozia Somroo</Link></p>
                            <p><Link component={Link} to={`/artist/2724/Rahim Shah`}>Rahim Shah</Link></p>
                            <p><Link component={Link} to={`/artist/2297/Mushtaq Ahmed Cheena`}>Mushtaaq Ahmed Cheena</Link></p>
                            <p><Link component={Link} to={`/artist/2711/Rahat Fateh Ali Khan`}>Rahat Fateh Ali Khan </Link></p>
                            <p><Link component={Link} to={`/artist/101/Abida Parveen`}>Abida Parveen</Link></p>
                            <p><Link component={Link} to={`/artist/2410/Naseebo Lal`}>Naseebo Lal </Link></p>
                            <p><Link component={Link} to={`/artist/1106/Gul Panra`}>Gul Panra</Link></p>
                            <p><Link component={Link} to={`/artist/5681/Shehzadi Erum Siyal`}>Erum Siyal</Link></p>
                            <p><Link component={Link} to={`/artist/2473/Nazia Iqbal`}>Nazia Iqbal</Link></p>
                        </div>
                        <div className="footerMiddleItem footer-column-2">
                            <h3>Collection</h3>
                            <p><Link component={Link} to={`/collection/183/Urdu Romantic Songs`}>Urdu Romantic Songs</Link></p>
                            <p><Link component={Link} to={`/collection/195/Sindhi Folk Music`}>Sindhi Folk Music</Link></p>
                            <p><Link component={Link} to={`/collection/199/Best Of Nooran Lal`}>Best Of Noorah Lal</Link></p>
                            <p><Link component={Link} to={`/collection/185/Punjabi Romantic Songs`}>Punjabi Romantic Songs</Link></p>
                            <p><Link component={Link} to={`/collection/180/Best of Abida Parveen`}>Best Of Abida Parveen</Link></p>
                            <p><Link component={Link} to={`/collection/190/Best of Arif Lohar`}>Best Of Arif Lohar</Link></p>
                            <p><Link component={Link} to={`/pashto-songs`}>Juke Box Of Pashto Songs</Link></p>
                            <p><Link component={Link} to={`/collection/186/Pashto Romantic Songs`}>Pashto Romantic Songs</Link></p>
                        </div>
                        <div className="footerMiddleItem footer-column-3">
                            <h3>Genre</h3>
                            <p><Link component={Link} to={`/album/genre/Bhangra`}>Bhangra</Link></p>
                            <p><Link component={Link} to={`/album/genre/Classic`}>Classic</Link></p>
                            <p><Link component={Link} to={`/album/genre/Ghazal`}>Gazal</Link></p>
                            <p><Link component={Link} to={`/album/genre/Patriotic`}>Patriotic</Link></p>
                            <p><Link component={Link} to={`/album/genre/Romantic`}>Romantic</Link></p>
                            <p><Link component={Link} to={`/album/genre/Sufi`}>Sufi</Link></p>
                            <p><Link component={Link} to={`/album/genre/Pop`}>Pop</Link></p>
                            <p><Link component={Link} to={`/album/genre/Sad`}>Sad</Link></p>
                            <p><Link component={Link} to={`/album/genre/Dhamal`}>Dhamal</Link></p>
                            <p><Link component={Link} to={`/`}>Devotional</Link></p>
                            <p><Link component={Link} to={`/album/genre/Qawali`}>Qawali</Link></p>
                            <p><Link component={Link} to={`/album/genre/Qawali`}>Folk</Link></p>
                            <p><Link component={Link} to={`/`}>Rock</Link></p>


                        </div>
                        <div className="footerMiddleItem footer-column-4">
                            <h3>Legend</h3>
                            <p><Link component={Link} to={`/`}>Nusrat Fateh Ali Khan</Link></p>
                            <p><Link component={Link} to={`/artist/101/Abida Parveen`}>Abida Parveen</Link></p>
                            <p><Link component={Link} to={`/`}>Sabri Brothers</Link></p>
                            <p><Link component={Link} to={`/`}>Aziz Mian Qawwal</Link></p>
                            <p><Link component={Link} to={`/`}>Alamgir</Link></p>
                            <p><Link component={Link} to={`/artist/5220/Sher Miandad Khan`}>Sher Miandad Khan</Link></p>
                            <p><Link component={Link} to={`/artist/2711/Rahat Fateh Ali Khan`}>Rahat Fateh Ali Khan</Link></p>
                            <p><Link component={Link} to={`/`}>Tahseen Jawed</Link></p>
                            <p><Link component={Link} to={`/artist/565/Attaullah Khan Essa Khelvi`}>Attaullah Khan Esakhelvi</Link></p>
                            <p><Link component={Link} to={`/artist/2538/Nooran Lal`}>Naseebo Lal</Link></p>
                            <p><Link component={Link} to={`/`}>Mehdi Hassan</Link></p>
                            <p><Link component={Link} to={`/`}>Noor Jahan</Link></p>
                            <p><Link component={Link} to={`/artist/1323/Humaira Channa`}>Humera Channa</Link></p>
                        </div>
                        <div className="footerMiddleItem footer-column-5">
                            <h3>Devotional</h3>
                            <p><Link component={Link} to={`/`}>Khursheed Ahmed</Link></p>
                            <p><Link component={Link} to={`/`}>Fasihuddin Soharwardy</Link></p>
                            <p><Link component={Link} to={`/`}>Umme Habiba</Link></p>
                            <p><Link component={Link} to={`/`}>Qadri Waheed Zafar</Link></p>
                            <p><Link component={Link} to={`/`}>Zafar Iqbal</Link></p>
                            <p><Link component={Link} to={`/`}>Alhaaj Owais Raza Qadri</Link></p>
                            <p><Link component={Link} to={`/`}>Alhaaj Tahir Qadri</Link></p>
                            <p><Link component={Link} to={`/`}>Junaid Jamsheed</Link></p>
                            <p><Link component={Link} to={`/`}>Tariq Jameel</Link></p>
                            <p><Link component={Link} to={`/`}>Amjad Sabri</Link></p>
                            <p><Link component={Link} to={`/`}>Ghous Muhammad Nasir Qawwal</Link></p>
                            <p><Link component={Link} to={`/`}>Hafiz Nisar Ahmed Marfani</Link></p>
                        </div>
                    </div>
                    <div className="footerBottomBar">
                        <div className="followUsBox">
                            <p className="folowItem">Follow Us On</p>
                            <Link className="folowItem" component={Link} to={`/`}>
                                <img src="/assets/fb.svg" alt='facebook' />
                            </Link>
                            <Link className="folowItem" component={Link} to={`/`}>
                                <img src="/assets/insta.svg" alt='Instagaram' />
                            </Link>
                            <Link className="folowItem" component={Link} to={`/`}>
                                <img src="/assets/linkedin.svg" alt='linkdin' />
                            </Link>
                            <Link className="folowItem" component={Link} to={`/`}>
                                <img src="/assets/twitter.svg" alt='twitter' />
                            </Link>
                            <Link className="folowItem" component={Link} to={`/`}>
                                <img src="/assets/youtube.svg" alt='youtube' />
                            </Link>
                        </div>
                        <div className="copyright">
                            <h3>Powered by MobiTising</h3>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
