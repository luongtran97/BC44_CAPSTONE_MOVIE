export const regex ={
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
    phone:/^([+]\d{2})?\d{10}$/,
    user:/^[\w.-]{0,19}[0-9a-zA-Z]$/
}