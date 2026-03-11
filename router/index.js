import express from 'express';
import {UserController, NoteController} from '../controllers/index.js';
import { authentication, authorization } from '../middlewares/auth.js';
const router = express.Router();
import passport from 'passport';
import { sendEmail } from '../helpers/mailer.js';

router.get('/test-email', async (req, res, next) => {
  console.log("HIT THE TEST-EMAIL ROUTE!");
  try{
    await sendEmail ({
      to:'sschrodingersc@gmail.com', //fill with email address
      subject: 'Test Email',
      html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f1bcdf;">
        <h1 style="color: #c8178a; font-size: 24px; text-align: left">
          Hello!
        </h1>
        <p style="color: black; font-size: 16px; text-align: left">
          This is test styling email
        </p>
      </div>
      `
    })

    res.json({message: 'Email sent successfully'})
  }

  catch (err) {
    next(err)
  }
})

router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.get('/auth/google/callback', passport.authenticate('google', { session: false }), UserController.loginGoogle)

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
)


router.use(authentication)

router.get('/', NoteController.find);

router.get('/:id', NoteController.findById);

router.post('/', NoteController.create);

router.put('/:id', authorization, NoteController.update);

router.delete('/:id', authorization, NoteController.delete);

export default router;