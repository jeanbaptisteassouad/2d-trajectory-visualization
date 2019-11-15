
import chai from 'chai'
const expect = chai.expect

import { Trajectory } from 'trajectory'
import { Point } from 'point'

describe('Trajectory', () => {
  const test = (str, array, ans) => it(str, () => {
    const t = Trajectory.fromJs(array)

    ans.forEach(([time, js]) => {
      const a = Trajectory.getPoint(time, t)
      expect(Point.toJs(a)).to.deep.equal(js)
    })
  })
  
  test(
    'one point trajectory test',
    [
      {time: 240,x: 0.2,y: 0.2}
    ],
    [
      [180, {time: 240,x: 0.2,y: 0.2}],
      [240, {time: 240,x: 0.2,y: 0.2}],
      [260, {time: 240,x: 0.2,y: 0.2}],
    ]
  )

  test(
    'two points trajectory test',
    [
      {time: 240,x: 0.2,y: 0.2},
      {time: 340,x: 0.4,y: -0.2},
    ],
    [
      [180, {time: 240,x: 0.2,y: 0.2}],
      [240, {time: 240,x: 0.2,y: 0.2}],
      [290, {time: 290,x: 0.3,y: 0.0}],
      [340, {time: 340,x: 0.4,y: -0.2}],
      [370, {time: 340,x: 0.4,y: -0.2}],
    ]
  )

  test(
    'three points trajectory test',
    [
      {time: 340,x: 0.4,y: -0.2},
      {time: 240,x: 0.2,y: 0.2},
      {time: 440,x: 1.0,y: 2.0},
    ],
    [
      [180, {time: 240,x: 0.2,y: 0.2}],
      [240, {time: 240,x: 0.2,y: 0.2}],
      [260, {time: 240,x: 0.2,y: 0.2}],
      [340, {time: 340,x: 0.4,y: -0.2}],
      [370, {time: 340,x: 0.4,y: -0.2}],
      [440, {time: 440,x: 1.0,y: 2.0}],
      [450, {time: 440,x: 1.0,y: 2.0}],
    ]
  )

})