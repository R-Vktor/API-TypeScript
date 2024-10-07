import * as yup from "yup";

// temos a opcao de definir o parametro como opcional através da propriedade nullable(true) para dizer que o campo pode ser null.
export const userValidation = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    phone: yup.string().nullable(true),
});