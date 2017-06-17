import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export default view(() => ({

  render() {
    return safeHtml`
      Sorry, the code is incorrect.<br>
      <input type="submit" name="${this.pname('try_again')}" value="Try again" />
      <input type="submit" name="${this.pname('skip')}" value="Skip" />
    `
  },

  handle(params) {
    if (params['skip']) return this.follow("skipped")
    if (params['try_again']) return this.follow("try_again")
  }

}))
