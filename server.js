const app = require('./app');
const db = require('./config/db');

db.then((result) => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(console.error);