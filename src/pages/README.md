# Pages folder

This folder should contain one folder for each page in your application. Inside of those page specific folders should be a single root file that is your page (generally index.js) alongside all the files that are only applicable to that page.


Example of structure:
.
└── /src
    └── /pages
        ├── /Authors
        │   ├── /AuthorsPage
        │   │   ├── AuthorsPage.js
        │   │   └── AuthorsPage.test.js
        │   └── /AuthorBlurb
        │       ├── /AuthorBlurb.js
        │       └── /AuthorBlurb.test.js
        ├── /Books
        │   ├── /BooksPage
        │   │   ├── BooksPage.js
        │   │   └── BooksPage.test.js
        │   └── /BookForm
        │       ├── /BookForm.js
        │       └── /BookForm.test.js
        └── /Login
            ├── LoginPage
            │   ├── LoginPage.styles.js
            │   ├── LoginPage.js
            │   └── LoginPage.test.js
            └── LoginForm
                ├── LoginForm.js
                └── LoginForm.test.js