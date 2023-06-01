const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));


// Routes
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/shop');
    } else {
        res.render('index');
    }
});

app.post('/login', (req, res) => {
    const password = req.body.password;

    if (password === 'zuckfionists') {
        req.session.loggedIn = true;
        res.redirect('/shop');
    } else {
        res.redirect('/');
    }
});

app.get('/shop', (req, res) => {
    if (req.session.loggedIn) {
        const faqs = [
            { question: 'WHO ARE WE?', answer: 'can you read?' },
            {question: 'WHAT DO WE DO?', answer: 'sell shirts. donate profits.'},
            {question: 'HOW DO I KNOW THE PROFITS GET DONATED?', answer: 'wallah they get donated.' },
            {question: 'WHAT IS YOUR REFUND POLICY?', answer: 'no refunds or exchanges, sorry.' }
        ];
        res.render('shop', { faqs });
    } else {
        res.redirect('/');
    }
});



// Start server
app.listen(3000, () => console.log('Server started on port 3000'));

