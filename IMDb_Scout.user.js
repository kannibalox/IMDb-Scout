// ==UserScript==
// @name           IMDb Scout
// @namespace      https://greasyfork.org/users/1057-kannibalox
// @description    Add links from IMDb pages to torrent sites -- easy downloading from IMDb
//
// Preference window for userscripts, hosted by greasyfork:
// @require     https://greasyfork.org/libraries/GM_config/20131122/GM_config.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
//
// @version        4.3.7
// @include        http://*.imdb.tld/title/tt*
// @include        http://*.imdb.tld/search/title*
//
// @connect      *
// @grant        GM_log
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
//
// ==/UserScript==
/*---------------------Version History--------------------
1.00    -    Initial public release, everything works on barebones greasemonkey

1.50    -    Added the ability to select which sites to load from the GM script commands
        -    Moved the required method to userscripts
        -    Removed FH, NZB, Avax

1.60    -    Added style elements and shading to display on imdb

1.62    -    Fixed bug:SCC-ARC not removing when unchecked
        -    Alphabetized list

1.70    -    Cleaned up code
        -    Added option to not run script on page load

1.71    -    Deprecated action-box field

1.80    -    Added icons that link to OpenSubs, Criticker, RT, YT

1.81    -    Added support for tv, only displays on shows listed as 'tv series'
        -    Added support for icheckmovies at top bar.

1.82    -    Fixed title parsing for tv shows.

1.83    -    Fixed dhive not working properly

1.90    -    Set height of preference window to 450px, added scroll bar

1.91    -    Added another 11 torrent sites

2.00    -    Added auto updater

2.01    -    Added TC, FreshOn, TVT, STF, CC
        -    Cleaned up code (tabbing)
        -    Removed THR
        -    Added TV-Rage to top bar

2.02    -    Added PS, THC, HH, HDStar
        -    Fixed CC false positive

2.03    -    TehC now uses tt
        -    Added Raymoz mod for AT

2.04    -    Added HDbits
        -    Added TL

2.10    -    Added genre page search functionality

2.11    -    Fixed ICM because Nuked was whining

2.12    -    Removed tvrage
        -    Fixed iCM (added tt)
        -    Added HDVNbits
        -    Changed RevTT to .me
        -    Added HDT
        -    removed autoupdate

2.13    -    removed xvidme
        -    reinstated autoupdate
        -    removed google chrome code
        -    fixed hdvn and hdt issues

2.14    -    Added @grant entries for API access
        -    Fixed tt parser to work on imdb pages with referral info in url

2.2     -    Switch preferences window to use GM_config
        -    Consolidate icon & site lists
        -    Added IPT, KASS, sHD, and HDW
        -    Fix "Open All" link
        -    Add option for strikethroughs on search page
        -    Removed arrays from search URLs
        -    Spring cleaning

2.21    -    Added SSL to TVT, HDME, TC, AHD, IPT, SCC
        -    Added SSL option for CG
        -    Added GFT, GFT-Gems, GFT-TV
        -    Fixed SCC, SCC-ARC search URL
        -    Removed TheBox, TheDVDClub
        -    Added more comments, cleaned up some more stuff

2.22    -    Fixed TehC, BTN, BTN-Req, THC
        -    Added a bunch of TV sites, courtesy of seedless
        -    Added "both" option for sites, and made changes
             to allow coexistence of movie and TV sites with
             the same name
        -    Code re-organization, documentation
        -    Re-added code to allow an array for searchUrl

2.22.1  -    Minor fixes

2.23    -    Fixed THC, BTN
        -    Distinguish between movies and TV on search page

2.24    -    Separate load_on_start option for search page
        -    Fix search_string on search page

2.25    -    Added some helpful text when no sites have been enabled

2.26    -    Added code to show links when on pages besides just the "front" one
             (e.g. http://www.imdb.com/title/tt2310332/reference)

2.26.1  -    Correctly detect TV shows when on aforementioned pages.

2.3     -    Incorporate a bunch of changes courtesy of Inguin:
             - Added SSL to AT, TE, D-noid, TG, YT, RT
             - Changed tracker short titles to canonical form ADC, KG
             - Updated D-noid from .me to .pw
             - Fixed broken AT search; also updated to use .me so avoids redirect
             - Added BitHQ, ET (eutorrents)
             - Removed two broken THC; replaced with one fixed
             - Removed iplay, horrorhaven, hdstar, scandbits, leecherslair
             - Removed needless CG http/https duplication - plenty of listed sites self-sign
             - A-Z sites list for readability
             - Cleanup YT search string
             - Copyedits
             - Clean up code (tabs, trailing spaces)
        -    Use consistent naming style
        -    Added Letterboxd, Subscene to icons
        -    Added options for showing icons

2.31    -    Added preliminary check for TSH
        -    Change all SCC links to .org

2.31.1  -    Typo fix

2.32    -    On uncertain pages, display both movie and TV sites

2.33    -    Add year to possible search params
        -    Add rutorrent

2.33.1  -    Change KG to .in

2.33.2  -    Change TSH to .me

2.34    -    Updated AT, TPB
             - Removed HDWing, TVT and CHDBits
             - Added RARBG
             - Re-added reverse match checking to support rarbg

2.35    -    Fixed YouTube icon, add SubtitleSeeker icon
        -    Added FL.ro, bB, BHD, HDS
             - Fixed TL, TehC, HDb, HDVN, AHD, KG
             - Renamed reverseMatch to positiveMatch

2.36    -    Added Wikipedia to icon sites

2.36.1  -    Typo fix

2.37    -    Add PxHD

2.38    -    Fix subtitle seeker
        -    Added CG-c
        -    Added FilmAffinity
        -    Added option to skip http check entirely

2.38.1  -    Typo fix

2.38.2  -    Global replace parameters

2.38.3  -    Typo fix

3.00    -    Clean up some formatting
        -    Add support for new IMDb page format
        -    Update jquery

3.0.1   -    Added Classix

3.0.2   -    Updated documentation/comments

3.0.3   -    Removed GOEM, FY, PS, MT
        -    Added Metacritic, CanIStream.It?, AllMovie, Facebook, Amazon, Cartoon Chaos, MySpleen, Secret Cinema
        -    Fixed Wikipedia icon

3.1     -    Handle HTTP failures less silently

3.1.1   -    Fix KASS

3.1.2   -    Fix TPB, TE, HDT
        -    Add MTV, DVDSeed

3.1.3   -    Add M-T, UHDB, HDC, Blu-ray.com
        -    Fix scenehd, RT

3.1.4   -    Add HDClub

3.2     -    Fix the button on new-style pages

3.2.1   -    Fix AHD

3.3     -    Be less obnoxious about failed calls

3.4     -    Add Netflix icon
        -    Remove a default parameter to satisfy Chrome

3.5     -    Add KZ, NNM, BB-HD, t411, TD, Rutor
        -    Fix HDClub
        -    Fix preferences in Chrome, sort sites properly

3.5.1   -    Remove DHive, Fix AHD

4.0     -    Bring in UI changes courtesy of janot
        -    Add spaceEncode and goToUrl to site options
        -    Add option to show results as links instead of text
        -    Differentiate between missing and logged out
        -    General refactoring

4.1     -    Add RARAT

4.2     -    Fix t411
        -    Use magic .tld domain in @include
        
4.3     -    Set @connect in metadata block

4.3.1   -    Fix THC

4.3.2   -    Add AR, TtN
        -    Add year and "trailer" to youtube search
        -    Fix M-team

4.3.3   -    Fix BitHQ, PTP-Req, SCC

4.3.4   -    Fix M-team, myspleen, avistaz, eutorrents
        -    Removed KAT

4.3.5   -    Fix IPT, Freshon
        -    Add ExtraTorrent
	
4.3.6   -    Fix Demonoid, EuTorrents (now CinemaZ)
        -    Fix "Actually search for torrents" option
        -    Add PrivateHD for movies and tv

4.3.7   -    Apply CinemaZ fixes to AvistaZ as well

--------------------------------------------------------*/


