const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const getGradientData = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/train`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return await response.json()
  } catch(error) {
      console.error("Error submitting gradient descent data", error)
      throw error
  }
}