import { Accessors } from 'accessors'

const [getXMin, setXMin] = Accessors.create()
const [getXMax, setXMax] = Accessors.create()
const [getYMin, setYMin] = Accessors.create()
const [getYMax, setYMax] = Accessors.create()

// () -> BoundRect
const empty = () => {
  const a = {}

  setXMin(Infinity, a)
  setXMax(-Infinity, a)
  setYMin(Infinity, a)
  setYMax(-Infinity, a)

  return a
}

// () -> BoundRect
const create = (x_min, x_max, y_min, y_max) => {
  const a = empty()

  setXMin(x_min, a)
  setXMax(x_max, a)
  setYMin(y_min, a)
  setYMax(y_max, a)

  return a
}

// BoundRect -> BoundRect -> BoundRect
const compose = (a, b) => {
  const x_min = Math.min(getXMin(a), getXMin(b))
  const x_max = Math.max(getXMax(a), getXMax(b))

  const y_min = Math.min(getYMin(a), getYMin(b))
  const y_max = Math.max(getYMax(a), getYMax(b))
  
  return create(x_min, x_max, y_min, y_max)
}

const normalizeX = (x, a) => {
  const x_min = getXMin(a)
  const x_max = getXMax(a)

  return (x - x_min) / (x_max - x_min)
}

const normalizeY = (y, a) => {
  const y_min = getYMin(a)
  const y_max = getYMax(a)

  return (y - y_min) / (y_max - y_min)
}


export const BoundRect = {
  empty,
  create,
  compose,

  normalizeX,
  normalizeY,
}