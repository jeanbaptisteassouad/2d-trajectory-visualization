
import React from 'react'
import { Trajectory } from 'trajectory'
import { Point } from 'point'
import { BoundRect } from 'bound-rect'

import StopAndPlayButton from 'components/stop-and-play-button'
import ReinitButton from 'components/reinit-button'

export default class TrajectoryComp extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      width:Infinity,
      height:Infinity,
      isOn:true,
      time_displayed:0,
    }

    this.colors = [
      '#594a4e',
      '#e78fb3',
      '#ffc0ad',
      '#6fc1a5',
      '#cccccc',
    ]


    this.reinit = () => {
      this.time = 0
      this.array_of_head_points = Array(props.trajectories.length).fill().map(() => [])
      this.array_of_tail_points = Array(props.trajectories.length).fill().map(() => [])      
    }

    this.reinit()

    this.pointToCanvasX = (p) =>
      BoundRect.normalizeX(Point.getX(p), this.props.bound_rect) * this.state.width

    this.pointToCanvasY = (p) =>
      (1 - BoundRect.normalizeY(Point.getY(p), this.props.bound_rect)) * this.state.height

    this.canvasXToPointX = (x) =>
      BoundRect.invNormalizeX(x / this.state.width, this.props.bound_rect)

    this.canvasYToPointY = (y) =>
      BoundRect.invNormalizeY(y / this.state.height, this.props.bound_rect)

    this.updateCanvasSize = (dom_element) => {
      if (
        this.state.width !== dom_element.parentNode.offsetWidth ||
        this.state.height !== dom_element.parentNode.offsetHeight
      ) {
        this.setState({
          height:dom_element.parentNode.offsetHeight,
          width:dom_element.parentNode.offsetWidth,
        })
      }
    }

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

    this.updateTimeDisplayed = () => {
      const update_rate_ms = 100

      this.setState({
        time_displayed:this.time,
      })

      setTimeout(this.updateTimeDisplayed, update_rate_ms)
    }

    this.ref = this.ref.bind(this)
  }


  ref(dom_element) {
    if (dom_element) {
      this.updateTimeDisplayed()
      
      this.ctx = dom_element.getContext('2d')

      const head_size = 10
      const head_opacity = 'ff'
      const tail_opacity = 'aa'

      const loop = () => {
        this.updateCanvasSize(dom_element)
        
        this.ctx.clearRect(0, 0, this.state.width, this.state.height)
        if (
          this.time < this.props.max_time * 1.1 &&
          this.state.isOn
        ) {
          this.time += 1

          this.props.trajectories
            .map(a=>Trajectory.getPoint(this.time, a))
            .forEach((point, i) => {
              this.array_of_tail_points[i].push(point)
              this.array_of_head_points[i] = this.array_of_tail_points[i].slice(-head_size)
            })

          
        } else {
          this.setState({isOn:false})
        }
        this.array_of_tail_points.forEach((points, i) => this.drawPath(this.colors[i]+tail_opacity, points))
        this.array_of_head_points.forEach((points, i) => this.drawPath(this.colors[i]+head_opacity, points))
        
        requestAnimationFrame(loop)
      }

      loop()
    } else {

    }
  }

  render() {
    return (
      <div className='grid-y' style={{height:'100%'}}>
        <div className='cell small-2'>
          <div className='grid-x grid-padding-x'>
            <div className='cell small-3'>
              <StopAndPlayButton
                isOn={this.state.isOn}
                onStart={() => this.setState({isOn:true})}
                onStop={() => this.setState({isOn:false})}
              />
            </div>
            <div className='cell small-3'>
              <ReinitButton
                onClick={() => {
                  this.reinit()
                  this.setState({isOn:true})
                }}
              />
            </div>
            <div className='cell small-3' style={{textAlign:'center'}}>
              {'t = '+this.state.time_displayed}
            </div>
          </div>
        </div>
        <div className='cell auto'>
          <div className='grid-x' style={{height:'100%'}}>
            <div className='cell small-2'>
              <div className='grid-y' style={{height:'100%'}}>
                <div className='cell small-1' style={{textAlign:'center'}}>
                  {this.canvasYToPointY(this.state.height)}
                </div>
                <div className='cell small-8'/>
                <div className='cell small-1' style={{textAlign:'center'}}>
                  {this.canvasYToPointY(0)}
                </div>
              </div>
            </div>
            <div className='cell small-10'>
              <div className='grid-y' style={{height:'100%'}}>
                <div className='cell small-10'>
                  <canvas width={this.state.width} height={this.state.height} ref={this.ref} style={{
                    border: '0.1em solid black',
                  }}/>
                </div>
                <div className='cell small-2'>
                  <div className='grid-x' style={{height:'100%'}}>
                    <div className='cell small-2'>
                      <div className='grid-y align-center' style={{height:'100%'}}>
                        <div className='cell shrink' style={{textAlign:'left'}}>
                          {this.canvasXToPointX(0)}
                        </div>
                      </div>
                    </div>
                    <div className='cell auto'/>
                    <div className='cell small-2'>
                     <div className='grid-y align-center' style={{height:'100%'}}>
                        <div className='cell shrink' style={{textAlign:'right'}}>
                          {this.canvasXToPointX(this.state.width)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
