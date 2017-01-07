import {Router} from 'express';
const router = Router();

/* GET home page. */
//noinspection JSUnusedLocalSymbols
router.get('/', (req, res, next) => {
    res.render('result', { title: 'Express' });
});

export default router;
