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

export async function insertEditCabin(newCabin, id) {
    console.log(newCabin, id);
    const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = hasImage
        ? null
        : `${parseInt(
              Math.random() * 10000000000
          )}-${newCabin.image.name.replaceAll("/", "")}`;

    const imagePath = hasImage
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

    const {data, error: uploadError} = !id
        ? await supabase
              .from("cabins")
              .insert([{...newCabin, image: imagePath}])
              .select()
        : await supabase
              .from("cabins")
              .update({...newCabin, image: imagePath})
              .eq("id", id)
              .select();
    if (uploadError) {
        throw new Error("Cabin could not be Inserted");
    }

    // Store Image to Cabins Bucket
    const {error: storageError} = !hasImage
        ? await supabase.storage
              .from("cabins")
              .upload(imageName, newCabin.image)
        : {error: null};

    //Delete cabin if Storage Error
    if (storageError !== null) {
        deleteCabin(data.id);
        throw new Error("Cabin Image could not be uploaded");
    }

    return data;
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
