export interface CountryLocation {
  code: string;
  name: string;
  subdivisions: Record<string, string[]>; // Province/State -> list of 10-20 cities
}

export const LOCATIONS: Record<string, CountryLocation> = {
  Canada: {
    code: 'CA',
    name: 'Canada',
    subdivisions: {
      Ontario: [
        'Toronto', 'Ottawa', 'Hamilton', 'London', 'Windsor', 'Kingston',
        'Kitchener', 'Waterloo', 'Brampton', 'Mississauga', 'Markham', 'Vaughan',
        'St. Catharines', 'Niagara Falls', 'Guelph', 'Oshawa', 'Barrie', 'Sudbury'
      ],
      Quebec: [
        'Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke',
        'Saguenay', 'Levis', 'Trois-Rivieres', 'Terrebonne', 'Saint-Jean-sur-Richelieu',
        'Brossard', 'Repentigny', 'Drummondville'
      ],
      'British Columbia': [
        'Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond', 'Kelowna',
        'Abbotsford', 'Coquitlam', 'Saanich', 'Delta', 'Kamloops', 'Nanaimo',
        'Chilliwack', 'Prince George', 'Vernon', 'Penticton'
      ],
      Alberta: [
        'Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat',
        'Grande Prairie', 'Airdrie', 'Spruce Grove', 'Leduc', 'Fort McMurray',
        'Cochrane', 'Okotoks', 'Camrose'
      ],
      Manitoba: [
        'Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie',
        'Winkler', 'Selkirk', 'Morden', 'Dauphin', 'The Pas'
      ],
      Saskatchewan: [
        'Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current',
        'Yorkton', 'North Battleford', 'Warman', 'Weyburn', 'Estevan'
      ],
      'Nova Scotia': [
        'Halifax', 'Sydney', 'Truro', 'New Glasgow', 'Glace Bay', 'Kentville',
        'Amherst', 'Bridgewater', 'Yarmouth', 'Greenwood'
      ],
      'New Brunswick': [
        'Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Miramichi',
        'Edmundston', 'Bathurst', 'Campbellton', 'Oromocto'
      ],
      'Newfoundland and Labrador': [
        'St. John\'s', 'Mount Pearl', 'Corner Brook', 'Conception Bay South',
        'Paradise', 'Grand Falls-Windsor', 'Gander', 'Labrador City', 'Stephenville'
      ],
      'Prince Edward Island': [
        'Charlottetown', 'Summerside', 'Stratford', 'Cornwall', 'Montague',
        'Kensington', 'Souris'
      ],
      'Northwest Territories': ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith'],
      Yukon: ['Whitehorse', 'Dawson City', 'Watson Lake'],
      Nunavut: ['Iqaluit', 'Rankin Inlet', 'Arviat']
    }
  },
  'United States': {
    code: 'US',
    name: 'United States',
    subdivisions: {
      Alabama: ['Birmingham', 'Montgomery', 'Huntsville', 'Mobile', 'Tuscaloosa', 'Hoover', 'Auburn', 'Dothan', 'Decatur', 'Madison'],
      Alaska: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan', 'Wasilla', 'Kenai', 'Kodiak'],
      Arizona: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Gilbert', 'Tempe', 'Peoria', 'Surprise', 'Yuma', 'Flagstaff'],
      Arkansas: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'North Little Rock', 'Conway', 'Rogers', 'Bentonville'],
      California: ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine', 'Chula Vista'],
      Colorado: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Pueblo', 'Greeley', 'Boulder'],
      Connecticut: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'Bristol', 'Meriden'],
      Delaware: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna', 'Milford', 'Seaford'],
      Florida: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg', 'Hialeah', 'Port St. Lucie', 'Cape Coral', 'Tallahassee', 'Fort Lauderdale', 'Sarasota', 'Pensacola'],
      Georgia: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens', 'Sandy Springs', 'Roswell', 'Johns Creek', 'Warner Robins'],
      Hawaii: ['Honolulu', 'East Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu', 'Kaneohe', 'Mililani Town'],
      Idaho: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Caldwell', 'Pocatello', 'Coeur d\'Alene', 'Twin Falls'],
      Illinois: ['Chicago', 'Aurora', 'Joliet', 'Naperville', 'Rockford', 'Elgin', 'Springfield', 'Peoria', 'Champaign', 'Waukegan'],
      Indiana: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Fishers', 'Bloomington', 'Hammond', 'Gary', 'Lafayette'],
      Iowa: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Waterloo', 'Ames', 'West Des Moines', 'Council Bluffs'],
      Kansas: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka', 'Lawrence', 'Shawnee', 'Manhattan', 'Lenexa'],
      Kentucky: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington', 'Richmond', 'Georgetown', 'Florence'],
      Louisiana: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles', 'Bossier City', 'Kenner', 'Monroe'],
      Maine: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Biddeford', 'Sanford', 'Augusta'],
      Maryland: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie', 'Hagerstown', 'Annapolis', 'College Park'],
      Massachusetts: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton', 'Quincy', 'Lynn', 'New Bedford', 'Fall River'],
      Michigan: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor', 'Lansing', 'Dearborn', 'Flint', 'Kalamazoo'],
      Minnesota: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park', 'Plymouth', 'Woodbury'],
      Mississippi: ['Jackson', 'Gulfport', 'Southaven', 'Biloxi', 'Hattiesburg', 'Olive Branch', 'Tupelo', 'Meridian'],
      Missouri: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit', 'O\'Fallon', 'St. Joseph'],
      Montana: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte', 'Helena', 'Kalispell'],
      Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney', 'Fremont', 'Hastings'],
      Nevada: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks', 'Carson City', 'Elko'],
      'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover', 'Rochester', 'Salem'],
      'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Lakeside', 'Edison', 'Woodbridge', 'Toms River', 'Hamilton', 'Trenton'],
      'New Mexico': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell', 'Farmington', 'Clovis'],
      'New York': ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica'],
      'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington', 'High Point', 'Asheville'],
      'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo', 'Williston', 'Dickinson'],
      Ohio: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Youngstown', 'Lorain'],
      Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond', 'Moore', 'Midwest City', 'Enid'],
      Oregon: ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro', 'Beaverton', 'Bend', 'Medford', 'Springfield', 'Corvallis'],
      Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Reading', 'Erie', 'Upper Darby', 'Scranton', 'Bethlehem', 'Lancaster', 'Harrisburg'],
      'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence', 'Woonsocket', 'Newport'],
      'South Carolina': ['Charleston', 'Columbia', 'North Charleston', 'Mount Pleasant', 'Rock Hill', 'Greenville', 'Summerville', 'Goose Creek', 'Hilton Head Island'],
      'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown', 'Mitchell', 'Yankton'],
      Tennessee: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City'],
      Texas: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Lubbock', 'Irvine', 'Garland', 'McAllen'],
      Utah: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem', 'Sandy', 'Ogden', 'St. George', 'Layton'],
      Vermont: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier', 'Winooski', 'St. Albans'],
      Virginia: ['Virginia Beach', 'Chesapeake', 'Norfolk', 'Richmond', 'Newport News', 'Alexandria', 'Hampton', 'Roanoke', 'Portsmouth', 'Lynchburg'],
      Washington: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent', 'Everett', 'Renton', 'Spokane Valley', 'Federal Way'],
      'West Virginia': ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling', 'Weirton', 'Fairmont'],
      Wisconsin: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton', 'Waukesha', 'Oshkosh', 'Eau Claire', 'Janesville'],
      Wyoming: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Sheridan', 'Green River']
    }
  }
};
