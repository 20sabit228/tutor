       // Simulating an API endpoint for user profile details
       const fetchProfileData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: "John Doe",
                    email: "johndoe@example.com",
                    phone: "9876543210",
                });
            }, 1000);
        });
    };

    // Fetch and display profile details
    document.addEventListener("DOMContentLoaded", async () => {
        const profileDetails = document.getElementById("profileDetails");

        try {
            // Fetch profile data
            const userProfile = await fetchProfileData();

            // Display profile data
            profileDetails.innerHTML = `
                <p><strong>Name:</strong> ${userProfile.name}</p>
                <p><strong>Email:</strong> ${userProfile.email}</p>
                <p><strong>Phone:</strong> ${userProfile.phone}</p>
            `;
        } catch (error) {
            profileDetails.innerHTML = `<p style="color: red;">Failed to load profile details. Please try again later.</p>`;
            console.error("Error fetching profile data:", error);
        }
    });