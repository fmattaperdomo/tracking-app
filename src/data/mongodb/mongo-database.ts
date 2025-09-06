import mongoose from 'mongoose';
import { buildLogger } from "../../presentation/plugins/logger.plugin";


interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  private static logger = buildLogger('MongoDatabase');
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;
    try {

      await mongoose.connect( mongoUrl, {
        dbName: dbName,
      });
      this.logger.log('Mongo connected');
      return true;
      
    } catch (error) {
      this.logger.error('Mongo connection error');
      throw error;
    }
  }
}
