import prisma from "../../db/db.js";

export const createAddress = async (req, res) => {
    try {
        const { street, addressLine2, city, state, postalCode, country, phoneNumber } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const userId = user.id;
        const address = await prisma.address.create({
            data: {
                street: street,
                addressLine2: addressLine2,
                city: city,
                state: state,
                postalCode: postalCode,
                country: country,
                phoneNumber: phoneNumber,
                userId: userId
            }
        })
        return res.status(200).json({
            success: true,
            message: "Address created successfully",
            address
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getAddress = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const userId = user.id;
        const address = await prisma.address.findMany({
            where: {
                userId: userId
            }
        })
        return res.status(200).json({
            success: true,
            address
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}