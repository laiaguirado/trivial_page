const HOST = "localhost";
const PORT = 8080;
const BASE_URL = `http://${HOST}:${PORT}`;


export const getTrivialList = async () => {
    try {
        const response = await fetch(`${BASE_URL}/trivials`, {
            method: "GET",
        });
        const trivial = await response.json();
        if (response.status === 200) {
            return { success: true, trivialList: trivial };
        } else {
            return { success: false, error: "Couldn't fetch trivial" };
        }
    } catch (e) {
        return { success: false, error: `Network error: ${e.message}` };
    }
}