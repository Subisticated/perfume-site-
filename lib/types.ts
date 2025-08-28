export type Product = {
  id: string | number
  name: string
  description: string
  price: number
  sizes?: string[]
  images?: string[]
}

export type Review = {
  id?: string | number
  username: string
  rating: number
  comment: string
  createdAt?: string
}
