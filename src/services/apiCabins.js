import supabase, {supabaseUrl} from "./supabase";

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
    const imageName = `${parseInt(
        Math.random() * 10000000000
    )}-${newCabin.image[0].name.replaceAll("/", "")}`;

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

    //Create and Upload cabin
    const {data, error: uploadError} = await supabase
        .from("cabin")
        .insert([{...newCabin, image: imagePath}])
        .select();

    if (uploadError) {
        throw new Error("Cabin could not be Inserted");
    }

    //Store Image to Cabins Bucket
    const {error: storageError} = await supabase.storage
        .from("cabins")
        .upload(imageName, newCabin.image[0]);

    //Delete cabin if Storage Error
    if (storageError) {
        deleteCabin(data.id);
        throw new Error("Cabin Image could not be uploaded");
    }
}
export async function updateCabin(newCabin) {
    const {error} = await supabase
        .from("cabins")
        .update({other_column: "otherValue"})
        .eq("some_column", "someValue")
        .select();

    if (error) {
        throw new Error("Cabin could not be Updated");
    }
}
