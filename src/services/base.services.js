import { supabase } from '../supabaseClient'

export const todoServices = {
    async add(id, name, description, price){
        const { error } = await supabase
            .from('Objects')
            .insert({ id, name, description, price })
    }
}