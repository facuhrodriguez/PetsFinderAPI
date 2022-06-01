// @ts-check

/**
 * @typedef {{
 *  id: string
 *  name: string
 *  description: string
 *  age: number
 *  createdAt: Date
 *  lastView: Date
 *  type: "gato" | "perro" |"otro"
 *  coordenates: {
 *    longitude: string,
 *    latitude: string
 *  }
 *  castrated: boolean
 *  comments: {
 *    comment: string
 *    user: import("./users.vm").User
 *    commentedAt: Date
 *  }[]
 *  user: import("./users.vm").User
 *  photos: string[]
 * }} Pets
 */
export default {};
