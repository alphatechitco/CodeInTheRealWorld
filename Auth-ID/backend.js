
/* 
API Endpoint in the User Router to Allow User To Login
This code should be part of the User-related router
*/
router.post('/LoginAM', async (req,res)=>{

    const {email, password}=req.body;
    //Extracting The Email & Password from The Request Header From FrontEnd

    console.log("Router: ", email, password);
    //Debugging Using The Traditional Output Method (Console.Log)

    const um=new UM();
    //Object Creation To Use The Class Functionality

    try{
        const result=await um.Login(email,password);
        //Accessing The Function Output For Proceedings

        if(result.success){

            const userID=result.userID;

            const token=jwt.sign({userID}, JWT_Secret, {expiresIn:'1h'});
            // Creation OF Token & Expire Time Based On Nature Of Site And Login

            console.log("Router Emit token: ", token)
            //Debugging Using The Traditional Output Method (Console.Log)

            return res.json({success:true,token,userID,message:"Login Successful"})
        }

        return res.status(409).send({success:false, message:"Invalid Password"})

    } catch(error){
        return res.status(500).json({ success: false, message: error.message });    }
})

/* 
Async Function to Login in the User Management Module
This should be in your user management or utilities module.
*/

async function Login(email, password) {
    console.log(email);
    console.log(password);
    //Debugging Using The Traditional Output Method (Console.Log)

    try {
        const { data, error } = await supabase
       .from('users')
       .select('password_hash, user_id')
       .eq('email', email);

    console.log("Supabase Response - Data:", data);
    console.log("Supabase Response - Error:", error);
    //Debugging Using The Traditional Output Method (Console.Log)

        if (error || !data || data.length === 0) {
            throw new Error("Invalid Email");
        }

        console.log("P", data[0].password_hash);
        console.log("U", data[0].user_id)
        //Debugging Using The Traditional Output Method (Console.Log)

        // Compare the hashed password (await to handle async)
        const isMatch = await bcrypt.compare(password, data[0].password_hash);

        if (!isMatch) {
            throw new Error("Invalid Password!");
        }

        const userID = data[0].user_id;

        return { success: true, userID, message: "Login Successful" };
    } catch (error) {
        throw new Error("Error Connecting To Server! " + error.message);
    }
}

