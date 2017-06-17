import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export default (arrow_to_follow, label) => view(() => ({

  render() {
    return safeHtml`<input
      type="submit"
      name="${this.pname('button')}"
      value="${label}">`
  },

  handle(params) {
    if(params['button']) this.follow(arrow_to_follow)
  }

}))
