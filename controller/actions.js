import  express  from "express";
const router=express.Router();
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Auth from '../auth.js';
import Account from "../models/account.js";


const movies=[{"Title":"Avatar: The Way of Water","Year":"2022","Rated":"PG-13","Released":"16 Dec 2022","Runtime":"192 min","Genre":"Action, Adventure, Fantasy","Director":"James Cameron","Writer":"James Cameron, Rick Jaffa, Amanda Silver","Actors":"Sam Worthington, Zoe Saldana, Sigourney Weaver","Plot":"Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.","Language":"English","Country":"United States","Awards":"Won 1 Oscar. 62 wins & 129 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.7/10"},{"Source":"Rotten Tomatoes","Value":"76%"},{"Source":"Metacritic","Value":"67/100"}],"Metascore":"67","imdbRating":"7.7","imdbVotes":"371,857","imdbID":"tt1630029","Type":"movie","DVD":"28 Mar 2023","BoxOffice":"$683,985,847","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Harry Potter and the Deathly Hallows: Part 2","Year":"2011","Rated":"PG-13","Released":"15 Jul 2011","Runtime":"130 min","Genre":"Adventure, Family, Fantasy","Director":"David Yates","Writer":"Steve Kloves, J.K. Rowling","Actors":"Daniel Radcliffe, Emma Watson, Rupert Grint","Plot":"Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.","Language":"English, Latin","Country":"United Kingdom, United States","Awards":"Nominated for 3 Oscars. 47 wins & 94 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"},{"Source":"Rotten Tomatoes","Value":"96%"},{"Source":"Metacritic","Value":"85/100"}],"Metascore":"85","imdbRating":"8.1","imdbVotes":"897,089","imdbID":"tt1201607","Type":"movie","DVD":"11 Nov 2011","BoxOffice":"$381,447,587","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Guardians of the Galaxy","Year":"2014","Rated":"PG-13","Released":"01 Aug 2014","Runtime":"121 min","Genre":"Action, Adventure, Comedy","Director":"James Gunn","Writer":"James Gunn, Nicole Perlman, Dan Abnett","Actors":"Chris Pratt, Vin Diesel, Bradley Cooper","Plot":"A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.","Language":"English","Country":"United States","Awards":"Nominated for 2 Oscars. 52 wins & 102 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNDIzMTk4NDYtMjg5OS00ZGI0LWJhZDYtMzdmZGY1YWU5ZGNkXkEyXkFqcGdeQXVyMTI5NzUyMTIz._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.0/10"},{"Source":"Rotten Tomatoes","Value":"92%"},{"Source":"Metacritic","Value":"76/100"}],"Metascore":"76","imdbRating":"8.0","imdbVotes":"1,202,800","imdbID":"tt2015381","Type":"movie","DVD":"09 Dec 2014","BoxOffice":"$333,718,600","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Guardians of the Galaxy Vol. 2","Year":"2017","Rated":"PG-13","Released":"05 May 2017","Runtime":"136 min","Genre":"Action, Adventure, Comedy","Director":"James Gunn","Writer":"James Gunn, Dan Abnett, Andy Lanning","Actors":"Chris Pratt, Zoe Saldana, Dave Bautista","Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.","Language":"English","Country":"United States","Awards":"Nominated for 1 Oscar. 15 wins & 60 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"67/100"}],"Metascore":"67","imdbRating":"7.6","imdbVotes":"699,402","imdbID":"tt3896198","Type":"movie","DVD":"22 Aug 2017","BoxOffice":"$389,813,101","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Guardians of the Galaxy Vol. 3","Year":"2023","Rated":"PG-13","Released":"05 May 2023","Runtime":"150 min","Genre":"Action, Adventure, Comedy","Director":"James Gunn","Writer":"James Gunn, Dan Abnett, Andy Lanning","Actors":"Chris Pratt, Zoe Saldana, Dave Bautista","Plot":"Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.","Language":"English","Country":"United States","Awards":"1 nomination","Poster":"https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg","Ratings":[{"Source":"Rotten Tomatoes","Value":"82%"}],"Metascore":"N/A","imdbRating":"N/A","imdbVotes":"N/A","imdbID":"tt6791350","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Morbius","Year":"2022","Rated":"PG-13","Released":"01 Apr 2022","Runtime":"104 min","Genre":"Action, Adventure, Horror","Director":"Daniel Espinosa","Writer":"Matt Sazama, Burk Sharpless","Actors":"Jared Leto, Matt Smith, Adria Arjona","Plot":"Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.","Language":"English, Spanish, Russian","Country":"United States","Awards":"2 wins & 4 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BNTA3N2Q0ZTAtODJjNy00MmQzLWJlMmItOGFmNDI0ODgxN2QwXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.2/10"},{"Source":"Rotten Tomatoes","Value":"16%"},{"Source":"Metacritic","Value":"35/100"}],"Metascore":"35","imdbRating":"5.2","imdbVotes":"135,198","imdbID":"tt5108870","Type":"movie","DVD":"N/A","BoxOffice":"$73,865,530","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Lego Harry Potter and the Philosopher's Stone","Year":"2020–2021","Rated":"N/A","Released":"08 Dec 2020","Runtime":"N/A","Genre":"Animation, Adventure, Comedy","Director":"N/A","Writer":"N/A","Actors":"Robert Heath, A. Heath, J. Carole Lambert","Plot":"Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, goes to Hogwarts School of Witchcraft and Wizardry to learn magic.","Language":"English","Country":"United Kingdom, United States","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BYWMwM2FhNDMtZmQ2Ni00ZjA0LWFlMTgtZjVhYzU1NGYzYzhiXkEyXkFqcGdeQXVyMTI2NTU5NzQw._V1_SX300.jpg","Ratings":[],"Metascore":"N/A","imdbRating":"N/A","imdbVotes":"18","imdbID":"tt14149634","Type":"series","totalSeasons":"N/A","Response":"True"}
,{"Title":"Harry Potter and the Goblet of Fire","Year":"2005","Rated":"PG-13","Released":"18 Nov 2005","Runtime":"157 min","Genre":"Adventure, Family, Fantasy","Director":"Mike Newell","Writer":"Steve Kloves, J.K. Rowling","Actors":"Daniel Radcliffe, Emma Watson, Rupert Grint","Plot":"Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.","Language":"English, French, Latin","Country":"United Kingdom, United States","Awards":"Nominated for 1 Oscar. 13 wins & 44 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.7/10"},{"Source":"Rotten Tomatoes","Value":"88%"},{"Source":"Metacritic","Value":"81/100"}],"Metascore":"81","imdbRating":"7.7","imdbVotes":"644,503","imdbID":"tt0330373","Type":"movie","DVD":"07 Mar 2006","BoxOffice":"$290,469,928","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Harry Potter and the Order of the Phoenix","Year":"2007","Rated":"PG-13","Released":"11 Jul 2007","Runtime":"138 min","Genre":"Action, Adventure, Family","Director":"David Yates","Writer":"Michael Goldenberg, J.K. Rowling","Actors":"Daniel Radcliffe, Emma Watson, Rupert Grint","Plot":"With their warning about Lord Voldemort's return scoffed at, Harry and Dumbledore are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts.","Language":"English, Latin","Country":"United Kingdom, United States","Awards":"Nominated for 2 BAFTA 17 wins & 47 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDc5LWFkN2YtNzNlY2UxZmY0N2IyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.5/10"},{"Source":"Rotten Tomatoes","Value":"78%"},{"Source":"Metacritic","Value":"71/100"}],"Metascore":"71","imdbRating":"7.5","imdbVotes":"599,430","imdbID":"tt0373889","Type":"movie","DVD":"11 Dec 2007","BoxOffice":"$292,382,727","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Creed","Year":"2015","Rated":"PG-13","Released":"25 Nov 2015","Runtime":"133 min","Genre":"Action, Drama, Sport","Director":"Ryan Coogler","Writer":"Ryan Coogler, Aaron Covington, Sylvester Stallone","Actors":"Michael B. Jordan, Sylvester Stallone, Tessa Thompson","Plot":"The former World Heavyweight Champion Rocky Balboa serves as a trainer and mentor to Adonis Johnson, the son of his late friend and former rival Apollo Creed.","Language":"English, Spanish","Country":"United States","Awards":"Nominated for 1 Oscar. 45 wins & 65 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNmZkYjQzY2QtNjdkNC00YjkzLTk5NjUtY2MyNDNiYTBhN2M2XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"95%"},{"Source":"Metacritic","Value":"82/100"}],"Metascore":"82","imdbRating":"7.6","imdbVotes":"294,648","imdbID":"tt3076658","Type":"movie","DVD":"01 Mar 2016","BoxOffice":"$109,778,883","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Iron Man","Year":"2008","Rated":"PG-13","Released":"02 May 2008","Runtime":"126 min","Genre":"Action, Adventure, Sci-Fi","Director":"Jon Favreau","Writer":"Mark Fergus, Hawk Ostby, Art Marcum","Actors":"Robert Downey Jr., Gwyneth Paltrow, Terrence Howard","Plot":"After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.","Language":"English, Persian, Urdu, Arabic, Kurdish, Hindi, Hungarian","Country":"United States, Canada","Awards":"Nominated for 2 Oscars. 22 wins & 73 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Rotten Tomatoes","Value":"94%"},{"Source":"Metacritic","Value":"79/100"}],"Metascore":"79","imdbRating":"7.9","imdbVotes":"1,078,398","imdbID":"tt0371746","Type":"movie","DVD":"30 Sep 2008","BoxOffice":"$319,034,126","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Iron Man 2","Year":"2010","Rated":"PG-13","Released":"07 May 2010","Runtime":"124 min","Genre":"Action, Sci-Fi","Director":"Jon Favreau","Writer":"Justin Theroux, Stan Lee, Don Heck","Actors":"Robert Downey Jr., Mickey Rourke, Gwyneth Paltrow","Plot":"With the world now aware of his identity as Iron Man, Tony Stark must contend with both his declining health and a vengeful mad man with ties to his father's legacy.","Language":"English, French, Russian","Country":"United States","Awards":"Nominated for 1 Oscar. 7 wins & 45 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BZGVkNDAyM2EtYzYxYy00ZWUxLTgwMjgtY2VmODE5OTk3N2M5XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.9/10"},{"Source":"Rotten Tomatoes","Value":"71%"},{"Source":"Metacritic","Value":"57/100"}],"Metascore":"57","imdbRating":"6.9","imdbVotes":"834,716","imdbID":"tt1228705","Type":"movie","DVD":"17 Aug 2010","BoxOffice":"$312,433,331","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Iron Man 3","Year":"2013","Rated":"PG-13","Released":"03 May 2013","Runtime":"130 min","Genre":"Action, Adventure, Sci-Fi","Director":"Shane Black","Writer":"Drew Pearce, Shane Black, Stan Lee","Actors":"Robert Downey Jr., Guy Pearce, Gwyneth Paltrow","Plot":"When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.","Language":"English","Country":"United States","Awards":"Nominated for 1 Oscar. 20 wins & 63 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.1/10"},{"Source":"Rotten Tomatoes","Value":"79%"},{"Source":"Metacritic","Value":"62/100"}],"Metascore":"62","imdbRating":"7.1","imdbVotes":"866,350","imdbID":"tt1300854","Type":"movie","DVD":"24 Sep 2013","BoxOffice":"$409,013,994","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Captain America: The Winter Soldier","Year":"2014","Rated":"PG-13","Released":"04 Apr 2014","Runtime":"136 min","Genre":"Action, Adventure, Sci-Fi","Director":"Anthony Russo, Joe Russo","Writer":"Christopher Markus, Stephen McFeely, Joe Simon","Actors":"Chris Evans, Samuel L. Jackson, Scarlett Johansson","Plot":"As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.","Language":"English, French","Country":"United States","Awards":"Nominated for 1 Oscar. 5 wins & 52 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.8/10"},{"Source":"Rotten Tomatoes","Value":"90%"},{"Source":"Metacritic","Value":"70/100"}],"Metascore":"70","imdbRating":"7.8","imdbVotes":"862,976","imdbID":"tt1843866","Type":"movie","DVD":"09 Sep 2014","BoxOffice":"$259,766,572","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Captain America: Civil War","Year":"2016","Rated":"PG-13","Released":"06 May 2016","Runtime":"147 min","Genre":"Action, Sci-Fi","Director":"Anthony Russo, Joe Russo","Writer":"Christopher Markus, Stephen McFeely, Joe Simon","Actors":"Chris Evans, Robert Downey Jr., Scarlett Johansson","Plot":"Political involvement in the Avengers' affairs causes a rift between Captain America and Iron Man.","Language":"English, German, Xhosa, Russian, Romanian","Country":"United States","Awards":"16 wins & 73 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.8/10"},{"Source":"Metacritic","Value":"75/100"}],"Metascore":"75","imdbRating":"7.8","imdbVotes":"807,929","imdbID":"tt3498820","Type":"movie","DVD":"13 Sep 2016","BoxOffice":"$408,084,349","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Shrek","Year":"2001","Rated":"PG","Released":"18 May 2001","Runtime":"90 min","Genre":"Animation, Adventure, Comedy","Director":"Andrew Adamson, Vicky Jenson","Writer":"William Steig, Ted Elliott, Terry Rossio","Actors":"Mike Myers, Eddie Murphy, Cameron Diaz","Plot":"A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.","Language":"English","Country":"United States, Canada, Sweden","Awards":"Won 1 Oscar. 40 wins & 60 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Rotten Tomatoes","Value":"88%"},{"Source":"Metacritic","Value":"84/100"}],"Metascore":"84","imdbRating":"7.9","imdbVotes":"697,228","imdbID":"tt0126029","Type":"movie","DVD":"19 Aug 2003","BoxOffice":"$268,163,011","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Puss in Boots","Year":"2011","Rated":"PG","Released":"28 Oct 2011","Runtime":"90 min","Genre":"Animation, Adventure, Comedy","Director":"Chris Miller","Writer":"Tom Wheeler, Brian Lynch, Will Davies","Actors":"Antonio Banderas, Salma Hayek, Zach Galifianakis","Plot":"An outlaw cat, his childhood egg-friend, and a seductive thief kitty set out in search for the eggs of the fabled Golden Goose to clear his name, restore his lost honor, and regain the trust of his mother and town.","Language":"English, Spanish","Country":"United States, India","Awards":"Nominated for 1 Oscar. 9 wins & 43 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTMxMTU5MTY4MV5BMl5BanBnXkFtZTcwNzgyNjg2NQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.6/10"},{"Source":"Rotten Tomatoes","Value":"86%"},{"Source":"Metacritic","Value":"65/100"}],"Metascore":"65","imdbRating":"6.6","imdbVotes":"179,687","imdbID":"tt0448694","Type":"movie","DVD":"24 Feb 2012","BoxOffice":"$149,260,504","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Free Guy","Year":"2021","Rated":"PG-13","Released":"13 Aug 2021","Runtime":"115 min","Genre":"Action, Adventure, Comedy","Director":"Shawn Levy","Writer":"Matt Lieberman, Zak Penn","Actors":"Ryan Reynolds, Jodie Comer, Taika Waititi","Plot":"A bank teller discovers that he's actually an NPC inside a brutal, open world video game.","Language":"English, Japanese, German","Country":"United States, Canada","Awards":"Nominated for 1 Oscar. 5 wins & 29 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BOTY2NzFjODctOWUzMC00MGZhLTlhNjMtM2Y2ODBiNGY1ZWRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.1/10"},{"Source":"Rotten Tomatoes","Value":"80%"},{"Source":"Metacritic","Value":"62/100"}],"Metascore":"62","imdbRating":"7.1","imdbVotes":"386,553","imdbID":"tt6264654","Type":"movie","DVD":"27 Sep 2021","BoxOffice":"$121,626,598","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Puss in Boots: The Last Wish","Year":"2022","Rated":"PG","Released":"21 Dec 2022","Runtime":"102 min","Genre":"Animation, Adventure, Comedy","Director":"Joel Crawford, Januel Mercado","Writer":"Paul Fisher, Tommy Swerdlow, Tom Wheeler","Actors":"Antonio Banderas, Salma Hayek, Harvey Guillén","Plot":"When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through eight of his nine lives, he launches an epic journey to restore them by finding the mythical Last Wish.","Language":"English, Spanish","Country":"United States, Japan","Awards":"Nominated for 1 Oscar. 5 wins & 51 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNjMyMDBjMGUtNDUzZi00N2MwLTg1MjItZTk2MDE1OTZmNTYxXkEyXkFqcGdeQXVyMTQ5NjA0NDM0._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"7.9","imdbVotes":"116,102","imdbID":"tt3915174","Type":"movie","DVD":"N/A","BoxOffice":"$185,294,935","Production":"20th Century Fox","Website":"N/A","Response":"True"}
,{"Title":"Loca","Year":"2020","Rated":"N/A","Released":"02 Apr 2020","Runtime":"15 min","Genre":"Short, Drama","Director":"Maria Salgado Gispert","Writer":"Maria Salgado Gispert, Maite Voces","Actors":"Mercedes Castro, Gonzalo Ramos, Susana Monje","Plot":"Sofia works as a janitor at a school, where she goes about her seemingly endless work, often left alone and listening to self-help affirmations on her headphones.","Language":"Spanish","Country":"Spain","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BOWM3ZGNjNGEtMDVlNS00YWJiLTk2ZmMtNDVkZDliNGE1MWRmXkEyXkFqcGdeQXVyMjQzMTk1NjE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.4/10"}],"Metascore":"N/A","imdbRating":"6.4","imdbVotes":"16","imdbID":"tt11719264","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Minions","Year":"2015","Rated":"PG","Released":"10 Jul 2015","Runtime":"91 min","Genre":"Animation, Adventure, Comedy","Director":"Kyle Balda, Pierre Coffin","Writer":"Brian Lynch","Actors":"Sandra Bullock, Jon Hamm, Michael Keaton","Plot":"Ever since the dawn of time, the Minions have lived to serve the most despicable of masters. From the T-Rex to Napoleon, the easily distracted tribe has helped the biggest and the baddest of villains. Now, join protective leader Kevin, teenage rebel Stuart, and lovable little Bob on a global road trip. They'll earn a shot to work for a new boss, the world's first female supervillain, and try to save all of Minionkind from annihilation.","Language":"English, Spanish","Country":"United States, France","Awards":"Nominated for 1 BAFTA Award4 wins & 29 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTUwNjcxNzAwOF5BMl5BanBnXkFtZTgwNzEzMzIzNDE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.4/10"},{"Source":"Rotten Tomatoes","Value":"55%"},{"Source":"Metacritic","Value":"56/100"}],"Metascore":"56","imdbRating":"6.4","imdbVotes":"246,232","imdbID":"tt2293640","Type":"movie","DVD":"08 Dec 2015","BoxOffice":"$336,045,770","Production":"N/A","Website":"N/A","Response":"True"}
,{"Title":"Dune","Year":"2021","Rated":"PG-13","Released":"22 Oct 2021","Runtime":"155 min","Genre":"Action, Adventure, Drama","Director":"Denis Villeneuve","Writer":"Jon Spaihts, Denis Villeneuve, Eric Roth","Actors":"Timothée Chalamet, Rebecca Ferguson, Zendaya","Plot":"A mythic and emotionally charged hero's journey, \"Dune\" tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.","Language":"English, Mandarin","Country":"United States, Canada","Awards":"Won 6 Oscars. 170 wins & 281 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.0/10"},{"Source":"Rotten Tomatoes","Value":"83%"},{"Source":"Metacritic","Value":"74/100"}],"Metascore":"74","imdbRating":"8.0","imdbVotes":"665,392","imdbID":"tt1160419","Type":"movie","DVD":"22 Oct 2021","BoxOffice":"$108,327,830","Production":"N/A","Website":"N/A","Response":"True"}
]



