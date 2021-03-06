// 引入页面 文件
// import foo from './views/foo'
// import bar from './views/bar'
import 'regenerator-runtime/runtime'

const routes = {
  '/foo': () => import('./views/foo'),
  '/bar': () => import('./views/bar')
}

// Router l类，用来控制页面根据当前 URl 切换
class Router {
  start () {
    // 在点击浏览器返回前进按钮时跳转到不同页面
    window.addEventListener('popstate', () => {
      // eslint-disable-next-line no-undef
      this.load(localtion.pathname)
    })
    // 打开页面时，加载当前页面
    this.load(location.pathname)
  }

  go (path) {
    history.pushState({}, '', path)
    // 加载页面
    this.load(path)
  }

  // 加载path路径
  async load (path) {
    if (path === '/') {
      path = '/foo'
    }
    const View = (await routes[path]()).default
    const view = new View()
    view.mount(document.body)
  }
}

// 导出router实例
export default new Router()
