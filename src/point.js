import { Accessors } from 'accessors'

const [getX, setX] = Accessors.create()
const [getY, setY] = Accessors.create()
const [getTime, setTime] = Accessors.create()

// Int -> Float -> Float -> Point
const create = (time, x, y) => {
  const a = {}

  setX(x, a)
  setY(y, a)
  setTime(time, a)

  return a
}

// Object -> Point
const fromJs = (js) => {
  return create(js.time, js.x, js.y)
}

// Point -> Object
const toJs = (a) => {
  const js = {}

  js.time = getTime(a)
  js.x = getX(a)
  js.y = getY(a)

  return js
}

// Point -> Point -> Int
const compareTime = (a, b) => {
  a = getTime(a)
  b = getTime(b)

  if (a < b) {
    return -1
  } else if (a === b) {
    return 0
  } else {
    return 1
  }
}

// Float -> Point -> Point -> Point
const interpolate = (time, a, b) => {
  const time_a = getTime(a)
  const time_b = getTime(b)

  const ratio = (time - time_a) / (time_b - time_a)

  const x = getX(a) + ratio * (getX(b) - getX(a))
  const y = getY(a) + ratio * (getY(b) - getY(a))

  return create(time, x, y)
}

export const Point = {
  fromJs,
  toJs,
  compareTime,
  getTime,
  getX,
  getY,
  
  create,

  interpolate,
}