if (window.top != window.self) // Don't run on frames or iframes
{
    return;
}

//------------------------------------------------------
// A list of all the sites, and the data necessary to
// check IMDb against them.
// Each site is a dictionary with the following attributes:
//  - name:
//      The site name, abbreviated
//  - searchUrl:
//      The URL to perform the search against, see below for how
//      to tailor the string to a site
//  - matchRegex:
//      The string which appears if the searchUrl *doesn't* return a result
//  - postiveMatch:
//      Changes the test to return true if the searchUrl *does* return
//      a result that matches matchRegex
//  - TV (optional):
//      If true, it means that this site will only show up on TV pages.
//      By default, sites only show up on movie pages.
//  - both (optional):
//      Means that the site will show up on both movie and TV pages
//  - spaceEncode (optional):
//      Changes the character used to encode spaces in movie titles
//      The default is '+'.
//  - goToUrl (optional):
//      Most of the time the same URLs that are used for checking are
//      the ones that are used to actually get to the movie,
//      but this allows overriding that.
//  - loggedOutRegex (optional):
//      If any text on the page matches this regex, the site is treated
//      as being logged out, rather than mising the movie. This option is
//      not effected by postiveMatch.
// To create a search URL, there are four parameters
// you can use inside the URL:
//  - %tt%:
//      The IMDb id with the tt prefix (e.g. tt0055630)
//  - %nott%:
//      The IMDb id without the tt prefix (e.g. 0055630)
//  - %search_string%:
//      The movie title (e.g. Yojimbo)
//  - %year%:
//      The movie year (e.g. 1961)
// See below for examples
//------------------------------------------------------

