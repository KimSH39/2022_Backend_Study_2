import { DataTypes, Model } from 'sequelize'

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'user',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
      },
    )
  }

  static associate(models) {
    models.Post.belongsTo(models.User, { foreignKey: 'writer' })
  }
}

export default User
