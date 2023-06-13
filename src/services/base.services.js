import { supabase } from '../supabaseClient'

export const baseServices = {
    async add(object, image){
        const date = new Date() 
        const filename = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}-${image.name}`
        const { data1, error1 } = await supabase
            .from("Objects")
            .insert({name: object.name, description: object.description, image: filename, price: object.price})

        const { data2, error2 } = await supabase.storage
            .from("Images")
            .upload(filename, image, {
            cacheControl: "3600",
            upsert: false
        })
        const result = await this.getRows()
        return result
    },
    async del(id){
        const { error } = await supabase.from("Objects").delete().eq("id", id)
    },
    async upd(id, object){
        const { error } = await supabase.from("Objects").update({/* object */}).eq("id", id) 
    },
    async getRows(){
        const { data } = await supabase.from("Objects").select()
        const filtered = data.map((item) => (
            {...item, image:"https://fygkskorgvtqqitnzwuy.supabase.co/storage/v1/object/public/Images/" + item.image}
          ))
        return filtered
    },
    async thisObject(item){
        
    }
}