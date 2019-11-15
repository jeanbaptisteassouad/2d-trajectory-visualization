import { Accessors } from 'accessors'
import { Point } from 'point'
import { BoundRect } from 'bound-rect'

const [getPoints, setPoints] = Accessors.create()

// () -> Trajectory
const empty = () => {
  const a = {}

  setPoints([], a)

  return a
}

// [Object] -> Trajectory
const fromJs = (array) => {
  const a = empty()

  const points = array.map(Point.fromJs)
  points.sort(Point.compareTime)
  setPoints(points, a)
  
  return a
}

// Float -> Trajectory -> Point
const getPoint = (time, a) => {
  const binarySearch = (low, upp, array) => {
    if (low === upp) {
      return [low, low]
    }

    if (low === upp - 1) {
      return [low, upp]
    }

    const mid = Math.floor((low + upp) / 2)
    const mid_time = Point.getTime(array[mid])

    if (time === mid_time) {
      return binarySearch(mid, mid, array)
    } else if (time < mid_time) {
      return binarySearch(low, mid, array)
    } else {
      return binarySearch(mid, upp, array)
    }
  }

  const points = getPoints(a)

  const [i, j] = binarySearch(0, points.length - 1, points)
  const i_time = Point.getTime(points[i])
  const j_time = Point.getTime(points[j])

  if (time <= i_time) {
    return points[i]
  } else if (j_time <= time) {
    return points[j]
  } else {
    return Point.interpolate(time, points[i], points[j])
  }
}

// Trajectory -> BoundRect
const getBoundRect = (a) => {
  const points = getPoints(a)

  return points.map((point) => {
    const x = Point.getX(point)
    const y = Point.getY(point)
    return BoundRect.create(x, x, y, y)
  }).reduce(BoundRect.compose, BoundRect.empty())
}

// Trajectory -> Float
const getMaxTime = (a) => {
  const point = getPoints(a).slice(-1)[0]
  return Point.getTime(point)
}

export const Trajectory = {
  fromJs,
  getPoint,
  getBoundRect,
  getMaxTime,
}