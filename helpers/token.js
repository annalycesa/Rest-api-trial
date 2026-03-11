import jwt from 'jsonwebtoken';


const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.secret); 
    //payload itu data yang ingin kita simpan di token, 
    // misalnya id user, email user, dll, 
    // secret key disembunyikan di .env
    return token;
}


export default generateToken;
