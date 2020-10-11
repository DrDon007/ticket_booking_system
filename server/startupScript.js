import User from './models/user';
import bcrypt from 'bcrypt';
const BCRYPT_SALTS_ROUNDS = 12;


export const startupScript = async () => {
    console.log(' I runned');
    try {
        const user = await User.findOne({username : "Admin"}).exec();
        console.log(' I runned', user);
        if(user) {
            return;
        }
        const adminUser = new User({
            username: "Admin",
            email: "admin@gmail.com",
            passwordHash: await bcrypt.hash('admin@123', BCRYPT_SALTS_ROUNDS),
            role : "admin",
        });
        const userCreated = await adminUser.save();
        if(userCreated) {
            console.log("user created");
        }
    }
    catch(err) {
        console.log(err);
    }
  
}