# hackathon-corona

## Inspiration
Aktuell gibt es sehr viele Fake News und Mythen über CoVid-19. Diese werden meist über Social Media verbreitet. Viele User meinen es gut und teilen diese weiter. So verbreiten sich diese wie ein Lauffeuer. Mit unserem Tool wollen wir so einfach und intuitiv wie möglich User warnen und konsolidierte Informationen z.B. vom WHO anzeigen.

## What it does
Unser Chrome Extension kann mit wenigen Klicks installiert werden. Diese scannt Webseiten, detektiert und markiert Fake News. Wenn man mit dem Mauszeiger über die Markierung geht, öffnet sich ein Fenster mit denen man Fakten von konsolidierten Quellen erhält.

## How I built it
Das technische Konzept sieht wie folgt aus: Zuerst wird eine Datenbank erstellt mit geläufigen Gerüchten (z.B. Ibuprofen schadet bei CoVid-19, USA will CureVac übernehmen). Zur Datenbank Erstellung wird zu jedem Mythos zwei Dinge benötigt, Keywords (z.B. [Ibuprofen, CoVid-19], Verwendung siehe unten) und Gegenfakten mit Quelle.

Unser Algorithmus benutzt die Keywords zur Grobfilterung und detektiert potenzielle Artikel/Tweets/Post. Durch diese Keyword Filterung werden sowohl Fake News selbst, aber auch Artikel die diese Fake News aufdecken, herausgefiltert. Deshalb wird im nächsten Schritt ein Feinfilter mithilfe von Machine Learning verwendet, dass diese potenziellen Artikel in "Fake News" und "Fakten" aufteilt. Wir haben zwei Implementierungen für den Machine Learning Teil:

Cloud-basiert: Wir haben ein Modell in Google's AutoML Natural Language trainiert. Diese ist sehr leicht skalierbar und man benötigt fast keine Machine Learning Kenntnisse um ein sehr gutes Modell zu entwickeln. Die Berechnung ist sehr schnell. Leider ist AutoML ziemlich teuer auf Dauer, deshalb ist eventuell ein anderer Cloud-Dienst besser.
Lokal: Mithilfe von Tensorflow.js haben wir ein Machine Learning Modell basierend auf Word2Vec Embedding entwickelt. Es misst die Ähnlichkeit zwischen einem Mythos und dem zu prüfenden Artikel.
Die Fake News werden dann hervorgehoben und der User kann Zusatzinformationen sehen, wenn er über die Markierung fährt.

Alternativ kann der User sich auch Fakten in grün markieren lassen, damit er sich sicher sein kann, dass die Information stimmt. Wir denken allerdings, dass auf Nachrichtenseiten zu viel markiert wird und unübersichtlich wird.

## Challenges I ran into
Zeit und Daten für Machine Learning. Das Training von Machine Learning Modellen benötigt viele Daten, die wir nicht haben. Zudem dauert das Training in der Regel Stunden.

## Accomplishments that I'm proud of
Was wir erreicht haben in weniger als 48h mit einem tollen Team - von der Ideenentwicklung bis hin zur Implementierung einer Demo, die skalierbar ist.

## What I learned
Man brauch viele komplementäre Fähigkeiten im Team.

## What's next for 21_Krisenkommunikation_Fake-News-Erkennungstool
Aktuell ist unsere Demo hardcoded. Das heißt sie funktioniert nur auf bestimmten Webseiten. Wir haben Code für die Machine Learning Modelle geschrieben. Allerdings fehlen uns Daten und Zeit um diese auch wirklich umzusetzen.

Auch wenn wir sehr überzeugt sind, wird unser Team leider nicht weiter an diesem Projekt arbeiten, da wir aktuell nicht die Zeit haben. Wenn euch die Idee gefällt, könnt ihr diese gerne weiterentwickeln. Kommt gerne auf uns zu, insbesondere wenn ihr technische Fragen zu Machine Learning (wir sind drei Machine Learning Studenten) habt.
