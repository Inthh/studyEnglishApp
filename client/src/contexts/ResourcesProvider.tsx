import { StorageReference, getDownloadURL, listAll, ref } from "firebase/storage";
import { ReactNode, createContext, useEffect, useState } from "react";
import { storage } from "../firebase/config";

export const ResoucesContext = createContext({});

export type Resources = {
    avatarDefaultURL: string,
    donateQR: string
}
function ResourcesProvider({ children }: { children: ReactNode }) {
    const [resources, setResources] = useState<Resources>({
        avatarDefaultURL: "",
        donateQR: "",
    });

    useEffect(() => {
        const listRef = ref(storage, 'project')
        listAll(listRef)
            .then(async (res) => {
                let itemRef: StorageReference
                for (itemRef of res.items) {
                    const storageRef = ref(storage, itemRef.fullPath)
                    const url = await getDownloadURL(storageRef)
                    switch (itemRef.fullPath) {
                        case 'project/avatar-default.png':
                            setResources((prev) => ({
                                ...prev,
                                avatarDefaultURL: url
                            }));
                            break
                        case 'project/QR_Code.jpeg':
                            setResources((prev) => ({
                                ...prev,
                                donateQR: url
                            }));
                            break
                    }
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }).catch((error: any) => {
                console.error("An error occured while getting all files: ", error);
            });
    }, []);

    return <ResoucesContext.Provider value={{ resources, setResources }}>
        {children}
    </ResoucesContext.Provider>
}

export default ResourcesProvider;