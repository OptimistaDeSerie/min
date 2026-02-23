// src/services/api.ts

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Test API connection
export const pingBackend = async (): Promise<{ status: string }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/ping`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error connecting to backend:", error);
        return { status: "Error connecting to backend" };
    }
};

// Get all events
export const getEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};

// Get single event by slug
export const getEventBySlug = async (slug: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${slug}`);
        if (!response.ok) {
            throw new Error("Event not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
};

// Submit partnership form
export const submitPartnership = async (formData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/partnership`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        return await response.json();
    } catch (error) {
        console.error("Error submitting partnership:", error);
        return { status: "error" };
    }
};

// Submit Contact form
export const contactUs = async (formData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        return await response.json();
    } catch (error) {
        console.error("Error submitting contact inquiry:", error);
        return { status: "error" };
    }
};