import { SessionImage } from "@/store/models";
import api from ".";
import { apiErrorMapper } from "@/service/api/utils";

class SessionImageService {
  async fetchAll() {
    return api
      .get("/sessionImage")
      .then(response => {
        const data = response.data;
        return data?.payload;
        // }).catch((error) => reject(new Error(apiErrorMapper(error))));
      })
      .catch(error => {
        throw new Error(apiErrorMapper(error));
      });
  }

  async fetchByUserId(id: string) {
    console.log('fetch by user', id)
    return api
      .get("/sessionImage/" + id)
      .then(response => {
        const data = response.data;
        return data?.payload;
        // }).catch((error) => reject(new Error(apiErrorMapper(error))));
      })
      .catch(error => {
        throw new Error(apiErrorMapper(error));
      });
  }
}

const sessionImageService = new SessionImageService();
export default sessionImageService;
