module.exports = (sequelize, DataTypes) => {
  const dispositivo = sequelize.define(
    "dispositivo",
    {
      external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      identificador: { type: DataTypes.INTEGER, allowNull: false },
      latitud: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      longitud: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      estado: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      freezeTableName: true,
    }
  );

  dispositivo.associate = function (models) {
    dispositivo.hasMany(models.medicion, {
      foreignKey: "id_dispositivo",
      as: "medicion",
    });
  };

  return dispositivo;
};
