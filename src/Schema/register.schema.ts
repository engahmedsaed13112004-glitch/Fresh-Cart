

import * as zod from "zod"


export const registerSchema = zod.object({

name:zod.string().nonempty("Name is required").min(2,"at min 2 characters...").max(15,"at most 5 characters"),
email:zod.email("invalid email formate"),
password:zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
rePassword:zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
phone: zod.string().regex(/01[0125][0-9]{8}/, "must be egyption number")


}).refine((obj)=> {

return obj.password === obj.rePassword  
}, {

error :"password and rePassword must be matched",
path : ["rePassword"]

})