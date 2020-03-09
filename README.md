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
### "data":
```json
  "STATIONS_ID": "232 = Augsburg",
  "MESS_DATUM": "Tag der Messung (YYY-MM-DD)",
  "QN_3": "Qualitätsniveau der Daten",
  "FX": "Maximum der Windspitze (m/sec)",
  "FM": "Tagesmittel der Windgeschwindigkeit (m/s)",
  "QN_4": "QN = Qualitätsniveau der Daten",
  "RSK": "tgl. Niederschlagshoehe (mm)",
  "RSKF": "tgl. Niederschlagsform (numerischer Code)",
  "SDK": "Sonnenscheindauer Tagessumme (Stunde)",
  "SHK_TAG": "Schneehoehe Tageswert (cm)",
  "NM": "Tagesmittel des Bedeckungsgrades (Achtel)",
  "VPM": "Tagesmittel des Dampfdruckes (hpa)",
  "PM": "Tagesmittel des Luftdrucks (hpa)",
  "TMK": "Tagesmittel derTemperatur (°C)",
  "UPM": "Tagesmittel der Relativen Feuchte (%)",
  "TXK": "Tagesmaximum der Lufttemperatur in 2m Höhe (°C)",
  "TNK": "Tagesminimum der Lufttemperatur in 2m Hoehe (°C)",
  "TGK": "Minimum der Lufttemperatur am Erdboden in 5cm Hoehe (°C)"
  ```
