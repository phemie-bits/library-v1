import z, { minLength, number } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.email(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("University Card is required"),
    password: z.string().min(8 )
})

export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(8 )
})