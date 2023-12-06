  export interface image_uri {
    small: string
    normal: string
    large: string
    png: string
  }

  export interface Card {
    id: number
    name: string
    collector_number: number
    rarity: string
    image_uris: image_uri
    set_name: string
  }

  export interface Response {
    data: Card[]
    total_cards: number
    error: string
  }