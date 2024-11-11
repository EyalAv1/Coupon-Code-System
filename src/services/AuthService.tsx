const api = "http://localhost:5292/api/";

export const loginUser = async (email: string, password: string) => {
  try {
    const data = await fetch(
      api + `Users/IsUserValid?email=${email}&password=${password}`,
      {
        method: "POST",
      }
    );
    if (!data.ok) {
      throw new Error("Invalid email or password");
    }
    return data.json();
  } catch (err) {
    return null;
  }
};
