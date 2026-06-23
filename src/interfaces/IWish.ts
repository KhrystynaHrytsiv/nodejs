interface IWish {
    _id:string,
    title:string,
    description:string,
    price:string,
    userId:string
}

interface IWishUpdate {
    title:string,
    description:string,
    price:string
}

export {IWish, IWishUpdate}