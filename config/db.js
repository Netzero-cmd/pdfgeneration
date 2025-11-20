import { Sequelize } from "sequelize";

const sequelize = new Sequelize('PdfGenerationdb', 'sa1', 'Sumit@1234', {
    host: 'localhost',
    dialect: "mssql",
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const connectdb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
const disconnectdb = async () => {
    try {
        await sequelize.close();
        console.log("Database disconnected successfully!");
    } catch (error) {
        console.error("Error disconnecting the database:", error);
    }
};

export { sequelize, connectdb, disconnectdb };
