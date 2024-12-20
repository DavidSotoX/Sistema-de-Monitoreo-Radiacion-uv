module.exports = (sequelize, DataTypes) => {
  const medicion = sequelize.define(
    "medicion",
    {
      external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      uv: { type: DataTypes.FLOAT, allowNull: false },
      fecha: { type: DataTypes.DATE, allowNull: false },
    },
    {
      freezeTableName: true,
    }
  );

  medicion.associate = function (models) {
    medicion.belongsTo(models.dispositivo, { foreignKey: "id_dispositivo" });
  };

  return medicion;
};
