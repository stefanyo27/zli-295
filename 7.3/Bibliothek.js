import express from 'express';
import { randomUUID } from 'node:crypto';
import session from 'express-session'

const app = express();
app.use(express.json());
app.use(session({
    secret: 'yuh',
    resave: false,
    saveUninitialized: true
}))
const port = 3000;



let lends = [];

app.get('/login', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.set('WWW-Authenticate', 'Basic realm="Geschützter Bereich"');
        return res.status(401).send('Authentifizierung erforderlich.');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const decoded = Buffer.from(base64Credentials, 'base64').toString();

    // Vergleich
    if (decoded === 'hallo:1234') {
        req.session.isAuthenticated = true;
        return res.redirect('/verify');
    } else {
        console.log(req.session.secret)
        console.log(decoded)
        return res.status(401).send('Mhhhh nein');
    }
});

app.get('/verify', (req, res) => {
    if (req.session.isAuthenticated) {
        return res.status(200).send('Du bist eingeloggt');
    } else {
        return res.status(400).send('Creds sind falsch');
    }
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.delete('/', (req, res) => {
    req.session.destroy()
    return res.status(401).send('lutscherrrrr')
})

app.get('/books', (_request, response) => {
    response.send(books);
});

app.get(`/books/:isbn`, (request, response) => {
    const book = books.find((b) => b.isbn === request.params.isbn);
    response.send(book);
});

app.post('/books', (request, response) => {
    books = [...books, request.body];
    response.status(201).send(books);
});

app.put(`/books/:isbn`, (request, response) => {
    if (!books.find((b) => b.isbn === request.params.isbn)) {
        return response.send(409);
    }
    books = books.map((b) => {
        if (b.isbn === request.params.isbn) {
            return request.body;
        } else {
            return b;
        }
    });
    response.send(books);
});

app.delete(`/books/:isbn`, (request, response) => {
    books = books.filter((b) => b.isbn !== request.params.isbn);
    response.send(204);
});

app.get('/lends', (_request, response) => {
    response.send(lends);
});

app.get('/lends/:id', (request, response) => {
    const lend = lends.find((l) => l.id === request.params.id);
    response.send(lend);
});

app.post('/lends', (request, response) => {
    const isValid = request.body.customerId && request.body.isbn;
    if (!isValid) {
        return response.send(422);
    }
    const isLent = lends.some(
        (l) => l.isbn === request.body.isbn && !l.returnedAt
    );
    const tooManyLends = lends.filter(
        (l) => l.customerId === request.body.customerId && !l.returnedAt
    ).length >= 3;
    if (isLent || tooManyLends) {
        return response.send(400);
    }
    lends = [...lends, { ...request.body, id: randomUUID(), borrowedAt: Date.now() }]
    response.status(201).send(lends);
});

app.delete('/lends/:id', (request, response) => {
    lends = lends.map((l) => {
        if (l.id === request.params.id) {
            return {...l, returnedAt: Date.now()}
        } else {
            return l;
        }
    });
    response.send(lends);
});


app.listen(port, () => {
    console.log(`Book server on port ${port}`);
});

let books = [
    { isbn: "9780747532743", title: "Harry Potter and the Philosopher's Stone", year: 1997, author: "J.K. Rowling" },
    { isbn: "9780439064873", title: "Harry Potter and the Chamber of Secrets", year: 1998, author: "J.K. Rowling" },
    { isbn: "9780261103573", title: "The Lord of the Rings", year: 1954, author: "J.R.R. Tolkien" },
    { isbn: "9780316769488", title: "The Catcher in the Rye", year: 1951, author: "J.D. Salinger" },
    { isbn: "9780061120084", title: "To Kill a Mockingbird", year: 1960, author: "Harper Lee" },
    { isbn: "9780451524935", title: "1984", year: 1949, author: "George Orwell" },
    { isbn: "9780141439600", title: "Pride and Prejudice", year: 1813, author: "Jane Austen" },
    { isbn: "9780553386790", title: "A Brief History of Time", year: 1988, author: "Stephen Hawking" },
    { isbn: "9780307277671", title: "The Road", year: 2006, author: "Cormac McCarthy" },
    { isbn: "9780385504201", title: "The Da Vinci Code", year: 2003, author: "Dan Brown" }
];