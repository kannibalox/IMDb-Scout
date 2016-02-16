// ==UserScript==
// @name           IMDb Scout
// @namespace      https://greasyfork.org/users/1057-kannibalox
// @description    Add links from IMDb pages to torrent sites -- easy downloading from IMDb
//
// Preference window for userscripts, hosted by greasyfork:
// @require     https://greasyfork.org/libraries/GM_config/20131122/GM_config.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
//
// @version        3.4
// @include        http://*.imdb.com/title/tt*
// @include        http://*.imdb.de/title/tt*
// @include        http://*.imdb.es/title/tt*
// @include        http://*.imdb.fr/title/tt*
// @include        http://*.imdb.it/title/tt*
// @include        http://*.imdb.pt/title/tt*
// @include        http://*.imdb.com/search/title*
// @include        http://*.imdb.de/search/title*
// @include        http://*.imdb.es/search/title*
// @include        http://*.imdb.fr/search/title*
// @include        http://*.imdb.it/search/title*
// @include        http://*.imdb.pt/search/title*
//
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

--------------------------------------------------------*/


if (window.top != window.self)  //don't run on frames or iframes
{
    //Optional: GM_log ('In frame');
    return;
}

//------------------------------------------------------
// A list of all the sites, and the data necessary to
// check IMDb against them.
// Each site is a dictionary with the following attributes:
//  - name: The site name, abbreviated
//  - searchUrl: The URL to perform the search against, see below for how
//    to tailor the string to a site
//  - matchRegex: The string which appears if
//    the searchUrl DOESN'T return a result
//  - postiveMatch: Changes the test to return true if the
//    searchUrl DOES return a result that matches matchRegex
//  - TV (optional): If true, it means that this site will only
//    show up on TV pages. By default, sites only show up on movie pages
//  - both (optional): Means that the site will show up
//    on both movie and TV pages
// To create a search URL, there are four parameters
// you can use inside the URL:
//  - %tt%: The IMDb id with the tt prefix (e.g. tt0055630)
//  - %nott%: The IMDb id without the tt prefix (e.g. 0055630)
//  - %search_string%: The movie title (e.g. Yojimbo)
//  - %year%: The movie year (e.g. 1961)
// See below for examples
//------------------------------------------------------

