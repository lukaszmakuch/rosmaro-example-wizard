import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export default view(() => ({

  render() {
    const entered = this.context.name || ""
    return safeHtml`
      <input type="text" placeholder="enter your name" value="${entered}" name="${this.pname('name')}">
      <input type="submit" value="next" name="${this.pname('next')}">
    `
  },

  handle(params) {
    const name = params['name']
    if (name) {
      this.follow("entered", {...this.context, name})
    }
  }

}))
