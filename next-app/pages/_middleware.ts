import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  //console.log("中间件");
  //console.log(req);
  // return new Response('Hello, world!')
  //_middleware.ts可以有多个 每层路由都可以存在 进行req的中间处理
  //req执行_middleWare后才会向后执行
  //console.log(ev);
}
export type Middleware = (
  request: NextRequest,
  event: NextFetchEvent
) => Promise<Response | undefined> | Response | undefined