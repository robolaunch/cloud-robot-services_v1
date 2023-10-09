export interface IEnvrionment {
  database: {
    host: string;
    port: number;
  };
  su: {
    name: string;
    user: string;
    password: string;
  };
  rl: {
    name: string;
    user: string;
    password: string;
  };
  application: {
    port: number;
  };
}
