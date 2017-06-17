import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml, html} from 'common-tags'

export default view(() => ({

  render() {
    const picked = this.context.drink

    return html`
      <select class="auto-submit" name="${safeHtml`${this.pname('drink')}`}">
        ${["coffee", "tea", "lemonade"].map(drink => safeHtml`
          <option value="${drink}" ${picked == drink ? "selected" : ""}>${drink}</option>
        `)}
      </select>
    `
  },

  handle(params) {
    const picked = params['drink']
    if (picked) {
      const is_hot = ["coffee", "tea"].includes(picked)
      const arrow = is_hot ? "picked_hot_drink" : "picked_cold_drink"
      this.follow(arrow, {...this.context, ...{drink: picked}})
    }
  }

}))
