const HOST = "localhost";
const PORT = 8080;
const BASE_URL = `http://${HOST}:${PORT}`;

export const getTrivial = async (numQuestion) => {
    try {
        const response = await fetch(`${BASE_URL}/trivial/${numQuestion}`, {
            method: "GET",
        });
        const trivial = await response.json();
        if (response.status === 200) {
            return { success: true, trivial };
        } else {
            return { success: false, error: "Couldn't fetch trivial" };
        }
    } catch (e) {
        return { success: false, error: `Network error: ${e.message}` };
    }
}

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

export const getTrivialListByCategory = async (category) => {
    try {
        const response = await fetch(`${BASE_URL}/trivials/category/${category}`, {
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

export const getTrivialListByDifficulty = async (difficulty) => {
    try {
        const response = await fetch(`${BASE_URL}/trivials/difficulty/${difficulty}`, {
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

export const getTrivialListByCategoryAndDifficulty = async (category, difficulty) => {
    try {
        const response = await fetch(`${BASE_URL}/trivials/category/${category}/difficulty/${difficulty}`, {
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