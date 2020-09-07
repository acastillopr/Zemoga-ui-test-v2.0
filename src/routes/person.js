const router = require('express').Router();

const Person = require('../models/Person');
const { isAuthenticated } = require('../helpers/auth')

router.get('/person/addperson', isAuthenticated, (req, res) => {
    res.render('person/new-person');
  });


router.post('/person/new-person', isAuthenticated, async (req, res) => {
 const { name, description, source, imgUrl}  = req.body;
 const errors = [];
 if(!name){
   errors.push({text: 'Please write a name'})
 }
 if(!description){
  errors.push({text: 'Please write a description'})
}
if(!source){
  errors.push({text: 'Please write a source'})
}
if(!imgUrl){
  errors.push({text: 'Please select an image'})
}
if(errors.length > 0){
  res.render('person/new-person', {
    errors,
    name,
    description,
    source,
    imgUrl
  });
}else{
  const newPerson = new Person({name, description, source, imgUrl});
  await newPerson.save();
  req.flash('success_msg', 'Person Added')
  res.redirect('/persons');
}
});

router.get('/persons', isAuthenticated, async (req, res) => { 
const persons = await Person.find().lean();
res.render('person/all-persons', { persons })

});

router.get('/persons/edit/:id', isAuthenticated, async (req, res) => {
  const perso = await Person.findById(req.params.id).lean();
  res.render('person/edit-person', {perso});
});

router.put('/persons/edit-person/:id', isAuthenticated, async (req, res) => {
const { name,description } = req.body;
await Person.findByIdAndUpdate(req.params.id, { name, description }).lean();
req.flash('success_msg', 'Information Updated')
res.redirect('/persons');
});

router.delete('/persons/delete/:id', isAuthenticated, async (req, res) => {
await Person.findByIdAndDelete(req.params.id).lean();
req.flash('success_msg', 'Person Deleted')
res.redirect('/persons');
});

module.exports = router;