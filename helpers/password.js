import bcrypt from "bcryptjs";

export const hash = (password) => {
    const salt = bcrypt.genSaltSync(10); //generate salt, 10 adalah salt rounds, semakin tinggi semakin aman tapi juga semakin lama prosesnya
    const hashedPass=bcrypt.hashSync(password, salt); //hash password dengan salt yang sudah dibuat     
    return hashedPass; //salt digunakan untuk menambah keamanan password, karena dengan salt yang berbeda, maka hash yang dihasilkan juga akan berbeda meskipun passwordnya sama
}

export const compare = (password, hashedPass) => {
    const isMatch= bcrypt.compareSync(password, hashedPass) 
    //compare password dengan hashed password, return true jika sama, false jika tidak sama 
    console.log(isMatch)
    return isMatch;
}

