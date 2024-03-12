interface IProducts {
    name: string
    cover_image: {
        public_id: string
        url: string
    }
    description: string
    price: number
    tax?: number
    discount?: number
    images?: {
        public_id: string
        url: string
    }[]
    category_id: number
    id: number
}