import * as glob from 'glob'
import * as KoaRouter from 'koa-router'
const router = new KoaRouter()

type LoadOptions = {
  /**
   * 扩展名
   */
  extname?: string;
}
// 映射请求
export const requestMapping = (base?: string): ClassDecorator => (
  target: any
) => {
  // 不传则为类名
  base = base || `/${target.name.toLocaleLowerCase()}`

  const maps = target.prototype.maps
  if (maps) {
    Object.keys(maps).forEach(keys => {
      const { method, path } = maps[keys]
      router[method](`${base}/${path}`, target.prototype[keys])
    })
  }
}
// 创建方法映射
const createMethodMapping = method => path => (target, property) => {
  path = path || `/${property.toLocaleLowerCase()}`

  if (!target.maps) {
    target.maps = {}
  }
  target.maps[property] = {
    method,
    path,
  }
}

export const getMapping = createMethodMapping('get')
export const postMapping = createMethodMapping('post')


// 加载路由
export const load = (folder:string, options?: LoadOptions): KoaRouter => {
  const extname = options && options.extname || '.{js,ts}'
  
  glob
    .sync(require('path').join(folder, `./**/*${extname}`))
    .forEach(item => {
      require(item)
    })
  return router
}