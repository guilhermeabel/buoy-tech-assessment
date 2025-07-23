import { ApiService } from "services";

interface EnvironmentConfigData {
  dataMode: string;
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  messagingSenderId: string;
  measurementId: string;
  storageBucket: string;
  databaseURL: string;
}

export class EnvironmentConfigService extends ApiService {
  async getConfig(): Promise<EnvironmentConfigData> {
    // const uri = "/clientConfig";
    // const response = await this.get(uri);
    // const environmentConfig = response as EnvironmentConfigData;
    // return environmentConfig.data;

    return {
      dataMode: process.env["REACT_APP_FAKE_API_MODE"],
      apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
      authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
      projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"],
      appId: process.env["REACT_APP_FIREBASE_APP_ID"],
      messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
      storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
      databaseURL: process.env["REACT_APP_FIREBASE_DATABASE_URL"],
    } as EnvironmentConfigData;
  }
}
