# MySQL Database Wrapper


## Install

`npm install --save https://github.com/bigbadweb/mysql-database-wrapper.git`

## Usage

Depends on the `mysql` npm package - `npm install mysql`;



```.js
const Database = require('@bigbadweb/mysql-database-wrapper');

const db = new Database('mysql://user:pass@hostname:port/database');

let result = await db.query('SELECT * FROM table').catch(err => {
        // handle err
    })


```