var sites = [
{   'name': 'ADC',
    'searchUrl': 'https://asiandvdclub.org/browse.php?descr=1&btnSubmit=Submit&search=%tt%',
    'matchRegex': /Your search returned zero results|<h1>You need cookies enabled to log in.<\/h1>/,
    'both': true},
{   'name': 'AHD',
    'searchUrl': 'https://awesome-hd.me/torrents.php?id=%tt%',
    'matchRegex': /Your search did not match anything.|<h2>Error 404<\/h2>/,
    'both': true},
{   'name': 'AR',
    'searchUrl': 'https://alpharatio.cc/torrents.php?searchstr=%search_string%+%year%&filter_cat[6]=1&filter_cat[7]=1&filter_cat[8]=1&filter_cat[9]=1',
    'matchRegex': /Your search did not match anything/},
{   'name': 'AR',
    'searchUrl': 'https://alpharatio.cc/torrents.php?searchstr=%search_string%&filter_cat[1]=1&filter_cat[2]=1&filter_cat[3]=1&filter_cat[4]=1&filter_cat[5]=1',
    'matchRegex': /Your search did not match anything/,
    'TV': true},
{   'name': 'AT',
    'searchUrl': 'https://avistaz.to/movies?search=&imdb=%tt%',
    'matchRegex': /class="overlay-container"/,
    'positiveMatch': true},
{   'name': 'AT',
    'searchUrl': 'https://avistaz.to/tv-shows?search=&imdb=%tt%',
    'matchRegex': /class="overlay-container"/,
    'positiveMatch': true,
    'TV': true},
{   'name': 'bB',
    'searchUrl': 'https://baconbits.org/torrents.php?action=basic&filter_cat[9]=1&searchstr=%search_string%+%year%',
    'matchRegex': /Your search was way too l33t|You will be banned for 6 hours after your login attempts run out/},
{   'name': 'bB',
    'searchUrl': 'https://baconbits.org/torrents.php?action=basic&filter_cat[8]=1&filter_cat[10]=1&searchstr=%search_string%',
    'matchRegex': /Your search was way too l33t|You will be banned for 6 hours after your login attempts run out/,
    'TV': true},
{   'name': 'BB-HD',
    'searchUrl': 'https://bluebird-hd.org/browse.php?search=&incldead=0&cat=0&dsearch=%tt%&stype=or',
    'matchRegex': /Nothing found|Ничего не найдено/,
    'both': true},
{   'name': 'BHD',
    'searchUrl': 'https://beyondhd.me/browse.php?search=%tt%&searchin=title&incldead=1',
    'matchRegex': /Nothing found!|Please login or Register a personal account to access our user area and great community/},
{   'name': 'BHD',
    'searchUrl': 'https://beyondhd.me/browse.php?c40=1&c44=1&c48=1&c89=1&c46=1&c45=1&search=%search_string%&searchin=title&incldead=0',
    'matchRegex': /Nothing found!|Please login or Register a personal account to access our user area and great community/,
    'TV': true},
{   'name': 'BitHD',
    'searchUrl': 'http://www.bit-hdtv.com/torrents.php?cat=0&search=%tt%',
    'matchRegex': /<h2>No match!<\/h2>/},
{   'name': 'BitHQ',
    'searchUrl': 'http://www.bithq.org/search.php?search=%search_string%&options=AND&in=original&incldead=1',
    'matchRegex': /Try again with a refined search string|<h1>Not logged in!<\/h1>/},
{   'name': 'BMTV',
    'searchUrl': 'https://www.bitmetv.org/browse.php?search=%search_string%',
    'matchRegex': /Nothing found!<\/h2>/,
    'TV': true},
{   'name': 'BTN',
    'searchUrl': 'https://broadcasthe.net/torrents.php?imdb=%tt%',
    'matchRegex': /Error 404|Lost your password\?/,
    'TV': true},
{   'name': 'BTN-Req',
    'searchUrl':  'https://broadcasthe.net/requests.php?search=%search_string%',
    'matchRegex': /Nothing found|Lost your password\?/,
    'TV': true},
{   'name': 'CaCh',
    'searchUrl': 'http://www.cartoonchaos.org/index.php?page=torrents&search=%search_string%&category=0&options=0&active=0',
    'matchRegex': />Av.<\/td>\s*<\/tr>\s*<\/table>|not authorized to view the Torrents/,
    'both': true},
{   'name': 'CC',
    'searchUrl': 'http://www.cine-clasico.com/foros/search.php?terms=any&author=&sc=1&sf=all&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Search&keywords=%tt%',
    'matchRegex': /You will be banned for 6 hours after your login attempts run out.|You must specify at least one word to search for. Each word must consist of at least 3 characters and must not contain more than 14 characters excluding wildcards.|Disculpe/},
{   'name': 'CG',
    'searchUrl': 'https://cinemageddon.net/browse.php?search=%tt%',
    'matchRegex': /<h2>Nothing found!<\/h2>/,
    'loggedOutRegex': 'Not logged in!'},
{   'name': 'CG-c',
    'searchUrl': 'https://cinemageddon.net/cocks/endoscope.php?what=imdb&q=%tt%',
    'matchRegex': /<h2>Nothing found!<\/h2>/,
    'loggedOutRegex': 'Not logged in!'},
{   'name': 'Classix',
    'searchUrl': 'http://classix-unlimited.co.uk/torrents-search.php?search=%search_string%',
    'matchRegex': /Nothing Found<\/div>/},
{   'name': 'D-noid',
    'searchUrl': 'http://www.dnoid.me/files/?query=%tt%',
    'matchRegex': /<b>No torrents found<\/b>|We are currently performing the daily site maintenance.<br>/,
    'both': true},
{   'name': 'DVDSeed',
    'searchUrl': 'http://www.dvdseed.eu/browse2.php?search=%tt%&wheresearch=2&incldead=1&polish=0&nuke=0&rodzaj=0',
    'matchRegex': /Nic tutaj nie ma!<\/h2>/},
{   'name': 'ET',
    'searchUrl': 'https://cinemaz.to/movies?search=&imdb=%tt%',
    'matchRegex': /class="overlay-container"/,
    'positiveMatch': true},
{   'name': 'ET',
    'searchUrl': 'https://cinemaz.to/tv-shows?search=&imdb=%tt%',
    'matchRegex': /class="overlay-container"/,
    'positiveMatch': true,
    'TV': true},
{   'name': 'eThor',
    'searchUrl': 'http://ethor.net/browse.php?stype=b&c23=1&c20=1&c42=1&c5=1&c19=1&c25=1&c6=1&c37=1&c43=1&c7=1&c9=1&advcat=0&incldead=0&includedesc=1&search=%tt%',
    'matchRegex': /Try again with a refined search string.|<h1>Note: Vous devez activer vos 'cookies' pour pouvoir vous identifier.<\/h1>/},
{   'name': 'ExtraTorrent',
    'searchUrl': 'https://extratorrent.cc/search/?search=%search_string%+%year%',
    'matchRegex': /total <b>0<\/b> torrents found/},
{   'name': 'FL',
    'searchUrl': 'https://filelist.ro/browse.php?search=%tt%',
    'matchRegex': /Broblem \?|Nu s-a gasit nimic!/,
    'both': true},
{   'name': 'Fresh',
    'searchUrl': 'http://freshon.tv/browse.php?search=%search_string%',
    'matchRegex': /<strong>Nothing found/,
    'TV': true},
{   'name': 'FSS',
    'searchUrl': 'http://fss.omnilounge.co.uk/browse.php?blah=2&cat=0&incldead=1&search=%tt%',
    'matchRegex': /Try again with a different search string?|<h1>You need cookies enabled to log in.<\/h1>/},
{   'name': 'GFT',
    'searchUrl': 'https://www.thegft.org/browse.php?view=0&c2=1&c1=1&c9=1&c11=1&c48=1&c8=1&c18=1&c49=1&c7=1&c38=1&c46=1&c5=1&c13=1&c26=1&c37=1&c19=1&c47=1&c17=1&c4=1&c22=1&c25=1&c20=1&c3=1&search=%tt%&searchtype=0',
    'matchRegex': /Nothing found!<\/h2>/},
{   'name': 'GFT',
    'searchUrl': 'https://www.thegft.org/browse.php?view=0&search=%search_string%',
    'matchRegex': /Nothing found!<\/h2>/,
    'TV': true},
{   'name': 'GFT-Gems',
    'searchUrl': 'https://www.thegft.org/browse.php?view=1&search=%tt%&searchtype=0',
    'matchRegex': /Nothing found!<\/h2>/},
{   'name': 'HD',
    'searchUrl': 'http://hounddawgs.org/torrents.php?type=&userid=&searchstr=&searchimdb=%tt%&searchlang=&searchtags=&order_by=s3&order_way=desc&showOnly=#results',
    'matchRegex': /<h2>Din søgning gav intet resultat.<\/h2>/,
    'both': true},
{   'name': 'HDb',
    'searchUrl': 'https://hdbits.org/browse.php?c3=1&c1=1&c4=1&c2=1&imdb=%tt%',
    'matchRegex': /Nothing here!|You need cookies enabled to log in/,
    'both': true},
{   'name': 'HDC',
    'searchUrl': 'https://hdchina.club/torrents.php?incldead=0&spstate=0&inclbookmarked=0&boardid=0&seeders=&search=%tt%&search_area=4&search_mode=2',
    'matchRegex': /Nothing found! Try again with a refined search string./},
{   'name': 'HDClub',
    'searchUrl': 'http://hdclub.org/browse.php?webdl=0&3d=0&search=&incldead=0&dsearch=%tt%',
    'matchRegex': /Nothing was found|Ничего не найдено|Нічого не знайдено/,
    'both': true},
{   'name': 'HDME',
    'searchUrl': 'https://hdme.eu/browse.php?blah=2&cat=0&incldead=1&search=%tt%',
    'matchRegex': /Try again with a refined search string.|<h1>You need cookies enabled to log in.<\/h1>/},
{   'name': 'HDME',
    'searchUrl': 'https://hdme.eu/browse.php?search=%search_string%&blah=0&cat=0&incldead=1',
    'matchRegex': /Try again with a refined search string.|<h1>You need cookies enabled to log in.<\/h1>/,
    'TV': true},
{   'name': 'HDS',
    'searchUrl': 'https://hdsky.me/torrents.php?incldead=1&search=%tt%&search_area=4&search_mode=0',
    'matchRegex': /Nothing found! Try again with a refined search string|Email:hdsky.me@gmail.com/},
{   'name': 'HDS',
    'searchUrl': 'https://hdsky.me/torrents.php?cat402=1&cat403=1&incldead=1&search=%search_string%&search_area=0&search_mode=0',
    'matchRegex': /Nothing found! Try again with a refined search string|Email:hdsky.me@gmail.com/,
    'TV': true},
{   'name': 'HDT',
    'searchUrl': 'http://hd-torrents.org/torrents.php?active=0&options=2&search=%tt%',
    'matchRegex': /No torrents here.../,
    'both': true},
{   'name': 'HDVN',
    'searchUrl': 'http://torviet.com/torrents.php?search=%tt%&search_area=4&search_mode=0',
    'matchRegex': /Nothing found! Try again with a refined search string|You need cookies enabled to log in or switch language/,
    'both': true},
{   'name': 'ILC',
    'searchUrl': 'http://www.iloveclassics.com/browse.php?incldead=1&searchin=2&search=%tt%',
    'matchRegex': /Try again with a refined search string|<h1>Not logged in!<\/h1>/},
{   'name': 'IPT',
    'searchUrl': 'https://www.iptorrents.com/torrents/?q=%tt%',
    'matchRegex': /<h1 style="color:yellow">No Torrents Found!/},
{   'name': 'IPT',
    'searchUrl': 'https://www.iptorrents.com/torrents/?q=%search_string%',
    'matchRegex': /<h1 style="color:yellow">No Torrents Found!/,
    'TV': true},
{   'name': 'KG',
    'searchUrl': 'https://www.karagarga.in/browse.php?search_type=imdb&search=%nott%',
    'matchRegex': /<h2>No torrents found|<h1>If you want the love<\/h1>/},
{   'name': 'KZ',
    'searchUrl': 'http://kinozal.tv/browse.php?s=%search_string%+%year%&g=0&c=1002&v=0&d=0&w=0&t=0&f=0',
    'matchRegex': 'Нет активных раздач, приносим извинения. Пожалуйста, уточните параметры поиска'},
{   'name': 'KZ',
    'searchUrl': 'http://kinozal.tv/browse.php?s=%search_string%+%year%&g=0&c=1001&v=0&d=0&w=0&t=0&f=0',
    'matchRegex': 'Нет активных раздач, приносим извинения. Пожалуйста, уточните параметры поиска',
    'TV': true},
{   'name': 'M-T',
    'searchUrl': 'https://tp.m-team.cc/movie.php?incldead=1&spstate=0&inclbookmarked=0&search=%tt%&search_area=4&search_mode=2',
    'matchRegex': /Nothing here!|Try again with a refined search string./},
{   'name': 'MS',
    'searchUrl': 'http://www.myspleen.org/browse.php?search=%search_string%&title=0&cat=0',
    'matchRegex': /<p>Try again with a refined search string.<\/p>|<title>MySpleen :: Login<\/title>/,
    'both': true},
{   'name': 'MTV',
    'searchUrl': 'https://www.morethan.tv/torrents.php?description=%tt%&tags_type=1&order_by=time&order_way=desc&group_results=1&filter_cat%5B1%5D=1&action=advanced&searchsubmit=1',
    'matchRegex': /<h2>Your search did not match anything.<\/h2>/},
{   'name': 'MTV',
    'searchUrl': 'https://www.morethan.tv/torrents.php?description=%tt%&tags_type=1&order_by=time&order_way=desc&group_results=1&filter_cat%5B2%5D=1&action=advanced&searchsubmit=1',
    'matchRegex': /<h2>Your search did not match anything.<\/h2>/,
    'TV': true},
{   'name': 'NNM',
    'searchUrl': 'https://nnm-club.me/forum/tracker.php?nm=%search_string%+%year%',
    'matchRegex': 'Не найдено',
    'both': true},
{   'name': 'NB',
    'searchUrl': 'https://norbits.net/browse.php?incldead=1&fullsearch=0&scenerelease=0&imdbsearch=%tt%&imdb_from=0&imdb_to=0&search=',
    'matchRegex': /<h3>Ingenting her!<\/h3>/,
    'both': true},
{   'name': 'PHD',
    'searchUrl': 'https://privatehd.to/movies?search=&imdb=%tt%',
    'matchRegex': /class="overlay-container"/,
    'positiveMatch': true},
{   'name': 'PHD',
    'searchUrl': 'https://privatehd.to/tv-shows?search=&imdb=%tt%',
    'matchRegex': /class="overlay-container"/,
    'positiveMatch': true,
    'TV': true},
{   'name': 'PTP',
    'searchUrl': 'https://tls.passthepopcorn.me/torrents.php?imdb=%tt%',
    'matchRegex': /<h2>Your search did not match anything.<\/h2>/},
{   'name': 'PTP-Req',
    'searchUrl': 'https://tls.passthepopcorn.me/requests.php?submit=true&search=%tt%',
    'matchRegex': /Your search did not match anything.|<h1>Keep me logged in.<\/h1>/},
{   'name': 'PxHD',
    'searchUrl': 'https://pixelhd.me/torrents.php?groupname=&year=&tmdbover=&tmdbunder=&tmdbid=&imdbover=&imdbunder=&imdbid=%tt%&order_by=time&order_way=desc&taglist=&tags_type=1&filterTorrentsButton=Filter+Torrents',
    'matchRegex': /<h2>Your search did not match anything.<\/h2>/},
{   'name': 'RARAT',
    'searchUrl': 'https://rarat.org/api/v1/torrents?extendedSearch=false&hideOld=false&index=0&limit=15&order=asc&page=search&searchText=%tt%&sort=n#https://rarat.org/search?search=%tt%',
    'goToUrl': 'https://rarat.org/search?search=%tt%',
    'matchRegex': /^$/,
    'both': true},
{   'name': 'RARBG',
    'searchUrl': 'https://rarbg.to/torrents.php?imdb=%tt%',
    'matchRegex': '//dyncdn.me/static/20/images/imdb_thumb.gif',
    'positiveMatch': true,
    'both': true},
{   'name': 'RevTT',
    'searchUrl': 'https://www.revolutiontt.me/browse.php?search=%tt%',
    'matchRegex': /<h2>Nothing found!<\/h2>/},
{   'name': 'RevTT',
    'searchUrl': 'https://www.revolutiontt.me/browse.php?search=%search_string%&cat=0&incldead=1&titleonly=1',
    'matchRegex': /<h2>Nothing found!<\/h2>/,
    'TV': true},
{   'name': 'RuT',
    'searchUrl': 'http://rutracker.org/forum/tracker.php?nm=%search_string%+%year%',
    'matchRegex': 'Не найдено',
    'both': true},
{   'name': 'Rutor',
    'searchUrl': 'http://rutor.info/search/0/0/010/0/%tt%',
    'matchRegex': 'Результатов поиска 0',
    'both': true},
{   'name': 'SC',
    'searchUrl': 'http://www.secret-cinema.net/browse.php?search=%search_string%',
    'matchRegex': /Try again with a refined search string\.|There was a problem executing the query/,
    'both': true},
{   'name': 'SC-F',
    'searchUrl': 'http://www.secret-cinema.net/search.php?action=search&show_as=topics&keywords=%tt%',
    'matchRegex': /Your search returned no hits\.|You do not have permission to view these forums\./,
    'both': true},
{   'name': 'SCC',
    'searchUrl': 'https://sceneaccess.eu/all?method=3&search=%tt%',
    'matchRegex': /Try again with a refined search string./,
    'loggedOutRegex': /<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/},
{   'name': 'SCC',
    'searchUrl': 'https://sceneaccess.eu/all?method=2&c27=27&c17=17&c11=11&c26=26&c44=44&c45=44&search=%search_string%',
    'matchRegex': /Try again with a refined search string./,
    'loggedOutRegex': /<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/,
    'TV': true},
{   'name': 'SDBits',
    'searchUrl': 'http://sdbits.org/browse.php?c6=1&c3=1&c1=1&c4=1&c5=1&c2=1&m1=1&incldead=0&from=&to=&imdbgt=0&imdblt=10&uppedby=&imdb=&search=%tt%',
    'matchRegex': /Nothing found!|<h1>You need cookies enabled to log in.<\/h1>/},
{   'name': 'sHD',
    'searchUrl': 'https://scenehd.org/browse.php?search=%tt%',
    'matchRegex': /<h2>No torrents found!<\/h2>/},
{   'name': 'SM',
    'searchUrl': 'http://www.surrealmoviez.info/advanced_search.php?simdb=%tt%',
    'matchRegex': /0 Movies found matching search criteria|You need to be logged in to view this page/},
{   'name': 't411',
    'searchUrl': 'http://www.t411.ch/torrents/search/?name=%search_string%&description=&file=&user=&cat=210&subcat=&search=%40name+%search_string%+&submit=Recherche',
    'matchRegex': /sultat Aucun/,
    'both': true},
{   'name': 'TD',
    'searchUrl': 'https://www.torrentday.com/browse.php?search=%search_string%&cata=yes&c29=1&c30=1&c25=1&c11=1&c5=1&c3=1&c21=1&c22=1&c13=1&c44=1&c1=1&c24=1&c32=1&c31=1&c33=1&c46=1&c14=1&c26=1&c7=1&c2=1',
    'matchRegex': /Nothing found!/,
    'both': true},
{   'name': 'TE',
    'searchUrl': 'http://theempire.bz/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
    'matchRegex': /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/,
    'both': true},
{   'name': 'TehC',
    'searchUrl': 'https://tehconnection.eu/torrents.php?action=basic&searchstr=%tt%',
    'matchRegex': /You will be banned for 6 hours after your login attempts run out.|<h2>No Search Results, try reducing your search options./},
{   'name': 'TG',
    'searchUrl': 'https://thegeeks.bz/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
    'matchRegex': /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/,
    'both': true},
{   'name': 'THC',
    'searchUrl': 'https://horrorcharnel.org/browse.php?search=%nott%&cat=0&incldead=1',
    'matchRegex': /<h1>Not logged in!<\/h1>|<h2>Nothing found!<\/h2>/},
{   'name': 'Tik',
    'searchUrl': 'http://cinematik.net/browse.php?srchdtls=1&incldead=1&search=%tt%',
    'matchRegex': /The page you tried to view can only be used when you're logged in|<h2>Nothing found!<\/h2>/},
{   'name': 'TL',
    'searchUrl': 'http://www.torrentleech.org/torrents/browse/index/query/%search_string%+%year%/categories/1,8,9,10,11,12,13,14,15,29',
    'matchRegex': /Signup With Invite|Please refine your search./},
{   'name': 'TL',
    'searchUrl': 'http://www.torrentleech.org/torrents/browse/index/query/%search_string%/categories/2,26,27,32',
    'matchRegex': /Signup With Invite|Please refine your search./,
    'TV': true},
{   'name': 'TPB',
    'searchUrl': 'https://thepiratebay.se/search/%tt%',
    'matchRegex': /No hits. Try adding an asterisk in you search phrase.<\/h2>/,
    'both': true},
{   'name': 'TSH',
    'searchUrl': 'https://torrentshack.me/torrents.php?searchstr=%search_string%&action=advanced&torrentname=&description=&filelist=&extrainfo=&hasnfo=&nuked=&nukedtext=&release_type=both&searchtags=&tags_type=0&order_by=s3&order_way=desc&torrent_preset=all&filter_cat%5B960%5D=1&filter_cat%5B300%5D=1&filter_cat%5B320%5D=1&filter_cat%5B400%5D=1&filter_cat%5B970%5D=1&filter_cat%5B350%5D=1&filter_cat%5B982%5D=1&filter_cat%5B983%5D=1',
    'matchRegex': /Your search did not match anything./},
{   'name': 'TtN',
    'searchUrl': 'https://transmithe.net/torrents.php?order_by=time&order_way=desc&searchtext=%search_string%&search_type=0&taglist=&tags_type=0',
    'matchRegex': /Your search did not match anything/,
    'TV': true},
{   'name': 'TVV',
    'searchUrl': 'http://tv-vault.me/torrents.php?searchstr=%search_string%',
    'matchRegex': /Nothing found<\/h2>/,
    'TV': true},
{   'name': 'UHDB',
    'searchUrl': 'https://uhdbits.org/torrents.php?action=advanced&groupname=%tt%',
    'matchRegex': /Your search did not match anything./},
{   'name': 'x264',
    'searchUrl': 'http://x264.me/browse.php?incldead=0&xtype=0&stype=3&search=%tt%',
    'matchRegex': /Try again with a refined search string.|<h1>Forgot your password?<\/h1>/}
];

var icon_sites = [
{   'name': 'OpenSubtitles',
    'searchUrl': 'http://www.opensubtitles.org/en/search/imdbid-%tt%'},
{   'name': 'YouTube.com',
    'searchUrl': 'https://www.youtube.com/results?search_query="%search_string%"+%year%+trailer'},
{   'name': 'Rotten Tomatoes',
    'searchUrl': 'https://www.rottentomatoes.com/search/?search=%search_string%'},
{   'name': 'Criticker',
    'searchUrl': 'http://www.criticker.com/?st=movies&h=%search_string%&g=Go'},
{   'name': 'iCheckMovies',
    'searchUrl': 'https://www.icheckmovies.com/search/movies/?query=%tt%'},
{   'name': 'Letterboxd',
    'searchUrl': 'http://letterboxd.com/imdb/%nott%'},
{   'name': 'Subscene',
    'searchUrl': 'http://subscene.com/subtitles/title?q=%search_string%'},
{   'name': 'SubtitleSeeker',
    'searchUrl': 'http://www.subtitleseeker.com/%nott%/Movie/Releases/English/'},
{   'name': 'Wikipedia',
    'searchUrl': 'https://en.wikipedia.org/w/index.php?search=%search_string%&go=Go'},
{   'name': 'FilmAffinity',
    'searchUrl': 'http://www.filmaffinity.com/en/advsearch.php?stext=%search_string%&stype[]=title&fromyear=%year%&toyear=%year%',
    'showByDefault': false},
{   'name': 'Metacritic',
    'searchUrl': 'http://www.metacritic.com/search/all/%search_string%/results?cats[movie]=1&cats[tv]=1&search_type=advanced&sort=relevancy',
    'showByDefault': false},
{   'name': 'Can I Stream.It? (Movie)',
    'searchUrl': 'http://www.canistream.it/search/movie/%search_string%',
    'showByDefault': false},
{   'name': 'Can I Stream.It? (TV)',
    'searchUrl': 'http://www.canistream.it/search/tv/%search_string%',
    'showByDefault': false},
{   'name': 'AllMovie',
    'searchUrl': 'http://www.allmovie.com/search/movies/%search_string%',
    'showByDefault': false},
{   'name': 'Facebook',
    'searchUrl': 'https://www.facebook.com/search/str/%search_string%/keywords_pages',
    'showByDefault': false},
{   'name': 'Amazon',
    'searchUrl': 'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dmovies-tv&field-keywords=%search_string%',
    'showByDefault': false},
{   'name': 'Netflix',
    'icon': 'https://whatimg.com/i/jOa2ac.png',
    'searchUrl': 'http://www.netflix.com/search/%search_string%',
    'showByDefault': false},
{   'name': 'Blu-ray.com',
    'searchUrl': 'http://www.blu-ray.com/search/?quicksearch=1&quicksearch_country=all&quicksearch_keyword=%search_string%+&section=bluraymovies',
    'showByDefault': false}
];

// For internal use (order matters)
var valid_states = [
    'found',
    'missing',
    'logged_out',
    'error'
]

function replaceSearchUrlParams(site, movie_id, movie_title) {
    var search_url = site['searchUrl']
    // If an array, do a little bit of recursion
    if ($.isArray(search_url)) {
        var search_array = [];
        $.each(search_url, function(index, url) {
            search_array[index] = replaceSearchUrlParams(url, movie_id, movie_title);
        });
        return search_array;
    }
    var space_replace = ('spaceEncode' in site) ? site['spaceEncode'] : '+'
    var search_string = movie_title.replace(/ +\(.*/, '').replace(/[^a-zA-Z0-9]/g, ' ').replace(/ +/g, space_replace);
    var movie_year = document.title.replace(/^(.+) \((.*)([0-9]{4})(.*)$/gi, '$3');
    return search_url.replace(/%tt%/g, 'tt' + movie_id)
                     .replace(/%nott%/g, movie_id)
                     .replace(/%search_string%/g, search_string)
                     .replace(/%year%/g, movie_year);
}

function getPageSetting(key) {
    return (onSearchPage ? GM_config.get(key + '_search') : GM_config.get(key + '_movie'))
}

// Small utility function to return a site's icon
function getFavicon(site, hide_on_err) {
    if (typeof(hide_on_err) === 'undefined') hide_on_err = false;
    if ('icon' in site) {
        var favicon = site['icon'];
    } else {
        var url = new URL(site['searchUrl'])
        var favicon = url.origin + '\/favicon.ico';
    }
    var img = $('<img />').attr({'style': '-moz-opacity: 0.4; border: 0; vertical-align: text-top',
                             'width': '16',
                             'src': favicon,
                             'title': site['name'],
                             'alt': site['name']});
    if (hide_on_err) img.attr('onerror', "this.style.display='none';");
    return img;
}

// Adds search links to an element
// state should always be one of the values defined in valid_states
function addLink(elem, link_text, target, site, state) {
    var link = $('<a />').attr('href', target).attr('target', '_blank');
    if ($.inArray(state, valid_states) < 0) {
        console.log("Unknown state " + state);
    }
    if (getPageSetting('use_icons')) {
        var icon = getFavicon(site);
        icon.css({'border-width': '3px', 'border-style': 'solid', 'border-radius': '2px'});
        if (state == 'error' || state == 'logged_out') {
            icon.css('border-color', 'red');
        } else if (state == 'missing') {
            icon.css('border-color', 'yellow');
        } else {
            icon.css('border-color', 'green');
        }
        link.append(icon);
    } else {
        if (state == 'missing' || state == 'error' || state == 'logged_out') {
            link.append($('<s />').append(link_text));
        } else {
            link.append(link_text);
        }
        if (state == 'error' || state == 'logged_out') {
            link.css('color', 'red');
        }
    }

    if (!onSearchPage) {
        $('#imdbscout_' + state).append(link).append(' ');
    } else {
        var result_box = $(elem).find('td.result_box');
        if (result_box.length > 0) {
            $(result_box).append(link);
        } else {
            $(elem).append($('<td />').append(link).addClass('result_box'));
        }
    }
}

// Performs an ajax request to determine
// whether or not a url should be displayed
function maybeAddLink(elem, link_text, search_url, site) {
    // If the search URL is an array, recurse briefly on the elements.
    if ($.isArray(search_url)) {
        $.each(search_url, function(index, url) {
            maybeAddLink(elem, link_text + '_' + (index + 1).toString(), url, site);
        });
        return;
    }
    var target = site['goToUrl'];
    var success_match = ('positiveMatch' in site) ? site['positiveMatch'] : false;
    GM_xmlhttpRequest({
        method: 'GET',
        url: search_url,
        onload: function(response_details) {
            if (String(response_details.responseText).match(site['matchRegex']) ? !(success_match) : success_match) {
                if (!getPageSetting('hide_missing')) {
                    addLink(elem, link_text, target, site, 'missing');
                }
            } else if (site['loggedOutRegex'] && String(response_details.responseText).match(site['loggedOutRegex'])) {
                    addLink(elem, link_text, target, site, 'logged_out');
            } else {
                addLink(elem, link_text, target, site, 'found');
            }
        },
	onerror: function(response) {
            addLink(elem, link_text, target, site, 'error');
	},
	onabort: function(response) {
            addLink(elem, link_text, target, site, 'error');
	}
    });
}

// Run code to create fields and display sites
function perform(elem, movie_id, movie_title, is_tv, is_movie) {
    var site_shown = false;
    $.each(sites, function(index, site) {
        if (site['show']) {
            site_shown = true;
            // If we're on a TV page, only show TV links.
            if ((Boolean(site['TV']) == is_tv ||
                 Boolean(site['both'])) ||
                (!is_tv && !is_movie)) {
                searchUrl = replaceSearchUrlParams(site, movie_id, movie_title);
                // Ugly hack
                if ('goToUrl' in site) {
                    site['goToUrl'] = replaceSearchUrlParams({
                        'searchUrl': site['goToUrl'],
                        'spaceEncode': ('spaceEncode' in site) ? site['spaceEncode'] : '+'
                    }, movie_id, movie_title);
                } else {
                    site['goToUrl'] = searchUrl;
                }
                if (getPageSetting('call_http')) {
                    maybeAddLink(elem, site['name'], searchUrl, site);
                } else {
                    addLink(elem, site['name'], searchUrl, site, 'found');
                }
            }
        }
    });
    if (!site_shown) {
         $(elem).append('No sites enabled! You can change this via the Greasemonkey option "IMDb Scout Preferences".');
    }
}

//------------------------------------------------------
// Button Code
//------------------------------------------------------

function displayButton() {
    var p = $('<p />').attr('id', 'imdbscout_button');
    p.append($('<button>Load IMDb Scout</button>').click(function() {
        $('#imdbscout_button').remove();
        if (onSearchPage) {
            performSearch();
        } else {
            performPage();
        }
    }));
    if (onSearchPage) {
        $('#sidebar').append(p);
    } else if ($('h1.header:first').length) {
        $('h1.header:first').parent().append(p);
    } else {
        $('#title-overview-widget').parent().append(p);
    }
}

//------------------------------------------------------
// Icons at top bar
//------------------------------------------------------

// Adds a dictionary of icons to the top of the page.
// Unlike the other URLs, they aren't checked to see if the movie exists.
function addIconBar(movie_id, movie_title) {
    if ($('h1.header:first').length) {
        var iconbar = $('h1.header:first').append($('<br/>'));
    } else if ($('.title_wrapper h1')) {
        var iconbar = $('.title_wrapper h1').append($('<br/>'));
    } else {
        var iconbar = $('#tn15title .title-extra');
    }
    $.each(icon_sites, function(index, site) {
        if (site['show']) {
            var search_url = replaceSearchUrlParams(site, movie_id, movie_title);
            var image = getFavicon(site);
            var html = $('<span />').append($('<a />').attr('href', search_url)
                        .addClass('iconbar_icon').append(image));
            iconbar.append(html).append(' ');
        }
    });
    //If we have access to the openInTab function, add an Open All feature
    if (GM_openInTab) {
        var aopenall = $('<a />').text('Open All')
                                 .attr('href', 'javascript:;')
                                 .attr('style', 'font-weight:bold;font-size:10px;font-family: Calibri, Verdana, Arial, Helvetica, sans-serif;');
        aopenall.click(function() {
            $('.iconbar_icon').each(function() {
                GM_openInTab($(this).attr('href'));
            });
        }, false);
        iconbar.append(aopenall);
    }
}

//------------------------------------------------------
// Search page code
//------------------------------------------------------

function performSearch() {
    //Add css for the new table cells we're going to add
    var styles = '.result_box {width: 335px}';
        styles += ' .result_box a { margin-right: 5px; color: #444;} ';
        styles += ' .result_box a:visited { color: #551A8B; }';
        styles += ' #content-2-wide #main, #content-2-wide';
        styles += ' .maindetails_center {margin-left: 5px; width: 1001px;} ';
    GM_addStyle(styles);

    //Loop through each result row
    $('div#main table.results tr.detailed').each(function() {
        var link = $(this).find('.title>a');
        var is_tv = Boolean($(this).find('.year_type').html()
                            .match('TV Series'));
        var is_movie = Boolean($(this).find('.year_type').html()
                               .match(/\(([0-9]*)\)/));
        var movie_title = link.html();
        var movie_id = link.attr('href').match(/tt([0-9]*)\/?$/)[1];

        $(this).find('span.genre a').each(function() {
            if ($(this).html() == 'Adult') {
                $(this).parent().parent().parent()
                    .css('background-color', 'red');
            }
        });
        perform($(this), movie_id, movie_title, is_tv, is_movie);
    });
}

//------------------------------------------------------
// TV/movie page code
//------------------------------------------------------

function performPage() {
    var movie_title = $('title').text().match(/^(.*?) \(/)[1];
    var movie_id = document.URL.match(/\/tt([0-9]+)\//)[1].trim('tt');
    var is_tv_page = Boolean($('title').text().match('TV Series')) ||
        Boolean($('.tv-extra').length);
    var is_movie_page = Boolean($('title').text().match(/.*? \(([0-9]*)\)/));
    //Create area to put links in
    perform(getLinkArea(), movie_id, movie_title,
            is_tv_page, is_movie_page);
    addIconBar(movie_id, movie_title);
}

//------------------------------------------------------
// Find/create elements
//------------------------------------------------------

function getLinkArea() {
    // If it already exists, just return it
    if ($('#imdbscout_header').length) {
        return $('#imdbscout_header');
    }
    var p = $('<p />').append('<h2>' + GM_config.get('imdbscout_header_text') + '</h2>').attr('id', 'imdbscout_header').css({
        'padding': '0px 20px',
        'font-weight': 'bold'
    });
    $.each(valid_states, function(i, name) {
        if (GM_config.get('one_line')) {
            p.append($('<span />').attr('id', 'imdbscout_' + name));
        } else {
            var title = $('<span>' + name.replace('_', ' ') + ': </span>').css({
                'textTransform': 'capitalize',
                'min-width': '100px',
                'display': 'inline-block'
            });
            p.append($('<div />').attr('id', 'imdbscout_' + name).append(title));
        }
    });
    if ($('h1.header:first').length) {
        $('h1.header:first').parent().append(p);
    } else if ($('#title-overview-widget').length) {
        $('#title-overview-widget').parent().append(p);
    } else {
        $('#tn15rating').before(p);
    }
    return $('#imdbscout_header');
}

//------------------------------------------------------
// Code being run (main)
//------------------------------------------------------

// Get everything configured

// Create the non-site dictionary for GM_config
var config_fields = {
    'imdbscout_header_text': {
        'label': 'Header text:',
        'type': 'text',
        'default': 'Pirate this film: '
    },
    'call_http_movie': {
        'section': 'Movie Page:',
        'type': 'checkbox',
        'label': 'Actually check for torrents?',
        'default': true
    },
    'load_on_start_movie': {
        'type': 'checkbox',
        'label': 'Load on start?',
        'default': true
    },
    'hide_missing_movie': {
        'type': 'checkbox',
        'label': 'Hide missing links?',
        'default': false
    },
    'use_icons_movie': {
        'type': 'checkbox',
        'label': 'Use icons instead of text?',
        'default': false
    },
    'one_line': {
        'type': 'checkbox',
        'label': 'Show results on one line?',
        'default': true
    },
    'call_http_search': {
        'section': 'Search Page:',
        'type': 'checkbox',
        'label': 'Actually check for torrents?',
        'default': true
    },
    'load_on_start_search': {
        'type': 'checkbox',
        'label': 'Load on start?',
        'default': true
    },
    'hide_missing_search': {
        'type': 'checkbox',
        'label': 'Hide missing links?',
        'default': false
    },
    'use_icons_search': {
        'type': 'checkbox',
        'label': 'Use icons instead of text?',
        'default': false
    }
};

// Add each site to a GM_config dictionary schema
// The GM_config default for checkboxes is false
$.each(sites, function(index, site) {
        config_fields['show_' + site['name'] + (site['TV'] ? '_TV' : '')] = {
            'section': (index == 0) ? ['Torrents:'] : '',
            'type': 'checkbox',
            'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
        };
});

// Icon sites should be shown by default though,
// since they barely use any resources.
$.each(icon_sites, function(index, icon_site) {
    config_fields['show_icon_' + icon_site['name']] = {
        'section': (index == 0) ? ['Other sites:'] : '',
        'type': 'checkbox',
        'label': ' ' + icon_site['name'],
        'default': ('showByDefault' in icon_site) ?
            icon_site['showByDefault'] : true
    };
});

// Initialize and register GM_config
GM_config.init({
    'id': 'imdb_scout',
    'title': 'IMDb Scout Preferences',
    'fields': config_fields,
    'css':  '.section_header { \
                background: white   !important; \
                color:  black       !important; \
                border: 0px         !important; \
                text-align: left    !important;} \
             .field_label { \
                font-weight: normal !important;}',
    'events':
    {
        'open': function() {
            $('#imdb_scout').contents().find('#imdb_scout_section_2').find('.field_label').each(function(index, label) {
                url = new URL(sites[index].searchUrl);
                $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname)  + '</a>');
                $(label).prepend(getFavicon(sites[index], true));
            });
            $('#imdb_scout').contents().find('#imdb_scout_section_3').find('.field_label').each(function(index, label) {
                $(label).prepend(getFavicon(icon_sites[index], true));
            });
        }
    }
});
GM_registerMenuCommand('IMDb Scout Preferences', function() {GM_config.open()});

// Fetch per-site values from GM_config
$.each(sites, function(index, site) {
    site['show'] = GM_config.get('show_' + site['name'] +
                                 (site['TV'] ? '_TV' : ''));
});

$.each(icon_sites, function(index, icon_site) {
    icon_site['show'] = GM_config.get('show_icon_' + icon_site['name']);
});

// Are we on a search page?
// This variable is camelCased to show it's global
// Hopefully it can be factored out of the global scope in the future
var onSearchPage = Boolean(location.href.match('search'));

$('title').ready(function() {
if (!onSearchPage && GM_config.get('load_on_start_movie')) {
        performPage();
} else if (onSearchPage && GM_config.get('load_on_start_search')) {
        performSearch();
} else {
    displayButton();
}
});
