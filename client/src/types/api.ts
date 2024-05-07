export type User = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    photoURL: string | null,
    type: string,
    username: string
}

export type OAuthUser = {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
    type: string,
    accessToken: string
}

export type VocabularySet = {
    id: number,
    name: string,
    description: string,
    thumbnail: string
}

export type Vocabulary = {
    id: number;
    word: string,
    partsOfSpeech: string,
    pronunciation: string,
    vietnamese: string,
    example: string,
    isMemoried: boolean,
    explaination: string,
    audioUrl: string
}

export type Topic = {
    id: number,
    name: string
}