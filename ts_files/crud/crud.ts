import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const saltRounds = 10;

const prisma = new PrismaClient({log: ['query', 'info']})

type userSignUp = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

type userLogin = {
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


// TODO: Add different message for wrong email or password
export async function CheckUserPassword(user: userLogin) {
    const result = await FindUserByEmail(user.email)
    if (result) {
        const match = await bcrypt.compare(user.password, result.password);
        if (match) {
            return result;
        }
    }
    throw "Wrong Credentials";
}

/**
 * Creates new user record in database
 * */
export const CreateNewUser = async (user: userSignUp) => {
    const result = await FindUserByEmail(user.email)
    if (result) {
        throw "User already exists"
    } else {
        bcrypt.hash(user.password, saltRounds).then(async function (hash) {
            const newUser = await prisma.user.create(
                {data: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: hash
                    },
                }
            )
            return newUser.id
        })
    }   
}