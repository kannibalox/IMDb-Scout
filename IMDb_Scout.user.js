// ==UserScript==
// @name           IMDb Scout
// @namespace      https://greasyfork.org/users/1057-kannibalox
// @description    Add links from IMDb pages to torrent sites -- easy downloading from IMDb
//
// Preference window for userscripts, hosted by greasyfork:
// @require     https://greasyfork.org/libraries/GM_config/20131122/GM_config.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
//
// @version        4.8.2
// @include        http*://*.imdb.tld/title/tt*
// @include        http*://*.imdb.tld/search/title*
// @include        http*://*.imdb.com/title/tt*
// @include        http*://*.imdb.com/search/title*
// @include        http*://*iloveclassics.com/viewrequests.php?*
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

4.3.8   -    Fix SurrealMoviez and MySpleen, switch to new PTP url

4.3.9   -    Fix criticker, add CN

4.3.10  -    Fix Netflix, MTV

4.3.11  -    Add CHD back

4.3.12  -    Fix typo

4.4     -    Fix BeyondHD
        -    Allow unicode when searching by name

4.4.1   -    Add trakt.tv

4.4.2   -    Added XS, HD-S, PTN, TBD, Blutopia
        -    Removed Freshon, CN, ExT, t411, SCC
        -    Fixed SC, TE, TG, Tik
        -    Add .com for script runners that don't support .tld

4.5     -    (Chameleon)
        -    Added an option to run on ILC request pages
        -    Fixed running on reference pages (new imdb style)
        -    Added a delay of 1 second between loading the same site (by domain) - no more popcorn quota timeouts
        -    Fixed running on search pages

4.5.1   -    Removed (dead): BitHQ, TehC, FSS, ExtraTorrent, Cine-Clasico, and Secret-Cinema
        -    Fixed the hack on goToUrl

4.5.2   -    Fixed filelist.ro, Tik, TD
        -    Added HDHome, HDU, OurBits

4.5.3   -    Fixed TG, TE, HDSpace
        -    Added XS

4.5.4   -    Fixed HDU

4.5.5   -    Fixed BHD

4.6     -    Option to highlight if the movie is missing from PTP

4.7     -    Added option to ignore the movie/tv distinction

4.7.1   -    Fix blutopia, hdchina, indenting

4.7.2   -    Fix SDBits, M-T
        -    Add TTGg

4.7.3   -    Enable on https versions of imdb sites
        -    Add TTG

4.8.0   -    Add FinVip, JoyHD, TO, TP, TS, TVCK
        -    Fix TE, HDH, CZ, Subscene
        -    Remove SubtitleSeeker
        -    Rip out all site-specific code
        -    Fix up minor code smells
        -    Allow config name to be different from site name

4.8.1   -    Add SP

