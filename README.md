# IMDb-Scout
Add links in IMDb pages to torrent sites -- easy downloading from IMDb

Greasemonkey is currently not supported. Try alternatives such as Violentmonkey or Tampermonkey.

## Usage

Currently the script works on both individual pages (e.g. https://www.imdb.com/title/tt4131188/), and the advanced title search (e.g. https://www.imdb.com/search/title/?title=test)

## Contributing

The [Github repository](https://github.com/kannibalox/IMDb-Scout) is the best place to report bugs and submit changes, however I will still make an effort to check the [GreasyFork](https://greasyfork.org/en/scripts/3967-imdb-scout) page or any other relevant places.

## Adding new sites

Inside the script, there is a list of dictionaries that contains of all the sites, and the data necessary to check IMDb against them.
Each site is a dictionary with the following attributes:
  - `name`: The site name, abbreviated
  - `searchUrl`: The URL to perform the search against, see below for how to tailor the string to a site
  - `matchRegex`: The string which appears if the searchUrl *doesn't* return a result
  - `postiveMatch` (optional): Changes the test to return true if the searchUrl *does* return a result that matches matchRegex
  - `TV` (optional): If true, it means that this site will only show up on TV pages. By default, sites only show up on movie pages
  - `both` (optional): Means that the site will show up on both movie and TV pages

To create a search URL, there are four parameters you can use inside the URL:
  - %tt%: The IMDb id with the tt prefix (e.g. tt0055630)
  - %nott%: The IMDb id without the tt prefix (e.g. 0055630)
  - %search_string%: The movie title (e.g. Yojimbo)
  - %year%: The movie year (e.g. 1961)

See the script for examples.

## Versioning
Follows a bastardization of the [semver](http://semver.org/) standard:
* Patch versions will not change behavior, only the URL/settings for trackers.
* Minor versions will definitely change code, although behavior may in fact remain the same.
* Major versions will definitely change behavior, although it will only be increased at the discretion of the current maintainer.
