const router = require('express').Router();
const Person = require('../models/Person');
const { isAuthenticated } = require('../helpers/auth')

//const Person = require('../models/Person');

router.post('/persons/voteup-person/:id', isAuthenticated, async (req, res) => {
    const buscar = await Person.findById(req.params.id);
    const  voteUp  = buscar.voteUp+1;
    await Person.findByIdAndUpdate(req.params.id, {voteUp} );
    req.flash('success_msg', 'Thank you for voting!')
    res.redirect('/');
    });

    router.post('/persons/votedown-person/:id', isAuthenticated, async (req, res) => {
        const buscar = await Person.findById(req.params.id);
        const  voteDown = buscar.voteDown+1;
        await Person.findByIdAndUpdate(req.params.id, {voteDown} );
        req.flash('success_msg', 'Thank you for voting!')
        res.redirect('/');
        });

router.get('/', async (req, res) => {
    const filterPerson = [];
    const persons = await Person.find().lean();
    for(a = 1; a<persons.length; a++ ){
        filterPerson[a-1] =    persons[a];   
    }
    res.render('index', { filterPerson });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/persons', isAuthenticated, async (req, res) => { 
    const persons = await Person.find().lean();
    res.render('person/all-persons', { persons })
    });


module.exports = router;