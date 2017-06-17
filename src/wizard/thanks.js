import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export default view(() => ({

  render() {
    return safeHtml`Thanks.
      <input type="submit" value="Buy more now!" name="${this.pname('buy_more')}">
    `
  },

  handle(params) {
    if (params['buy_more']) this.follow("buy_more")
  }

}))
