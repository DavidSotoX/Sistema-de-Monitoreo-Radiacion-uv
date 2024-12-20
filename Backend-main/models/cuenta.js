module.exports = (sequelize, DataTypes) => {
  const cuenta = sequelize.define(
    "cuenta",
    {
      external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      correo: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      clave: { type: DataTypes.STRING(150), allowNull: false },
      rol: {
        type: DataTypes.ENUM("ADMINISTRADOR", "USUARIO"),
        defaultValue: "USUARIO",
      },
      description: { type: DataTypes.STRING(100), allowNull: false },
      description_pdf: { type: DataTypes.STRING(200), allowNull: false },
      estado: {
        type: DataTypes.ENUM("ACEPTADO", "EN ESPERA", "RECHAZADO"),
        defaultValue: "EN ESPERA",
      },
    },
    {
      freezeTableName: true,
    }
  );

  cuenta.associate = function (models) {
    cuenta.belongsTo(models.persona, { foreignKey: "id_persona" });
    cuenta.belongsTo(models.peticion_token, { foreignKey: "id_token" });
  };

  return cuenta;
};
