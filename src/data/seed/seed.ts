import { envs } from "../../config";
import { CategoryModel } from "../mongo/models/Category.model";
import { ProductModel } from "../mongo/models/Product.model";
import { UserModel } from "../mongo/models/User.model";
import { MongoDatabase } from "../mongo/mongo-db";
import { seedData } from "./data.seed";

(async () => {
  await MongoDatabase.connection({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await main();
  await MongoDatabase.disconnect();
})();

const randomBetween0Anx = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  //0. Vaciar db
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  //1 Crear usuarios
  const users = await UserModel.insertMany(seedData.users);

  //2.Crear Categorias
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: users[0]._id,
      };
    })
  );

  //3.Crear Productos
  await ProductModel.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        user: users[randomBetween0Anx(seedData.users.length - 1)]._id,
        category:
          categories[randomBetween0Anx(seedData.categories.length - 1)]._id,
      };
    })
  );
  console.log("SEEDED");
}
