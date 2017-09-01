# Tess's Senior Enrichment Project

## Installation
This assumes you have postgres and node installed globally already.

1. clone it

2. npm install

3. createdb tess_enrichment_project

creates the db. Note that the name is hardcoded and MUST be "tess_enrichment_project"

4. npm run seed

seeds the database with Star Wars related students and campuses

5. npm start //starts the server

## Usage
1. Go to [localhost:1337](localhost:1337)
2. Click around! 😊

While I believe the usage of the site is self-explanatory, I've written a more detailed usage guide below for reference if needed.

## More Detailed Usage

#### Navigation

You can navigate to a page that has all campuses or all students listed by navigating using the links on the top of the page.

![buttons to click on](/images_for_readme/buttons.png)

To navigate to a single-campus page, simply click on the name of the appropriate campus from the campuses page.


Similarly, click the name of a student to view the single-student page for that student.

#### Student Elements

![Student usage](/images_for_readme/NavigatingFromStudent.png)


1. To delete a student, find the student you would like to delete, and then click the "x" next to their name

4. To edit a student, click the pencil icon next to the student's name. The form you are taken to should pre-fill with the current student information. Click "Edit student" to submit.

6. To add a student, click the "+" on the [Students page](http://localhost:1337/students), next to the word "students". Fill out all information and hit "Add Student".

#### Campus Element

![Campus usage](/images_for_readme/NavigatingFromCampus.png)

2. To delete a campus, click the "x" next to the campus name. Note that deleting a campus will cascade, deleting all students from that campus.

3. To edit a campus, click the pencil icon next to the campus name. The form you are taken to should pre-fill with the current campus information. Click "Edit Campus" to submit.

5. To add a campus, click the "+" on the [Campuses page](http://localhost:1337/campuses), next to the word "Campuses". Fill out all information and hit "Add Campus".


## Known bugs
- if you put an invalid url into the image field when editing or updating a campus, it will fail more-or-less silently (The console will log a 500 error but there is no obvious indication to the user that the request has failed).
