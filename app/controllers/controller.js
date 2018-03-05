var router = require('express').Router();

router.get('/', require('./other/index'));

router.get('/contact', require('./contact/get'));
router.post('/contact', require('./contact/post'));
router.put('/contact', require('./contact/put'));
// router.delete('/contact', require('./contact/delete'));

router.get('/event', require('./event/get'));
router.post('/event', require('./event/add'));
router.put('/event', require('./event/edit'));
// router.delete('/event', require('./event/delete'));

router.get('/task', require('./task/get'));
router.post('/task', require('./task/post'));
router.put('/task', require('./task/put'));
// router.delete('/task', require('./task/delete'));

router.get('/user', require('./user/get'));
router.post('/user', require('./user/post'));
router.put('/user', require('./user/put'));
// router.delete('/user', require('./user/delete'));

router.get('/login', require('./session/get'));       // форма
router.post('/session', require('./session/post'));     // создание сессии
router.delete('/session', require('./session/delete')); // удаление сессии

module.exports = router;