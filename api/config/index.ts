interface Config {
  PORT: string;
  JWT_SECRET_KEY: string;
  JWT_REFRESH_SECRET_KEY: string;
  MONGO_CONNECT_URL: string;
  CORS_ORIGIN: string;
}

export const config: Config = {
  PORT: process.env.PORT || '4000',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'test',
  JWT_REFRESH_SECRET_KEY: process.env.JWT_SECRET_KEY || 'test-refresh',
  MONGO_CONNECT_URL:
    process.env.MONGO_CONNECT_URL ||
    'mongodb+srv://kishan159:kishan159@chatappcluster.wbbx5.mongodb.net/ChatAppCluster?retryWrites=true&w=majority',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
