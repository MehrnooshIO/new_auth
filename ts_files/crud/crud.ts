import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ['query', 'info']})

type userSignUp = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

async function FindUserByEmail(userEmail: string) {
    const result = await prisma.user.findUnique({
        where: {
            email: userEmail
        },
    })
    return result
}


// TODO: Add diffrent message for wrong email or password
async function CheckUserPassword(userEmail: string, userPassword: string) {
    const result = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    })
    if (result) {
        if (result.password === userPassword) {
            return true
        } else {
            return false
        }
    }
    return false
}

export const CreateNewUser = async (user: userSignUp) => {
    const result = await FindUserByEmail(user.email)
    if (result) {
        throw "User already exists"
    } else {
        const newUser = await prisma.user.create(
            {data: user}
        )
        return newUser.id 
    }   
}