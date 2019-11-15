import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import data from 'data/trajectoires.json'

import { Trajectory } from 'trajectory'
import { Point } from 'point'
import { BoundRect } from 'bound-rect'

import TrajectoryComp from 'components/trajectory'

const ids = data.map(a=>a.id)
const trajectories = data.map(a=>Trajectory.fromJs(a.points))
const bound_rect = trajectories.map(Trajectory.getBoundRect)
  .reduce(BoundRect.compose, BoundRect.empty())
const max_time = trajectories.map(Trajectory.getMaxTime)
  .reduce((acc, val) => Math.max(acc, val), -Infinity)

const getPoints = (time, trajectories) => {
  const points = trajectories.map(a=>Trajectory.getPoint(time, a))
  return points
}

const app = () => {
  let root_div = document.createElement('div')
  root_div.setAttribute('id','root')

  if (document.body !== null) {
    document.body.appendChild(root_div)
  }

  ReactDOM.render(
    <div className='grid-y align-center' style={{height:'100vh'}}>
      <div className='cell small-6'>
        <div className='grid-x align-center' style={{height:'100%'}}>
          <div className='cell small-6'>
            <TrajectoryComp
              trajectories={trajectories}
              bound_rect={bound_rect}
              max_time={max_time}
            />
          </div>
        </div>
      </div>
    </div>
    ,
    root_div
  )
}

window.addEventListener('load', app)