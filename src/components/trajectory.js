import 'babel-polyfill'

import React from 'react'
import { Trajectory } from 'trajectory'
import { Point } from 'point'
import { BoundRect } from 'bound-rect'

export default class TrajectoryComp extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      width:123,
      height:123,
    }

    this.colors = [
      '#594a4e',
      '#e78fb3',
      '#ffc0ad',
      '#6fc1a5',
      '#cccccc',
    ]

    this.time = 0

    this.array_of_head_points = Array(props.trajectories.length).fill().map(() => [])
    this.array_of_tail_points = Array(props.trajectories.length).fill().map(() => [])

    this.pointToCanvasX = (p) =>
      BoundRect.normalizeX(Point.getX(p), this.props.bound_rect) * this.state.width

    this.pointToCanvasY = (p) =>
      (1 - BoundRect.normalizeY(Point.getY(p), this.props.bound_rect)) * this.state.height

    this.drawPath = (color, points) => {
      const ctx = this.ctx

      if (points.length === 0 || points.length === 1) {
        return
      }

      ctx.beginPath()
      ctx.strokeStyle = color
      const firts_point = points[0]
      ctx.moveTo(this.pointToCanvasX(firts_point), this.pointToCanvasY(firts_point))

      for (let i = 1; i < points.length; i++) {
        const point = points[i]
        ctx.lineTo(this.pointToCanvasX(point), this.pointToCanvasY(point))
      }
      ctx.stroke()
    }

    this.ref = this.ref.bind(this)
  }


  ref(dom_element) {
    if (dom_element) {
      this.setState({
        height:dom_element.parentNode.offsetHeight,
        width:dom_element.parentNode.offsetWidth,
      })


      this.ctx = dom_element.getContext('2d')

      console.log(this.props.trajectories)

      const head_size = 10
      const head_opacity = 'ff'
      const tail_opacity = 'aa'

      const loop = () => {
        this.time += 1
        this.ctx.clearRect(0, 0, this.state.width, this.state.height)

        this.props.trajectories
          .map(a=>Trajectory.getPoint(this.time, a))
          .forEach((point, i) => {
            this.array_of_tail_points[i].push(point)
            this.array_of_head_points[i] = this.array_of_tail_points[i].slice(-head_size)
          })

        this.array_of_tail_points.forEach((points, i) => this.drawPath(this.colors[i]+tail_opacity, points))
        this.array_of_head_points.forEach((points, i) => this.drawPath(this.colors[i]+head_opacity, points))
        if (this.time < this.props.max_time) {
          requestAnimationFrame(loop)
        }
      }

      loop()
    } else {

    }
  }

  render() {
    return (
      <canvas width={this.state.width} height={this.state.height} ref={this.ref} style={{
        border: '0.1em solid black',
      }}/>
    )
  }
}
