import { authClient } from "./auth-client"

export const getToken = async () => {
const { data, error } = await authClient.token()
  if (error) {
    console.log("Error to get token..." + error.message)
  }

  if (data) {
    const jwtToken = data.token
    console.log("Cool to get token:" + jwtToken)
  }

  return data?.token
}
