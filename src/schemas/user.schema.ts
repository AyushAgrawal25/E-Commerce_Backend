import {TypeOf, z} from 'zod';

export const userSchema=z.object({
    id: z.string().nullish().optional(),
    email: z.string({
        required_error: "Email is required."
    }),
    password: z.string({
        required_error: "Password is required."
    }),
    name: z.string({
        required_error: "Name of the user is required."
    })
});

export const createUserSchema=z.object({
    body: userSchema.pick({
        email: true,
        password: true,
        name: true,
    })
});

export const loginUserSchema=z.object({
    body: userSchema.pick({
        email: true,
        password: true
    })
});

export type CreateUserInput=z.TypeOf<typeof createUserSchema>;
export type UserLoginInput=z.TypeOf<typeof loginUserSchema>;