router.get('/homepage' , async(req,res) => {
    res.render('homepage',{allmovies:movies})

})



router.get('/registeragain' , async(req,res) => {
    res.render('registeragain')

})

router.get('/loginagain' , async(req,res) => {
    res.render('loginagain',{allmovies:movies})

})


router.get('/adminhomepage' , async(req,res) => {
    res.render('adminhomepage',{allmovies:movies})

})

router.post('/registerpost',async(req,res)=>{
    const{email,pass,isadmin}=req.body;

    const hash_pawwword=await bcryptjs.hash(pass,10);

    //chack if there is one username
    const account=await Account.findAll({where:{email:email}});

    if(account.length == 1){
        res.redirect('/myapi/registeragain');
    }
    else{
        Account.create({
            email:email,
            pass:hash_pawwword,
        })
        .then(accoun_created => {
            // redirect to the homepage with the allmovies parameter
            res.redirect('/myapi/adminhomepage');
        })        
        .catch(error =>{
            return res.status(500).json({
                message:error.message
            })
        })
    }
})



router.get('/register',async(req,res)=>{
    
    res.render('registerpage')

})

router.get('/login',async(req,res)=>{
    
    res.render('loginpage')

})


router.post('/loginpost',async(req,res)=>{

    const{email,pass}=req.body;
    try {
        const account=await Account.findAll({where:{email:email}});
        if(account.length == 1){
            const acc=account[0];
            const isMatch=await bcryptjs.compare(pass,acc.pass);
            if(isMatch){
                const datatotoken={
                    id:acc.id,
                    email:acc.email,
                    pass:pass,
                }



        
                const token = await Jwt.sign(datatotoken,process.env.JWT_KEY ,{expiresIn:'1m'});
                res.redirect('/myapi/adminhomepage');

              
         
                
            }else{
                res.redirect('/myapi/loginagain');

            }
        }else{
            res.redirect('/myapi/loginagain');

        }
    } catch (error) {
        return res.status(500).json({
            message:"ERROR FROM SERVER:"+error
            
        })
    }
   
    

})



export default router;