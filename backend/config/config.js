require('dotenv').config();
const  {DB_HOST,DB_NAME,DB_USERNAME,DB_PASSWORD} = process.env
module.exports = {
  SECRET_KEY:"secret1122",
  "development": {
    username: 'postgres',
    password: 'Tele7077510830',
    database: 'local_db',
    host: '127.0.0.1',
    dialect: "postgres",
    define: {
      timestamps:true
    }
  },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }
}
