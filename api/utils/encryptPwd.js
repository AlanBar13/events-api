import bcrypt from 'bcryptjs';


const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const cryptedPwd = await bcrypt.hash(password, salt);
    return cryptedPwd;
}

export default encrypt;