# User stories

To implement this exercice I will work like in every agile project: through user stories.

- first I will create the user stories (1 user story === 1 feature) from the test instructions and explain some of my technical choices.
- then I will implement each user story: one branch -> one user story

## 1 - Display the user bookmarks
As a user

When I reach the website homepage

Then I see the first page of my paginated bookmarks. 

Additional information:
- the url is ``/bookmarks``
- Each bookmark of the list  displays the common information and CTAs to update or delete it.
- Bookmarks data will be stored in the session storage for simplicity reasons. Of course in a real project it should be stored in a backend
- Each page have 5 items (to be able to test the pagination quickly)
- The list is sorted from the newest to the oldest bookmark

## 2 - Display a bookmark
As a user in the homepage

When a click in a bookmark of my list 

Then the complete information of that bookmark is displayed in the right part of the screen

Additional information:
- The panel will display
    - the common information
    - the specific information (depending on the link type, video or photo)
    - all keywords

## 3 - Add a user bookmark
As a user

When I click on the "Add" button after filling the bookmark url

Then I see my created bookmark on top my list

Additional information:
- The text input + button (forming together the CTA, call-to-action) is displayed on top on the list
- When the link is submitted, its metadata is fetched using `https://noembed.com/` API.
- If the link metadata can't be fetched (broken link), a notification is displayed to notify the user

## 4 - Go to a bookmark edition page
As a user on the home page

When I click on the "Modify" CTA of a bookmark from the list

Then I navigate to the modification page

Additional information:
- The page url is ``/bookmarks/:bookmarkId``
- If the bookmark id is not found, a redirection to ``/bookmarks`` is done 

## 5 - Edit a bookmark
As a user on a bookmark edition page

When I fill the edition form and click on the submit button

Then the bookmark data is updated

Additional information:
- All bookmark fields are editable
- Keywords can be added, modified or deleted
- When the form is submitted, a success notification appear

## 5 - Delete a bookmark
As a user on the home page

When I click on the "Delete" CTA of a bookmark from the list

Then the bookmark is deleted from my list (and from the session storage)

## 6 - Add a link to the home page
As a user on the edition page

When I click to the "Return" button

Then I am redirected to the bookmarks page

##7 - Enable paginated list navigation
As a user on the home page having more than 5 bookmarks

When I click on the next pagination number

Then the next items of my list are displayed

Additional information:
- All pages numbers are displayed below the list
- The current page number is underlined
- The current pagination page can be set from the query param "page": `/home?page=2 -> dislpays the second page of the pagination`
- If the requested page can't be displayed (incorrect query param, requested page not found), then the first page is used as a fallback


-----------------------
# Initial test instructions

Cet exercice a pour but d’évaluer vos compétences en JS. Vous devrez réaliser une application de gestion de bookmarks avec React et l'API des Hooks (https://fr.reactjs.org/docs/hooks-reference.html).

**L'utilisation de Typescript est également un pré-requis.**

Vous implémenterez l'ajout de deux types de liens :

- vidéo (provenant de Vimeo)
- photo (provenant de Flickr)

Les propriétés communes d’un lien référencé sont :
```
URL
titre
auteur
date d'ajout
```

Les liens de type video auront les propriétés spécifiques suivantes :
```
largeur
hauteur
durée
```

Les liens de type photo devront avoir en plus les propriétés :
```
largeur
hauteur
```

Il est possible d’avoir des mots-clés pour chaque lien référencé.

La récupération des propriétés d’un lien référencé sont obtenues en utilisant l'API https://noembed.com/.

Pour visualiser et gérer ses liens référencés, l’utilisateur aura une vue principale sous forme de liste paginée avec un bouton d’ajout.

Chaque ligne du tableau doit avoir les informations communes et des liens pour modifier ou supprimer le lien.

La page de modification du lien comporte un formulaire pour ajouter, modifier et supprimer les mots clés associé au lien.

=> Le livrable attendu est l’application sous forme de repository git ou package zip incluant les instructions d’installation.

Il n’est pas demandé de s’attarder sur l’aspect graphique de l’application.

