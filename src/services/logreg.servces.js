import { supabase } from '../supabaseClient'

export const logRegServices = {
    async add(login, password){
        const { data, error } = await supabase.from('Admins').select().eq("login", login)
        if (data.length) {
            throw new Error("Администратор уже есть")
        }
        await supabase.from('Admins').insert({ login, password })
    },
    async get(login, password){
        let account = {
            "login": ""
        }
        account.login = sessionStorage.getItem("login")
        if (account.login) {
            return account
        }
        const { data, error } = await supabase.from('Admins').select().eq("login", login)
        if (!data.length) {
            throw new Error("Логина нет")
        }
        if (data[0].password !== password) { 
            throw new Error("Пароль не верный")
        }
        if (error) {
            throw new Error("Ошибка")
        }
        sessionStorage.setItem("login", data[0])
        return true
    },
    async exit() {
        sessionStorage.removeItem("login")
        return false
    },
    async checklogin(){
        const response = sessionStorage.getItem("username");
        return JSON.parse(response)
    }
}