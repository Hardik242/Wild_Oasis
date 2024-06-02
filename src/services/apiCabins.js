import supabase from "./supabase";

export async function getCabins() {
    const {data, error} = await supabase.from("cabins").select("*");
    if (error) {
        console.log(error + "Error at cabins loader.");
    }
    return data;
}

export async function deleteCabin(id) {
    const {error} = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }
}

export async function insertCabin(newCabin) {
    const {error} = await supabase.from("cabins").insert([newCabin]).select();
    if (error) {
        console.log(error);
        throw new Error("Cabin could not be Inserted");
    }
}
export async function updateCabin(newCabin) {
    const {error} = await supabase
        .from("cabins")
        .update({other_column: "otherValue"})
        .eq("some_column", "someValue")
        .select();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be Updated");
    }
}
