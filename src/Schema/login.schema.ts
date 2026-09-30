
import * as zod from "zod"


export const loginSchema = zod.object({


email:zod.email("invalid email formate"),
password:zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),


})