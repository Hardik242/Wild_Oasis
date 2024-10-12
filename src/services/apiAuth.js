import supabase, {supabaseUrl} from "./supabase";

export async function signup({fullName, email, password}) {
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    return {data, error};
}

export async function login({email, password}) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error);

    return data;
}

export async function getCurrentUser() {
    const {data: session} = await supabase.auth.getSession();

    if (!session) return null;

    const {data, error} = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
}

export async function logout() {
    const {error} = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}

export async function updateUser({fullName, password, avatar, oldAvatar}) {
    const hasAvatar = oldAvatar !== null;
    let updateData;

    //Update Password or Fullname
    if (password) updateData = {password};
    if (fullName)
        updateData = {
            data: {
                fullName,
            },
        };

    const {data, error} = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error);
    if (!avatar) return data;

    //Upload avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    if (hasAvatar) {
        oldAvatar = oldAvatar.replace(
            "https://sffirbrxnnzifrfpvwtr.supabase.co/storage/v1/object/public/avatars/",
            ""
        );
        const {error: deleteStorage} = await supabase.storage
            .from("avatars")
            .remove([oldAvatar]);

        if (deleteStorage) throw new Error(deleteStorage);
    }

    const {error: storageError} = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError);

    //Update Avatar
    const {data: updateUser, error: updateError} =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        });

    if (updateError) throw new Error(updateError);

    return updateUser;
}
