interface Config {
  MONGO_USER: string
  MONGO_PASSWORD: string
  PORT: string
  JWT_SECRET_KEY: string
  JWT_REFRESH_SECRET_KEY: string
}

export const config: Config = {
  MONGO_USER: process.env.MONGO_USER || 'kishan159',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'kishan159',
  PORT: process.env.PORT || '4000',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'test',
  JWT_REFRESH_SECRET_KEY: process.env.JWT_SECRET_KEY || 'test-refresh',
}
