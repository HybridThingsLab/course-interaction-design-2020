# course-interaction-design
course fundamentals of interaction design SS2020
HS Augsburg, IA2

teaching staff: Slawa Gurevich, Martin Spengler, Benjamin Stechele, Andreas Muxel, Daniel Rothaug

# Data for Block 1
## DWD-Augsburg-2009-2019.json
* Station: 232 Augsburg
* Base Data: produkt_klima_tag_19470101_20181231_00232.txt
* From: https://www.dwd.de/DE/leistungen/klimadatendeutschland/klarchivtagmonat.html?nn=16102				
* More Info: https://www.dwd.de/DE/leistungen/klimadatendeutschland/beschreibung_tagesmonatswerte.html?nn=16102&lsbId=526270							
* Reduced to 10 Years (2009-2019)
* Missing Values (-999) interpolated linear based on previous line
* Converted to JSON with http://convertcsv.com/csv-to-json.htm
* Added Header with info about source, values