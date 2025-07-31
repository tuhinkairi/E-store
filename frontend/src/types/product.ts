export interface ProductItem {
    id: string |number
    name: string
    price: number
    originalPrice: number | null
    category: string
    collection: string
    image: string
    rating: number
    reviews: number
    colors: string[]
    sizes: string[]
    isNew: boolean
    isFavorite: boolean
    description: string

}