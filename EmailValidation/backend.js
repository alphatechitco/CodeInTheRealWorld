/* 
API Endpoint in the User Router to Validate Email
This code should be part of the User-related router
*/

router.post('/checkEmail', async (req, res) => {
    // Instantiate the User Management class
    const um = new UM();
    
    // Extract email from the request body
    const { email } = req.body; 

    // Manual Debugging Log for Email Received
    console.log("Router email:", email);

    try {
        // Await the response from the validation function
        const result = await um.validateEmail(email);

        // Send appropriate response based on validation result
        if (result.success) {
            return res.json({ success: true, message: result.message });
        } else {
            return res.json({ success: false, message: result.message });
        }

    } catch (error) {
        console.error("Validation error:", error.message); // Log error for debugging
        return res.status(500).json({ success: false, message: "Server error while validating email." });    
    }
});


/* 
Async Function to Validate Email in the User Management Module
This should be in your user management or utilities module.
*/

async function validateEmail(email) {
    // Use validator module to check if the email is valid
    const validation = validator.isEmail(email);

    // Tailor response based on validation result
    if (!validation) {
        console.log("Email validation result: NO");
        return { success: false, message: "Invalid Email!" };
    }

    console.log("Email validation result: YES");
    return { success: true, message: "Valid Email" };
}

