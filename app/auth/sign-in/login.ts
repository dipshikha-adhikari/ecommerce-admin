
export const login = async (data: any) => {
    const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData.message); // Throw error with the message from the server
    }

    return await response.json();
};

