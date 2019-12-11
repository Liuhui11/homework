import { Context } from 'koa'
import { getMapping, requestMapping, postMapping } from '../decorate/route'

import TestTo from '../module/testTo'
import { validate } from '../decorate/validate'
const testData = [
  { name: '111', age: 18 },
  { name: '111', age: 15 }
]

@requestMapping('/test')
export default class Test {
  @getMapping('list')
  @validate(TestTo)
  public list(ctx: Context) {
    ctx.body = { code: 0, data: testData, form: 'list', query: ctx.query }
  }

  @postMapping('list')
  @validate(TestTo, 'body')
  public add(ctx: Context) {
    testData.push(ctx.request.body)
    ctx.body = { code: 0, data: testData, form: 'test222', query: ctx.query }
  }
}
