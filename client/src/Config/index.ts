interface Config {
    REACT_APP_API_URL: string
}
  
export const config: Config = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'http://localhost:4000/',
}
