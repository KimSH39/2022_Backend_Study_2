import { Sequelize } from 'sequelize'
import User from './user'
import Post from './post'

const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]

const db = {}
db.User = User
db.Post = Post

const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config,
)

User.init(sequelize)
Post.init(sequelize)

User.associate(db)
Post.associate(db)

db.sequelize = sequelize

module.exports = db
