import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export default view(() => ({

  render() {
    const name = this.context.name

    return safeHtml`${name}, thank you so much! Without you it wouldn't be possible!<br>
      <input type="submit" value="Have some good time... one more time!" name="${this.pname('buy_more')}">
    `
  },

  handle(params) {
    if (params['buy_more']) {
      this.follow("buy_more")
    }
  }

}))
