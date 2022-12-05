const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => res.send('hello world'));
router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretkey');

    res.status(200).json({ token });
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne ({ email })
    if (!user) return res.status(401).send("The email doesn't exits");
    if (user.password !== password) return res.status(401).send('Wrong password');

    jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token });
});

router.get ('/incidents', (req, res) =>{
    res.json([
        {
            _id: 1,
            name:'incident one', 
            description: 'Claims from customer', 
            officeName: 'Kitchener'
        },

        {
            _id: 1,
            name:'incident two', 
            description: 'change packages', 
            officeName: 'Vancouver'
        },
        {
            _id: 1,
            name:'incident three', 
            description: 'Close office', 
            officeName: 'Calgary'
        }
    ])
});

router.get ('/private-incidents', verifyToken, (req, res) =>{
    res.json([

        {
            _id: 1,
            name:'incident one', 
            description: 'lost package', 
            officeName: 'Mississauga'
        },

        {
            _id: 1,
            name:'incident two', 
            description: 'Disappointed customer', 
            officeName: 'Toronto'
        },
        {
            _id: 1,
            name:'incident three', 
            description: 'Delayed Packages', 
            officeName: 'Oackville'
        }

    ])
})

function verifyToken (req, res, next){
    try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;
