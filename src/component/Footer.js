import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

function ToSeoUrl(url) {

    // make the url lowercase         
    var encodedUrl = url.toString().toLowerCase();

    // replace & with and           
    encodedUrl = encodedUrl.split(/\&+/).join("-and-")

    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('-');

    return encodedUrl;
}

function Footer() {
    return (
        <div className="footerMain">
            <Grid spacing={3} container>
                <Grid item xs={12} >
                    <div className="footerTopBar">
                        {/* <div className="topbarItem">
                            <Link to={`/explore/trend/urdu`}>Most Popular<span>|</span></Link>
                        </div>
                        <div className="topbarItem">
                            <Link to={`/explore/artist/urdu`}>Featured Artist<span>|</span></Link>
                        </div>
                        <div className="topbarItem">
                            <Link to={`/explore/urdu-islamic`}>Trending Songs<span>|</span></Link>
                        </div>
                        <div className="topbarItem">
                            <Link to={`/explore/urdu-album`}>Top Album<span>|</span></Link>
                        </div>
                        <div className="topbarItem">
                            <Link to={`/explore/urdu-new`}>New Releases</Link>
                        </div> */}
                    </div>
                    <div className="footerMiddleBar">
                        <div className="footerMiddleItem footer-column-1">
                            <h3>Top Artists</h3>
                            <p><Link to={`/artist/3809/Wajid Ali Baghdadi`}>Wajid Ali Baghdadi</Link></p>
                            <p><Link to={`/artist/2538/Nooran Lal`}>Noorah Lal</Link></p>
                            <p><Link to={`/artist/4435/Gulaab`}>Gulaab</Link></p>
                            <p><Link to={`/artist/3281/Shaman Ali Mirali`}>Shaman Ali Mirali</Link></p>
                            <p><Link to={`/artist/992/Fozia Soomro`}>Fozia Somroo</Link></p>
                            <p><Link to={`/artist/2724/Rahim Shah`}>Rahim Shah</Link></p>
                            <p><Link to={`/artist/2297/Mushtaq Ahmed Cheena`}>Mushtaaq Ahmed Cheena</Link></p>
                            <p><Link to={`/artist/2711/Rahat Fateh Ali Khan`}>Rahat Fateh Ali Khan </Link></p>
                            <p><Link to={`/artist/101/Abida Parveen`}>Abida Parveen</Link></p>
                            <p><Link to={`/artist/2410/Naseebo Lal`}>Naseebo Lal </Link></p>
                            <p><Link to={`/artist/1106/Gul Panra`}>Gul Panra</Link></p>
                            <p><Link to={`/artist/5681/Shehzadi Erum Siyal`}>Erum Siyal</Link></p>
                            <p><Link to={`/artist/2473/Nazia Iqbal`}>Nazia Iqbal</Link></p>
                        </div>
                        <div className="footerMiddleItem footer-column-2">
                            <h3>Collection</h3>
                            <p><Link to={`/collection/183/` + ToSeoUrl('Urdu Romantic Songs')}>Urdu Romantic Songs</Link></p>
                            <p><Link to={`/collection/195/` + ToSeoUrl('Sindhi Folk Music')}>Sindhi Folk Music</Link></p>
                            <p><Link to={`/collection/199/` + ToSeoUrl('Best Of Nooran Lal')}>Best Of Noorah Lal</Link></p>
                            <p><Link to={`/collection/185/` + ToSeoUrl('Punjabi Romantic Songs')}>Punjabi Romantic Songs</Link></p>
                            <p><Link to={`/collection/180/` + ToSeoUrl('Best Of Abida Parveen')}>Best Of Abida Parveen</Link></p>
                            <p><Link to={`/collection/190/` + ToSeoUrl('Best Of Arif Lohar')}>Best Of Arif Lohar</Link></p>
                            <p><Link to={`/collection/186/` + ToSeoUrl('Pashto Romantic Songs')}>Pashto Romantic Songs</Link></p>
                        </div>
                        <div className="footerMiddleItem footer-column-3">
                            <h3>Genre</h3>
                            <p><Link to={`/album/genre/bhangra`}>Bhangra</Link></p>
                            <p><Link to={`/album/genre/classic`}>Classic</Link></p>
                            <p><Link to={`/album/genre/ghazal`}>Ghazal</Link></p>
                            <p><Link to={`/album/genre/patriotic`}>Patriotic</Link></p>
                            <p><Link to={`/album/genre/romantic`}>Romantic</Link></p>
                            <p><Link to={`/album/genre/sufi`}>Sufi</Link></p>
                            <p><Link to={`/album/genre/pop`}>Pop</Link></p>
                            <p><Link to={`/album/genre/sad`}>Sad</Link></p>
                            <p><Link to={`/album/genre/dhamal`}>Dhamal</Link></p>
                            {/* <p><Link to={`/`}>Devotional</Link></p> */}
                            <p><Link to={`/album/genre/qawali`}>Qawali</Link></p>
                            {/* <p><Link to={`/album/genre/qawali`}>Folk</Link></p>
                            <p><Link to={`/`}>Rock</Link></p> */}


                        </div>
                        <div className="footerMiddleItem footer-column-4">
                            <h3>Legend</h3>
                            <p><Link to={`/artist/2548/` + ToSeoUrl('Nusrat Fateh Ali Khan')}>Nusrat Fateh Ali Khan</Link></p>
                            <p><Link to={`/artist/101/` + ToSeoUrl('Abida Parveen')}>Abida Parveen</Link></p>
                            <p><Link to={`/artist/6257/` + ToSeoUrl('Haji Ghulam Fareed Sabri')}>Haji Ghulam Fareed Sabri</Link></p>
                            <p><Link to={`/artist/5171/` + ToSeoUrl('Aziz Mian Qawwal')}>Aziz Mian Qawwal</Link></p>
                            <p><Link to={`/artist/5979/` + ToSeoUrl('Alamgir')}>Alamgir</Link></p>
                            <p><Link to={`/artist/5220/` + ToSeoUrl('Sher Miandad Khan')}>Sher Miandad Khan</Link></p>
                            <p><Link to={`/artist/2711/` + ToSeoUrl('Rahat Fateh Ali Khan')}>Rahat Fateh Ali Khan</Link></p>
                            <p><Link to={`/artist/5540/` + ToSeoUrl('Tahseen Jawed')}>Tahseen Jawed</Link></p>
                            <p><Link to={`/artist/565/` + ToSeoUrl('Attaullah Khan Esakhelvi')}>Attaullah Khan Esakhelvi</Link></p>
                            <p><Link to={`/artist/2410/` + ToSeoUrl('Naseebo Lal')}>Naseebo Lal</Link></p>
                            <p><Link to={`/artist/1989/` + ToSeoUrl('Mehdi Hassan')}>Mehdi Hassan</Link></p>
                            <p><Link to={`/artist/2522/` + ToSeoUrl('Noor Jahan')}>Noor Jahan</Link></p>
                            <p><Link to={`/artist/1323/` + ToSeoUrl('Humera Channa')}>Humera Channa</Link></p>
                        </div>
                        <div className="footerMiddleItem footer-column-5">
                            <h3>Devotional</h3>
                            <p><Link to={`/artist/4537/` + ToSeoUrl('Alhaaj Khursheed Ahmed')}>Alhaaj Khursheed Ahmed</Link></p>
                            <p><Link to={`/artist/6830/` + ToSeoUrl('Fasihuddin Soharwardy')}>Fasihuddin Soharwardy</Link></p>
                            <p><Link to={`/artist/3736/` + ToSeoUrl('Umme Habiba')}>Umme Habiba</Link></p>
                            {/* <p><Link to={`/artist/2663/` + ToSeoUrl('Qadri Waheed Zafar')}>Qadri Waheed Zafar</Link></p> */}
                            <p><Link to={`/artist/2663/` + ToSeoUrl('Qari Waheed Zafar Qasmi')}>Qari Waheed Zafar Qasmi  </Link></p>
                            <p><Link to={`/artist/244/` + ToSeoUrl('Owais Raza Qadri')}>Owais Raza Qadri</Link></p>
                            <p><Link to={`/artist/1189/` + ToSeoUrl('Hafiz Tahir Qadri')}>Hafiz Tahir Qadri</Link></p>
                            <p><Link to={`/artist/1588/` + ToSeoUrl('Junaid Jamsheed')}>Junaid Jamsheed</Link></p>
                            <p><Link to={`/artist/3674/` + ToSeoUrl('Tariq Jameel')}>Tariq Jameel</Link></p>
                            <p><Link to={`/artist/388/` + ToSeoUrl('Amjad Sabri')}>Amjad Sabri</Link></p>
                            <p><Link to={`/artist/6339/` + ToSeoUrl('Ghous Muhammad Nasir Qawwal')}>Ghous Muhammad Nasir Qawwal</Link></p>
                            <p><Link to={`/artist/5962/` + ToSeoUrl('Hafiz Nisar Ahmed Marfani')}>Hafiz Nisar Ahmed Marfani</Link></p>
                        </div>
                    </div>
                    <div className="footerBottomBar">
                        <div className="followUsBox">
                            <p className="folowItem">Follow Us On</p>
                            <Link className="folowItem" to={`/`}>
                                <img src="/assets/fb.svg" alt='facebook' />
                            </Link>
                            <Link className="folowItem" to={`/`}>
                                <img src="/assets/insta.svg" alt='Instagaram' />
                            </Link>
                            <Link className="folowItem" to={`/`}>
                                <img src="/assets/linkedin.svg" alt='linkdin' />
                            </Link>
                            <Link className="folowItem" to={`/`}>
                                <img src="/assets/twitter.svg" alt='twitter' />
                            </Link>
                            <Link className="folowItem" to={`/`}>
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
