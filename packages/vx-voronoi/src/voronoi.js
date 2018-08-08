import { voronoi as d3Voronoi } from 'd3-voronoi'

export default ({ width = 0, height = 0, x, y }) => {
  const voronoi = d3Voronoi()

  if (x) voronoi.x(x)
  if (y) voronoi.y(y)

  voronoi.extent([[-1, -1], [width + 1, height + 1]])

  return voronoi
}
