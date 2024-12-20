module.exports = (sequelize, DataTypes) => {
  const peticion_token = sequelize.define(
    "peticion_token",
    {
      external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      habilitado: { type: DataTypes.BOOLEAN, defaultValue: true },
      nro_peticiones: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      freezeTableName: true,
    }
  );

  peticion_token.associate = function (models) {
    peticion_token.hasMany(models.cuenta, {
      foreignKey: "id_token",
      as: "cuenta",
    });
  };

  return peticion_token;
};