var sites = [
{   'name': 'ADC',
    'searchUrl': 'https://asiandvdclub.org/browse.php?descr=1&btnSubmit=Submit&search=%tt%',
    'matchRegex': /Your search returned zero results|<h1>You need cookies enabled to log in.<\/h1>/,
    'both': true},
{   'name': 'AHD',
    'searchUrl': 'https://awesome-hd.me/torrents.php?id=%tt%',
    'matchRegex': /<h2>Error 404<\/h2>/},
{   'name': 'AHD',
    'searchUrl': 'https://awesome-hd.me/torrents.php?searchstr=%search_string%',
    'matchRegex': /<h2>Error 404<\/h2>/,
    'TV': true},
{   'name': 'AT',
    'searchUrl': 'https://avistaz.to/torrents?in=0&search=%tt%',
    'matchRegex': 'No torrents found!',
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
    'searchUrl': 'https://www.bithq.org/search.php?search=%search_string%&options=AND&in=original&incldead=1',
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
    'matchRegex': /<h2>Nothing found!<\/h2>|<h1>Not logged in!<\/h1>/},
{   'name': 'CG-c',
    'searchUrl': 'https://cinemageddon.net/cocks/endoscope.php?what=imdb&q=%tt%',
    'matchRegex': /<h2>Nothing found!<\/h2>|<h1>Not logged in!<\/h1>/},
{   'name': 'Classix',
    'searchUrl': 'http://classix-unlimited.co.uk/torrents-search.php?search=%search_string%',
    'matchRegex': /Nothing Found<\/div>/},
{   'name': 'D-noid',
    'searchUrl': 'http://www.demonoid.pw/files/?query=%tt%',
    'matchRegex': /<b>No torrents found<\/b>|We are currently performing the daily site maintenance.<br>/,
    'both': true},
{   'name': 'DHive',
    'searchUrl': 'https://gks.gs/sphinx/?category=0&prez=&sort=normal&order=desc&q=%tt%',
    'matchRegex': /Votre Recherche aucun|<h1>Mot de passe<\/h1>/},
{   'name': 'DVDSeed',
    'searchUrl': 'http://www.dvdseed.eu/browse2.php?search=%tt%&wheresearch=2&incldead=1&polish=0&nuke=0&rodzaj=0',
    'matchRegex': /Nic tutaj nie ma!<\/h2>/},
{   'name': 'ET',
    'searchUrl': 'http://eutorrents.to/index.php?page=torrents&options=3&active=0&search=%tt%',
    'matchRegex': /No torrents found!/},
{   'name': 'eThor',
    'searchUrl': 'http://ethor.net/browse.php?stype=b&c23=1&c20=1&c42=1&c5=1&c19=1&c25=1&c6=1&c37=1&c43=1&c7=1&c9=1&advcat=0&incldead=0&includedesc=1&search=%tt%',
    'matchRegex': /Try again with a refined search string.|<h1>Note: Vous devez activer vos 'cookies' pour pouvoir vous identifier.<\/h1>/},
{   'name': 'FL',
    'searchUrl': 'https://filelist.ro/browse.php?search=%tt%',
    'matchRegex': /Broblem \?|Nu s-a gasit nimic!/,
    'both': true},
{   'name': 'Fresh',
    'searchUrl': 'http://freshon.tv/browse.php?search=%search_string%',
    'matchRegex': /Nothing found!<\/h2>/,
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
    'matchRegex': /<h2>Nothing found!<\/h2>|( 0 torrents )/},
{   'name': 'IPT',
    'searchUrl': 'https://www.iptorrents.com/torrents/?q=%search_string%',
    'matchRegex': /<h2>Nothing found!<\/h2>|( 0 torrents )/,
    'TV': true},
{   'name': 'KASS',
    'searchUrl': 'https://kat.cr/usearch/imdb%3A%nott%',
    'matchRegex': /<h2>Nothing found!<\/h2>/},
{   'name': 'KASS',
    'searchUrl': 'https://kat.cr/usearch/%search_string%',
    'matchRegex': /<h2>Nothing found!<\/h2>/,
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
    'searchUrl': 'https://tp.m-team.cc/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search=%tt%&search_area=4&search_mode=2',
    'matchRegex': /Nothing here!|Try again with a refined search string./},
{   'name': 'MS',
    'searchUrl': 'http://www.myspleen.org/browse.php?search=%search_string%&title=1&cat=0',
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
{   'name': 'PTP',
    'searchUrl': 'https://tls.passthepopcorn.me/torrents.php?imdb=%tt%',
    'matchRegex': /<h2>Your search did not match anything.<\/h2>/},
{   'name': 'PTP-Req',
    'searchUrl': 'https://tls.passthepopcorn.me/requests.php?submit=true&search=%tt%',
    'matchRegex': /Nothing found!|<h1>Keep me logged in.<\/h1>/},
{   'name': 'PxHD',
    'searchUrl': 'https://pixelhd.me/torrents.php?groupname=&year=&tmdbover=&tmdbunder=&tmdbid=&imdbover=&imdbunder=&imdbid=%tt%&order_by=time&order_way=desc&taglist=&tags_type=1&filterTorrentsButton=Filter+Torrents',
    'matchRegex': /<h2>Your search did not match anything.<\/h2>/},
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
    'searchUrl': 'https://sceneaccess.org/browse?method=3&search=%tt%',
    'matchRegex': /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/},
{   'name': 'SCC',
    'searchUrl': 'https://sceneaccess.org/browse?search=%search_string%&method=2',
    'matchRegex': /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/,
    'TV': true},
{   'name': 'SCC-ARC',
    'searchUrl': 'https://sceneaccess.org/archive?=&method=3&search=%tt%',
    'matchRegex': /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/},
{   'name': 'SCC-ARC',
    'searchUrl': 'https://sceneaccess.org/archive?search=%search_string%&method=1',
    'matchRegex': /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/,
    'TV': true},
{   'name': 'SCC-NS',
    'searchUrl': 'https://sceneaccess.org/nonscene?=&method=3&search=%tt%',
    'matchRegex': /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/},
{   'name': 'SCC-NS',
    'searchUrl': 'https://sceneaccess.org/nonscene?search=%search_string%&method=2',
    'matchRegex': /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/,
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
    'searchUrl': 'http://www.t411.in/torrents/search/?name=%search_string%&description=&file=&user=&cat=210&subcat=&search=%40name+%search_string%+&submit=Recherche',
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
    'searchUrl': 'https://horrorcharnel.kicks-ass.org/more_details.php?mid=%nott%',
    'matchRegex': /<h1>Not logged in!<\/h1>|not currently on <span style="font-weight: bold;">The Horror Charnel<\/span>\./},
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

icon_sites = [
{   'name': 'OpenSubtitles',
    'icon': 'http://www.opensubtitles.org/favicon.ico',
    'searchUrl': 'http://www.opensubtitles.org/en/search/imdbid-%tt%'},
{   'name': 'YouTube.com',
    'icon': 'https://www.youtube.com/favicon.ico',
    'searchUrl': 'https://www.youtube.com/results?search_query="%search_string%"'},
{   'name': 'Rotten Tomatoes',
    'icon': 'https://www.rottentomatoes.com/favicon.ico',
    'searchUrl': 'https://www.rottentomatoes.com/search/?search=%search_string%'},
{   'name': 'Criticker',
    'icon': 'http://www.criticker.com/favicon.ico',
    'searchUrl': 'http://www.criticker.com/?st=movies&h=%search_string%&g=Go'},
{   'name': 'iCheckMovies',
    'icon': 'https://www.icheckmovies.com/favicon.ico',
    'searchUrl': 'https://www.icheckmovies.com/search/movies/?query=%tt%'},
{   'name': 'Letterboxd',
    'icon': 'http://letterboxd.com/favicon.ico',
    'searchUrl': 'http://letterboxd.com/imdb/%nott%'},
{   'name': 'Subscene',
    'icon': 'http://subscene.com/favicon.ico',
    'searchUrl': 'http://subscene.com/subtitles/title?q=%search_string%'},
{   'name': 'SubtitleSeeker',
    'icon': 'http://www.subtitleseeker.com/favicon.ico',
    'searchUrl': 'http://www.subtitleseeker.com/%nott%/Movie/Releases/English/'},
{   'name': 'Wikipedia',
    'icon': 'https://www.wikipedia.org/static/favicon/wikipedia.ico',
    'searchUrl': 'https://en.wikipedia.org/w/index.php?search=%search_string%&go=Go'},
{   'name': 'FilmAffinity',
    'icon': 'http://www.filmaffinity.com/favicon.ico',
    'searchUrl': 'http://www.filmaffinity.com/en/advsearch.php?stext=%search_string%&stype[]=title&fromyear=%year%&toyear=%year%',
    'showByDefault': false},
{   'name': 'Metacritic',
    'icon': 'http://www.metacritic.com/favicon.ico',
    'searchUrl': 'http://www.metacritic.com/search/all/%search_string%/results?cats[movie]=1&cats[tv]=1&search_type=advanced&sort=relevancy',
    'showByDefault': false},
{   'name': 'Can I Stream.It? (Movie)',
    'icon': 'http://www.canistream.it/favicon.ico',
    'searchUrl': 'http://www.canistream.it/search/movie/%search_string%',
    'showByDefault': false},
{   'name': 'Can I Stream.It? (TV)',
    'icon': 'http://www.canistream.it/favicon.ico',
    'searchUrl': 'http://www.canistream.it/search/tv/%search_string%',
    'showByDefault': false},
{   'name': 'AllMovie',
    'icon': 'http://www.allmovie.com/favicon.ico',
    'searchUrl': 'http://www.allmovie.com/search/movies/%search_string%',
    'showByDefault': false},
{   'name': 'Facebook',
    'icon': 'https://www.facebook.com/favicon.ico',
    'searchUrl': 'https://www.facebook.com/search/str/%search_string%/keywords_pages',
    'showByDefault': false},
{   'name': 'Amazon',
    'icon': 'http://www.amazon.com/favicon.ico',
    'searchUrl': 'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dmovies-tv&field-keywords=%search_string%',
    'showByDefault': false},
{   'name': 'Netflix',
    'icon': 'https://whatimg.com/i/jOa2ac.png',
    'searchUrl': 'http://www.netflix.com/search/%search_string%',
    'showByDefault': false},
{   'name': 'Blu-ray.com',
    'icon': 'http://www.blu-ray.com/favicon.ico',
    'searchUrl': 'http://www.blu-ray.com/search/?quicksearch=1&quicksearch_country=all&quicksearch_keyword=%search_string%+&section=bluraymovies'}
];

function replaceSearchUrlParams(search_url, movie_id, movie_title) {
    // If an array, do a little bit of recursion
    if ($.isArray(search_url)) {
        search_array = [];
        $.each(search_url, function(index, url) {
            search_array[index] = replaceSearchUrlParams(url, movie_id, movie_title);
        });
        return search_array;
    }
    var search_string = movie_title.replace(/ +\(.*/, '').replace(/[^a-zA-Z0-9]/g, ' ').replace(/ +/g, '+');
    var movie_year = document.title.replace(/^(.+) \((.*)([0-9]{4})(.*)$/gi, '$3');
    return search_url.replace(/%tt%/g, 'tt' + movie_id)
                     .replace(/%nott%/g, movie_id)
                     .replace(/%search_string%/g, search_string)
                     .replace(/%year%/g, movie_year);
}

// Adds search links to an element
function addLink(elem, search_url, link_text, strikeout, error) {
    var a = $('<a />').attr('href', search_url).attr('target', '_blank');

    if (strikeout) {
        a.append($('<s />').append(link_text));
    } else {
        a.append(link_text);
    }
    if (error) {
        a.css('color', 'red');
    }

    if (!onSearchPage) {
        // A little bit of trickery to make matches appear first in a list
        if (strikeout) {
            $('#imdbscout_header').append(a).append(' ');
        } else {
            $('#imdbscout_found').append(a).append(' ');
        }
    } else {
        var result_box = $(elem).find('td.result_box');
        if (result_box.length > 0) {
            $(result_box).append(a);
        } else {
            $(elem).append($('<td />').append(a).addClass('result_box'));
        }
    }
}

// Performs an ajax request to determine
// whether or not a url should be displayed
function maybeAddLink(elem, link_text, search_url, search_fail_match, success_match) {
    if (typeof(success_match) === 'undefined') success_match = false;
    // If the search URL is an array, recurse briefly on the elements.
    if ($.isArray(search_url)) {
        $.each(search_url, function(index, url) {
            maybeAddLink(elem, link_text + '_' + (index + 1).toString(), url, search_fail_match, success_match);
        });
        return;
    }
    GM_xmlhttpRequest({
        method: 'GET',
        url: search_url,
        onload: function(response_details) {
            if (String(response_details.responseText).match(search_fail_match) ? !(success_match) : success_match) {
                if (onSearchPage ? GM_config.get('strikeout_links_search') : GM_config.get('strikeout_links_movie')) {
                    addLink(elem, search_url, link_text, true);
                }
                // If we're on the search page and it isn't found on PTP
                if (onSearchPage && link_text == 'PTP') {
                    var box = $(elem).find('td.result_box');
                    if (box.length > 0) {
                        box.css('background-color', 'green');
                    } else {
                        $(elem).append($('<td />').css('background-color', 'green').addClass('result_box'));
                    }
                }
            } else {
                addLink(elem, search_url, link_text, false);
            }
        },
	onerror: function(response) {
            addLink(elem, search_url, link_text, true, true);
	},
	onabort: function(response) {
            addLink(elem, search_url, link_text, true, true);
	}
    });
}

// Run code to create fields and display sites
function perform(elem, movie_id, movie_title, is_tv, is_movie) {
    site_shown = false;
    $.each(sites, function(index, site) {
        if (site['show']) {
            site_shown = true;
            // If we're on a TV page, only show TV links.
            if ((Boolean(site['TV']) == is_tv ||
                 Boolean(site['both'])) ||
                (!is_tv && !is_movie)) {
                searchUrl = replaceSearchUrlParams(site['searchUrl'], movie_id, movie_title);
                if ((!onSearchPage && GM_config.get('call_http_movie')) ||
                    (onSearchPage && GM_config.get('call_http_search'))) {
                    maybeAddLink(elem, site['name'], searchUrl, site['matchRegex'], site['positiveMatch']);
                } else {
                    addLink(elem, searchUrl, site['name'], false);
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
            var search_url = replaceSearchUrlParams(site['searchUrl'],
                                                    movie_id, movie_title);
            var image = $('<img />').attr({'style': '-moz-opacity: 0.4;',
                                           'width': '16',
                                           'border': '0',
                                           'src': site['icon'],
                                           'title': site['name']});
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
        styles += '.result_box a { margin-right: 5px; color: #444;} ';
        styles += ' .result_box a:visited { color: red;}';
        styles += ' #content-2-wide #main, #content-2-wide';
        styles += '.maindetails_center {margin-left: 5px; width: 1001px;} ';
    GM_addStyle(styles);

    //Loop through each result row
    $('div#main table.results tr.detailed').each(function() {
        var link = $(this).find('.title>a');
        var is_tv = Boolean($(this).find('.year_type').html()
                            .match('TV Series'));
        var is_movie = Boolean($(this).find('.year_type').html()
                               .match(/\(([0-9]*)\)/));
        movie_title = link.html();
        movie_id = link.attr('href').match(/tt([0-9]*)\/?$/)[1];

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
    var p = $('<p />').append(GM_config.get('imdbscout_header_text')).attr('id', 'imdbscout_header').attr('style', 'font-weight:bold; color:black; background-color: lightgray;');
    p.append($('<span />').attr('id', 'imdbscout_found'));
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
        'type': 'checkbox',
        'label': 'Actually check for torrents on movie page?',
        'default': true
    },
    'call_http_search': {
        'type': 'checkbox',
        'label': 'Actually check for torrents on search page?',
        'default': true
    },
    'load_on_start': {
        'type': 'checkbox',
        'label': 'Load on start on movie page?',
        'default': true
    },
    'load_on_start_search': {
        'type': 'checkbox',
        'label': 'Load on start on search page?',
        'default': true
    },
    'strikeout_links_search': {
        'type': 'checkbox',
        'label': 'Strike out links on search page?',
        'default': true
    },
    'strikeout_links_movie': {
        'type': 'checkbox',
        'label': 'Strike out links on movie page?',
        'default': true
    }
};

// Add each site to a GM_config dictionary schema
// The GM_config default for checkboxes is false
$.each(sites, function(index, site) {
    config_fields['show_' + site['name'] + (site['TV'] ? '_TV' : '')] = {
        'type': 'checkbox',
        'label': 'Show ' + site['name'] + (site['TV'] ? ' (TV)' : '') + '?'
    };
});

// Icon sites should be shown by default though,
// since they barely use any resources.
$.each(icon_sites, function(index, icon_site) {
    config_fields['show_icon_' + icon_site['name']] = {
        'type': 'checkbox',
        'label': 'Show ' + icon_site['name'] + ' icon?',
        'default': ('showByDefault' in icon_site) ?
            icon_site['showByDefault'] : true
    };
});

// Initialize and register GM_config
GM_config.init({
    'id': 'imbd_scout',
    'title': 'IMDb Scout Preferences',
    'fields': config_fields
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
if (!onSearchPage && GM_config.get('load_on_start')) {
        performPage();
} else if (onSearchPage && GM_config.get('load_on_start_search')) {
        performSearch();
} else {
    displayButton();
}
});
