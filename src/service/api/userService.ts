import { UserCreateProfile, Profile, UserProfileJson } from "@/store/models";
import axios from "axios";
import transformers from "./transformers";
import { apiErrorMapper } from "@/service/api/utils";
import api from "."


class UserService {
  async getAll(): Promise<Profile[]> {
    return new Promise<Profile[]>((resolve, reject) => {
      api
        .get("/profiles")
        .then(response => {
          resolve(response?.data?.payload)
          // resolve(response.data.map((json: UserProfileJson) => transformers.userProfileFromJson(json)))
        })
        .catch(error => reject(new Error(apiErrorMapper(error))));
    });
  }

  async create(userCreateProfile: UserCreateProfile): Promise<Profile> {
    return new Promise((resolve, reject) => {
      api
        .post<Profile>("/profiles", userCreateProfile)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => reject(new Error(apiErrorMapper(error))));
    });
  }

  async delete(index: any): Promise<Profile> {
    return new Promise<Profile>((resolve, reject) => {
      api
        .delete(`/profiles/${index}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(new Error(apiErrorMapper(error))));
    });
  }

  
  async deleteSelected(ids: Array<number>) {
    const data = { "ids": ids }
    return new Promise<void>((resolve, reject) => {
      api
        .delete(`/profiles`, {data: data})
          .then(() => resolve())
          .catch((error) => reject(new Error(apiErrorMapper(error))));
    });
}

  async fetchById(id: string): Promise<Profile> {
    return new Promise<Profile>((resolve, reject) => {
      api
        .get(`/profiles/${id}`)
        .then(response => resolve(response.data))
        .catch(error => reject(new Error(apiErrorMapper(error))));
    });
  }

  async update(
    id: string,
    userUpdateProfile: UserCreateProfile
  ): Promise<Profile> {
    return new Promise((resolve, reject) => {
      api
        .put<Profile>(`/profiles/${id}`, userUpdateProfile)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => reject(new Error(apiErrorMapper(error))));
    });
  }
}

const authService = new UserService();
export default authService;
