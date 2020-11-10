export interface ContactInterface {
    fullName : string
    favorite : boolean
    email : string
    imageUrl : string
    numbers : {[key: string]: string}[]
}
