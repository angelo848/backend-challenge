import { RESTDataSource } from "apollo-datasource-rest";
import { IExoplanet } from "../../types";

class NasaAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://exoplanetarchive.ipac.caltech.edu/TAP'
  }

  async getExoplanets(select = '*'): Promise<IExoplanet[]> {
    const exoplanets = await this.get(`/sync?query=select+${select}+from+ps+where+pl_massj+>+10&format=json`)
    return exoplanets
  }
}

export default NasaAPI