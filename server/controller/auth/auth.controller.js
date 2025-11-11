import { prisma } from "../../db/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
}
const generateJWTToken = async(userData) => {
    const token = await jwt.sign(userData,process.env.JWT_SECRET, { expiresIn: '24h' })
    return token;
}
export const register = async(req,res)=>{
    const { userName, email, password } = req.body;
    try {
        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            });
        }
        const userExists = await prisma.user.findUnique({ where: { email } });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "email already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: {
            userName,
            email,
            password:hashPassword,
          }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user creation failed"
            });
        }

        user.password = undefined;

        const token = await generateJWTToken({id: user.id, email: user.email, role: user.role});
        res.cookie('token', token, cookieOptions)
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        if ( !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            });
        }
        const userExists = await prisma.user.findFirst({
            where: { email }
        });
        
        if (!userExists) {
            return res.json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, userExists.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        
        userExists.password = undefined;
        const token = await generateJWTToken({ id: userExists.id, email: userExists.email, role: userExists.role});
        res.cookie('token', token, cookieOptions)
        res.status(201).json({
            success: true,
            message: 'User login successfully',
            user: {
                email: userExists.email,
                role: userExists.role,
                id: userExists.id
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: 'logout successfully'
    })
}