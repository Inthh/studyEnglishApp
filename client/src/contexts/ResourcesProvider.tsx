import { getDownloadURL, ref } from "firebase/storage";
import { ReactNode, createContext, useEffect, useState } from "react";
import { storage } from "../firebase/config";

export const ResoucesContext = createContext({});

export type Resources = {
    avatarDefaultURL: string
}
function ResourcesProvider({ children }: { children: ReactNode }) {
    const [resources, setResources] = useState<Resources>({
        avatarDefaultURL: ""
    });

    useEffect(() => {
        const storageRef = ref(storage, `/photos/avatar-default.png`);
        getDownloadURL(storageRef).then((url) => {
            setResources({
                avatarDefaultURL: url
            });
        }).catch((error) => {
            console.error(error);
        })
    }, []);

    return <ResoucesContext.Provider value={{ resources, setResources }}>
        {children}
    </ResoucesContext.Provider>
}

export default ResourcesProvider;