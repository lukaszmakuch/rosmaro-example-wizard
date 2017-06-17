import {make_form_view} from 'simple-server-side-rosmaro-forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export default view(() => ({

  render() {
    const picked = this.context.cooler
    return `
      For every hot drink you get one of these: <br>
      ${["ice", "ac", "fan"].map(cooler => safeHtml`
        <label>
          <input
            class="auto-submit"
            ${picked == cooler ? "checked" : ""}
            type="radio"
            value="${cooler}"
            name="${this.pname('cooler')}">
          ${cooler}
        </label>
      `)}
    `
  },

  handle(params) {
    const cooler = params['cooler']
    if (cooler) {
      this.follow("picked_cooler", {...this.context, cooler})
    }
  }

}))