4.8.2   -    Add TMDB
-------------------------------------------------------*/

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
//  - postiveMatch (optional):
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
//  - configName (optional):
//      Use this to allow changing names without breaking existing users.
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
  {   'name': 'Blutopia',
      'searchUrl': 'https://blutopia.xyz/search??imdb=%nott%',
      'both': true},
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
      'searchUrl': 'https://beyond-hd.me/browse.php?search=%tt%&searchin=title&incldead=1',
      'matchRegex': /Nothing found!|Please login or Register a personal account to access our user area and great community/},
  {   'name': 'BHD',
      'searchUrl': 'https://beyond-hd.me/browse.php?c40=1&c44=1&c48=1&c89=1&c46=1&c45=1&search=%search_string%&searchin=title&incldead=0',
      'matchRegex': /Nothing found!|Please login or Register a personal account to access our user area and great community/,
      'TV': true},
  {   'name': 'BitHD',
      'searchUrl': 'http://www.bit-hdtv.com/torrents.php?cat=0&search=%tt%',
      'matchRegex': /<h2>No match!<\/h2>/},
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
  {   'name': 'CG',
      'searchUrl': 'https://cinemageddon.net/browse.php?search=%tt%',
      'matchRegex': /<h2>Nothing found!<\/h2>/,
      'loggedOutRegex': 'Not logged in!'},
  {   'name': 'CG-c',
      'searchUrl': 'https://cinemageddon.net/cocks/endoscope.php?what=imdb&q=%tt%',
      'matchRegex': /<h2>Nothing found!<\/h2>/,
      'loggedOutRegex': 'Not logged in!'},
  {   'name': 'CHD',
      'searchUrl': 'https://chdbits.co/torrents.php?incldead=1&spstate=0&inclbookmarked=0&search_area=4&search_mode=0&search=%tt%',
      'matchRegex': /Nothing found/},
  {   'name': 'Classix',
      'searchUrl': 'http://classix-unlimited.co.uk/torrents-search.php?search=%search_string%',
      'matchRegex': /Nothing Found<\/div>/},
  {   'name': 'CZ',
      'configName': 'ET',
      'searchUrl': 'https://cinemaz.to/movies?search=&imdb=%tt%',
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true},
  {   'name': 'CZ',
      'configName': 'ET',
      'searchUrl': 'https://cinemaz.to/tv-shows?search=&imdb=%tt%',
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'Demnoid',
      'searchUrl': 'http://www.demonoid.pw/files/?query=%tt%',
      'matchRegex': /<b>No torrents found<\/b>|We are currently performing the daily site maintenance.<br>/,
      'both': true},
  {   'name': 'DVDSeed',
      'searchUrl': 'http://www.dvdseed.eu/browse2.php?search=%tt%&wheresearch=2&incldead=1&polish=0&nuke=0&rodzaj=0',
      'matchRegex': /Nic tutaj nie ma!<\/h2>/},
  {   'name': 'eThor',
      'searchUrl': 'http://ethor.net/browse.php?stype=b&c23=1&c20=1&c42=1&c5=1&c19=1&c25=1&c6=1&c37=1&c43=1&c7=1&c9=1&advcat=0&incldead=0&includedesc=1&search=%tt%',
      'matchRegex': /Try again with a refined search string.|<h1>Note: Vous devez activer vos 'cookies' pour pouvoir vous identifier.<\/h1>/},
  {   'name': 'FL',
      'searchUrl': 'https://filelist.ro/browse.php?search=%nott%',
      'matchRegex': /<h2>Nu s-a găsit nimic!<\/h2>/,
      'both': true},
  {   'name': 'FinVip',
      'searchUrl': 'https://finvip.org/index.php?page=torrents&search=%tt%&options=1',
      'matchRegex': /<td colspan="2" align="center"> <\/td>/},
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
      'searchUrl': 'https://hdchina.org/torrents.php?incldead=0&spstate=0&inclbookmarked=0&boardid=0&seeders=&search=%tt%&search_area=4&search_mode=2',
      'matchRegex': /Nothing found! Try again with a refined search string./},
  {   'name': 'HDClub',
      'searchUrl': 'http://hdclub.org/browse.php?webdl=0&3d=0&search=&incldead=0&dsearch=%tt%',
      'matchRegex': /Nothing was found|Ничего не найдено|Нічого не знайдено/,
      'both': true},
  {   'name': 'HDH',
      'configName': 'HDHome',
      'searchUrl': 'http://hdhome.org/torrents.php?search_area=4&search=%tt%',
      'matchRegex': /Nothing found! Try again with a refined search string/},
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
  {   'name': 'HDSpace',
      'icon': 'http://www.favicon.by/ico/5991df36e3635.ico',
      'searchUrl': 'https://hd-space.org/index.php?page=torrents&active=0&options=2&search=%nott%',
      'matchRegex': /<td colspan="2" align="center"> <\/td>|You’re not authorized to view the Torrents!<br \/>/,
      'both': true},
  {   'name': 'HDT',
      'icon': 'https://hdts.ru/favicon.ico',
      'searchUrl': 'http://hd-torrents.org/torrents.php?active=0&options=2&search=%tt%',
      'matchRegex': /No torrents here.../,
      'both': true},
  {   'name': 'HDU',
      'searchUrl': 'https://pt.upxin.net/torrents.php?search_area=4&search=%tt%',
      'matchRegex': /Nothing found! Try again with a refined search string/},
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
  {   'name': 'JoyHD',
      'searchUrl': 'http://www.joyhd.org/torrents.php?search_area=4&search=%tt%',
      'matchRegex': /Nothing found! Try again with a refined search string/},
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
      'searchUrl': 'https://tp.m-team.cc/torrents.php?incldead=1&spstate=0&inclbookmarked=0&search=%tt%&search_area=4&search_mode=0',
      'matchRegex': /Nothing here!|Try again with a refined search string./,
      'both': true},
  {   'name': 'MS',
      'searchUrl': 'http://www.myspleen.org/browse.php?search=%search_string%&title=0&cat=0',
      'matchRegex': /<strong>Nothing found!<\/strong>|<title>MySpleen :: Login<\/title>/,
      'both': true},
  {   'name': 'MTV',
      'searchUrl': 'https://www.morethan.tv/torrents.php?searchstr=%search_string%+%year%&tags_type=1&order_by=time&order_way=desc&group_results=1&filter_cat%5B1%5D=1&action=basic&searchsubmit=1',
      'matchRegex': /<h2>Your search did not match anything.<\/h2>/},
  {   'name': 'MTV',
      'searchUrl': 'https://www.morethan.tv/torrents.php?searchstr=%search_string%&tags_type=1&order_by=time&order_way=desc&group_results=1&filter_cat%5B2%5D=1&action=basic&searchsubmit=1',
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
  {   'name': 'NBL',
      'searchUrl': 'https://nebulance.io/torrents.php?order_by=time&order_way=desc&searchtext=%search_string%&search_type=0&taglist=&tags_type=0',
      'matchRegex': /Your search did not match anything/,
      'TV': true},
  {   'name': 'OurBits',
      'searchUrl': 'https://ourbits.club/torrents.php?search_area=4&search=%tt%',
      'matchRegex': /Nothing found! Try again with a refined search string/},
  {   'name': 'PHD',
      'searchUrl': 'https://privatehd.to/movies?search=&imdb=%tt%',
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true},
  {   'name': 'PHD',
      'searchUrl': 'https://privatehd.to/tv-shows?search=&imdb=%tt%',
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'PTN',
      'icon': 'https://piratethenet.org/pic/favicon.ico',
      'searchUrl': 'https://piratethenet.org/browseold.php?incldead=1&_by=3&search=%tt%',
      'matchRegex': /Nothing found!/,
      'both': true},
  {   'name': 'PTP',
      'searchUrl': 'https://passthepopcorn.me/torrents.php?imdb=%tt%',
      'matchRegex': /<h2>Your search did not match anything.<\/h2>/},
  {   'name': 'PTP-Req',
      'searchUrl': 'https://passthepopcorn.me/requests.php?submit=true&search=%tt%',
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
      'searchUrl': 'https://rutracker.org/forum/tracker.php?nm=%search_string%',
      'matchRegex': 'Не найдено',
      'both': true},
  {   'name': 'Rutor',
      'searchUrl': 'http://rutor.info/search/0/0/010/0/%tt%',
      'matchRegex': 'Результатов поиска 0',
      'both': true},
  {   'name': 'SC',
      'searchUrl': 'https://secret-cinema.pw/torrents.php?action=advanced&searchsubmit=1&filter_cat=1&cataloguenumber=%tt%&order_by=time&order_way=desc&tags_type=0',
      'matchRegex': /Your search did not match anything./},
  {   'name': 'SDBits',
      'searchUrl': 'https://sdbits.org/browse.php?c6=1&c3=1&c1=1&c4=1&c5=1&c2=1&m1=1&incldead=0&from=&to=&imdbgt=0&imdblt=10&uppedby=&imdb=&search=%tt%',
      'matchRegex': /Nothing found!|<h1>You need cookies enabled to log in.<\/h1>/},
  {   'name': 'sHD',
      'searchUrl': 'https://scenehd.org/browse.php?search=%tt%',
      'matchRegex': /<h2>No torrents found!<\/h2>/},
  {   'name': 'SM',
      'searchUrl': 'https://surrealmoviez.info/search.php?stext=%tt%',
      'matchRegex': /0 Movies found matching search criteria|You need to be logged in to view this page/},
  {   'name': 'SP',
      'searchUrl': 'http://www.scenepalace.info/browse.php?search=%nott%&cat=0&incldead=1',
      'matchRegex': /<h1>Not logged in!<\/h1>|<h2>Nothing found!<\/h2>/,
      'both': true},
  {   'name': 'TBD',
      'icon': 'https://1.bp.blogspot.com/-F2JeKtPCJYI/VgjpVxwMO4I/AAAAAAAAADg/VyNyp-yW9Ac/s1600/TBD.ico',
      'searchUrl': 'http://www.torrentbd.com/torrent/torrents-search.php?search=%search_string%',
      'matchRegex': /No torrents were found based on your search criteria./,
      'both': true},
  {   'name': 'TD',
      'searchUrl': 'https://www.torrentday.com/t?q=%tt%',
      'matchRegex': /No Torrents Found!/,
      'both': true},
  {   'name': 'TE',
      'searchUrl': 'https://theempire.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'matchRegex': /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/,
      'both': true},
  {   'name': 'TG',
      'searchUrl': 'https://thegeeks.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'matchRegex': /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/,
      'both': true},
  {   'name': 'TO',
      'searchUrl': 'https://theoccult.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'matchRegex': /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/,
      'both': true},
  {   'name': 'TP',
      'searchUrl': 'https://theplace.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'matchRegex': /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/,
      'both': true},
  {   'name': 'TS',
      'searchUrl': 'https://theshow.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'matchRegex': /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/,
      'both': true},
  {   'name': 'THC',
      'searchUrl': 'https://horrorcharnel.org/browse.php?search=%nott%&cat=0&incldead=1',
      'matchRegex': /<h1>Not logged in!<\/h1>|<h2>Nothing found!<\/h2>/},
  {   'name': 'Tik',
      'searchUrl': 'https://www.cinematik.net/browse.php?&cat=0&incldead=1&sort=1&type=asc&srchdtls=1&search=%tt%',
      'matchRegex': /The page you tried to view can only be used when you're logged in|Nothing found!/},
  {   'name': 'TL',
      'searchUrl': 'http://www.torrentleech.org/torrents/browse/index/query/%search_string%+%year%/categories/1,8,9,10,11,12,13,14,15,29',
      'matchRegex': /Signup With Invite|Please refine your search./},
  {   'name': 'TL',
      'searchUrl': 'http://www.torrentleech.org/torrents/browse/index/query/%search_string%/categories/2,26,27,32',
      'matchRegex': /Signup With Invite|Please refine your search./,
      'TV': true},
  {   'name': 'TPB',
      'searchUrl': 'https://thepiratebay.org/search/%tt%',
      'matchRegex': /No hits. Try adding an asterisk in you search phrase.<\/h2>/,
      'both': true},
  {   'name': 'TTG',
      'searchUrl': 'https://totheglory.im/browse.php?c=M&search_field=imdb%nott%',
      'matchRegex': /Didn't match any titles/},
  {   'name': 'TVCK',
      'searchUrl': 'https://www.tvchaosuk.com/browse.php?do=search&search_type=t_name&keywords=%search_string%',
      'matchRegex': /<b>Nothing Found<\/b>/},
  {   'name': 'TVV',
      'searchUrl': 'http://tv-vault.me/torrents.php?searchstr=%search_string%',
      'matchRegex': /Nothing found<\/h2>/,
      'TV': true},
  {   'name': 'UHDB',
      'searchUrl': 'https://uhdbits.org/torrents.php?action=advanced&groupname=%tt%',
      'matchRegex': /Your search did not match anything./},
  {   'name': 'x264',
      'searchUrl': 'http://x264.me/browse.php?incldead=0&xtype=0&stype=3&search=%tt%',
      'matchRegex': /Try again with a refined search string.|<h1>Forgot your password?<\/h1>/},
  {   'name': 'XS',
      'searchUrl': 'https://www.xspeeds.eu/browse.php?do=search&keywords=%search_string%&search_type=t_name&category=0&include_dead_torrents=yes',
      'matchRegex': /<b>Nothing Found<\/b>/}
];

var icon_sites = [
  {   'name': 'TMDB',
      'searchUrl': 'https://www.themoviedb.org/search?query=%search_string%'}, 
  {   'name': 'OpenSubtitles',
      'searchUrl': 'http://www.opensubtitles.org/en/search/imdbid-%tt%'},
  {   'name': 'YouTube.com',
      'searchUrl': 'https://www.youtube.com/results?search_query="%search_string%"+%year%+trailer'},
  {   'name': 'Rotten Tomatoes',
      'searchUrl': 'https://www.rottentomatoes.com/search/?search=%search_string%'},
  {   'name': 'Criticker',
      'searchUrl': 'https://www.criticker.com/?search=%search_string%&type=films'},
  {   'name': 'iCheckMovies',
      'searchUrl': 'https://www.icheckmovies.com/search/movies/?query=%tt%'},
  {   'name': 'Letterboxd',
      'searchUrl': 'http://letterboxd.com/imdb/%nott%'},
  {   'name': 'Subscene',
      'icon': 'https://subscene.com/favicon.ico',
      'searchUrl': 'https://subscene.com/subtitles/title?q=%search_string%'},
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
      'searchUrl': 'http://www.netflix.com/search/%search_string%',
      'showByDefault': false},
  {   'name': 'Blu-ray.com',
      'searchUrl': 'http://www.blu-ray.com/search/?quicksearch=1&quicksearch_country=all&quicksearch_keyword=%search_string%+&section=bluraymovies',
      'showByDefault': false},
  {   'name': 'trakt.tv',
      'icon': 'https://walter.trakt.tv/hotlink-ok/public/favicon.ico',
      'searchUrl': 'https://trakt.tv/search?query=%search_string%',
      'showByDefault': false}
];

// For internal use (order matters)
var valid_states = [
  'found',
  'missing',
  'logged_out',
  'error'
];

function replaceSearchUrlParams(site, movie_id, movie_title) {
  var search_url = site['searchUrl'];
  // If an array, do a little bit of recursion
  if ($.isArray(search_url)) {
    var search_array = [];
    $.each(search_url, function(index, url) {
      search_array[index] = replaceSearchUrlParams(url, movie_id, movie_title);
    });
    return search_array;
  }
  var space_replace = ('spaceEncode' in site) ? site['spaceEncode'] : '+';
  var search_string = movie_title.replace(/ +\(.*/, '').replace(/\s+/g, space_replace);
  var movie_year = document.title.replace(/^(.+) \((.*)([0-9]{4})(.*)$/gi, '$3');
  var s = search_url.replace(/%tt%/g, 'tt' + movie_id)
    .replace(/%nott%/g, movie_id)
    .replace(/%search_string%/g, search_string)
    .replace(/%year%/g, movie_year);
  return s;
}

function getPageSetting(key) {
  return (onSearchPage ? GM_config.get(key + '_search') : GM_config.get(key + '_movie'));
}

// Small utility function to return a site's icon
function getFavicon(site, hide_on_err) {
  if (typeof(hide_on_err) === 'undefined') { hide_on_err = false };
  if ('icon' in site) {
    var favicon = site['icon'];
  } else {
    var url = new URL(site['searchUrl']);
    var favicon = url.origin + '\/favicon.ico';
  }
  var img = $('<img />').attr({'style': '-moz-opacity: 0.4; border: 0; vertical-align: text-top',
                               'width': '16',
                               'src': favicon,
                               'title': site['name'],
                               'alt': site['name']});
  if (hide_on_err) { img.attr('onerror', "this.style.display='none';") };
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

  var domain = search_url.split('/')[2];
  var now = (new Date())*1;
  var lastLoaded = window.localStorage[domain+'_lastLoaded'];
  if (!lastLoaded) {
    lastLoaded = now - 5000;
  } else {
    lastLoaded = parseInt(lastLoaded);
  }
  if (now-lastLoaded < 1000) {
    window.setTimeout(maybeAddLink.bind(undefined, elem, site['name'], search_url, site), 1000);
    return;
  }
  else
  {
    window.localStorage[domain+'_lastLoaded']=(new Date())*1;
  }

  var target = search_url;
  if (site.goToUrl) {
    target = site.goToUrl;
  }
  var success_match = ('positiveMatch' in site) ? site['positiveMatch'] : false;
  GM_xmlhttpRequest({
    method: 'GET',
    url: search_url,
    onload: function(response_details) {
      if (String(response_details.responseText).match(site['matchRegex']) ? !(success_match) : success_match) {
        if (getPageSetting('highlight_missing').split(',').includes(site['name'])) {
          if (elem.style) {
            elem.parentNode.style.background = 'rgba(255,104,104,0.7)';
          } else {
            document.querySelector('#imdbscout_missing').style.background = 'rgba(255,104,104,0.7)';
          }
        }
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
          (!is_tv && !is_movie) || getPageSetting('ignore_type')) {
        searchUrl = replaceSearchUrlParams(site, movie_id, movie_title);
        if (site.goToUrl)
          site.goToUrl = replaceSearchUrlParams({
            'searchUrl': site['goToUrl'],
            'spaceEncode': ('spaceEncode' in site) ? site['spaceEncode'] : '+'
          }, movie_id, movie_title);
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
      var html = $('<span />').append("&nbsp;").attr('style', 'font-size: 11px;').append(
        $('<a />').attr('href', search_url)
          .addClass('iconbar_icon').append(image));
      iconbar.append(html).append();
    }
  });
  //If we have access to the openInTab function, add an Open All feature
  if (GM_openInTab) {
    var aopenall = $('<a />').text('Open All')
        .prepend("&nbsp;")
        .attr('href', 'javascript:;')
        .attr('style', 'font-weight:bold;font-size:11px;font-family: Calibri, Verdana, Arial, Helvetica, sans-serif;');
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

  if($('div#main table.results tr.detailed').length !== 0) {
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
  } else {
    // Chameleon code, in a different style
    var titleDivs = document.getElementsByClassName('col-title');
    var compact = true;
    if(titleDivs.length === 0)
    {
      titleDivs=document.getElementsByClassName('lister-item-header');
      compact=false;
    }
    for(var i=0; i<titleDivs.length; i++)
    {
      var t = titleDivs[i];
      var link = t.getElementsByTagName('a')[0];
      var is_tv = link.nextElementSibling.textContent.indexOf('-')!==-1;
      var is_movie = !is_tv;
      var movie_title = link.textContent;
      var movie_id = link.href.split("/title/tt")[1].split("/")[0];

      var elem = t.parentNode.parentNode;
      if(!compact)
        elem = t.parentNode;
      perform(elem, movie_id, movie_title, is_tv, is_movie);
    }
  }
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
  } else if ($('.titlereference-header').length) {
    $('.titlereference-header').append(p);
  } else {
    $('#tn15rating').before(p);
  }
  return $('#imdbscout_header');
}

//------------------------------------------------------
// Create the config name
//------------------------------------------------------

function configName(site) {
  if ('configName' in site) {
    return 'show_' + site['configName'] + (site['TV'] ? '_TV' : '');
  } else {
    return 'show_' + site['name'] + (site['TV'] ? '_TV' : '');
  }
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
  'ignore_type_movie': {
    'type': 'checkbox',
    'label': 'Search all sites, ignoring movie/tv distinction?',
    'default': false
  },
  'highlight_missing_movie': {
    'label': 'Highlight when not on:',
    'type': 'text',
    'default': ''
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
  },
  'ignore_type_search': {
    'type': 'checkbox',
    'label': 'Search all sites, ignoring movie/tv distinction?',
    'default': false
  },
  'highlight_missing_search': {
    'label': 'Highlight when not on:',
    'type': 'text',
    'default': ''
  }
};

// Add each site to a GM_config dictionary schema
// The GM_config default for checkboxes is false
$.each(sites, function(index, site) {
  config_fields[configName(site)] = {
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
  site['show'] = GM_config.get(configName(site));
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
