import enter_promo_code from './enter_promo_code'
import change_cooler from './change_cooler'
import change_drink_type from './change_drink_type'
import enter_name from './enter_name'
import make_button from './make_button'
import cooler from './cooler'
import pick_drink_type from './pick_drink_type'
import wrong_code from './wrong_code'
import thanks from './thanks'
import special_thanks from './special_thanks'
import update_sugar from './update_sugar'
import {regular_price_service, promo_price_service} from './price'
import make_hot_summary from './hot_summary'
import make_cold_summary from './cold_summary'
const hot_summary = make_hot_summary(regular_price_service)
const cold_summary = make_cold_summary(regular_price_service)
const promo_hot_summary = make_hot_summary(promo_price_service)
const promo_cold_summary = make_cold_summary(promo_price_service)

export default () => ({
  type: "graph",
  start: "promo_code",
  arrows: {

  promo_code: {
    ok: "ordering_with_promo_code",
    wrong: "ordering_without_promo_code",
    skipped: "ordering_without_promo_code"
  },

  ordering_without_promo_code: {
    go_back: "promo_code"
  }

  },
  nodes: {
    promo_code: promo_code(),
    ordering_with_promo_code: ordering_with_promo_code(),
    ordering_without_promo_code: ordering_without_promo_code()
  }
})

const ordering_without_promo_code = () => ({
  type: "graph",
  start: "pick_drink_or_go_back",
  arrows: {

    pick_drink_or_go_back: {
      hot: "hot_summary",
      cold: "cold_summary"
    },

    hot_summary: {
      change_order: "pick_drink_or_go_back",
      ordered: "thanks"
    },

    cold_summary: {
      change_order: "pick_drink_or_go_back",
      ordered: "thanks"
    },

    thanks: {
      buy_more: "pick_drink_or_go_back"
    }

  },
  nodes: {
    pick_drink_or_go_back: pick_drink_or_go_back(),
    hot_summary: hot_summary(),
    cold_summary: cold_summary(),
    thanks: thanks()
  }
})

const ordering_with_promo_code = () => ({
  type: "graph",
  start: "enter_name",
  arrows: {

    enter_name: {
      entered: "pick_drink_or_go_back"
    },

    pick_drink_or_go_back: {
      go_back: "enter_name",
      hot: "promo_hot_summary",
      cold: "promo_cold_summary"
    },

    promo_hot_summary: {
      change_order: "pick_drink_or_go_back",
      ordered: "special_thanks"
    },

    promo_cold_summary: {
      change_order: "pick_drink_or_go_back",
      ordered: "special_thanks"
    },

    special_thanks: {
      buy_more: "pick_drink_or_go_back"
    }

  },
  nodes: {
    pick_drink_or_go_back: pick_drink_or_go_back(),
    enter_name: enter_name(),
    special_thanks: special_thanks(),
    promo_hot_summary: promo_hot_summary(),
    promo_cold_summary: promo_cold_summary()
  }
})

const promo_code = () => ({
  type: "graph",
  start: "enter_promo_code",
  arrows: {

    enter_promo_code: {
      wrong: "wrong_code"
    },

    wrong_code: {
      try_again: "enter_promo_code"
    }

  },
  nodes: {
    enter_promo_code: enter_promo_code(),
    wrong_code: wrong_code()
  }
})

const pick_drink_or_go_back = () => ({
  type: "composite",
  nodes: [
    ["pick", pick_drink()],
    ["go_back", go_back_button()]
  ]
})

const pick_drink = () => ({
  type: "graph",
  start: "nothing_configured",
  arrows: {

    nothing_configured: {
      picked_hot_drink: "pick_cooler",
      picked_cold_drink: "cold_drink_configured"
    },

    pick_cooler: {
      picked_cooler: "hot_drink_configured",
      picked_cold_drink: "cold_drink_configured"
    },

    hot_drink_configured: {
      picked_hot_drink: "hot_drink_configured",
      picked_cooler: "hot_drink_configured",
      picked_cold_drink: "cold_drink_configured"
    },

    cold_drink_configured: {
      picked_hot_drink: "pick_cooler",
      picked_cold_drink: "cold_drink_configured"
    }

  },
  nodes: {
    nothing_configured: nothing_configured(),
    cold_drink_configured: cold_drink_configured(),
    pick_cooler: pick_cooler(),
    hot_drink_configured: hot_drink_configured()
  }
})

const nothing_configured = () => ({
  type: "composite",
  nodes: [
    ["type", pick_drink_type()],
    ["sugar", set_sugar()]
  ]
})

const cold_drink_configured = () => ({
  type: "composite",
  nodes: [
    ["type", change_drink_type()],
    ["sugar", set_sugar()],
    ["nav", pick_cold_button()]
  ]
})

const pick_cooler = () => ({
  type: "composite",
  nodes: [
    ["type", change_drink_type()],
    ["cooler", cooler()],
    ["sugar", set_sugar()]
  ]
})

const hot_drink_configured = () => ({
  type: "composite",
  nodes: [
    ["type", change_drink_type()],
    ["cooler", change_cooler()],
    ["sugar", set_sugar()],
    ["nav", pick_hot_button()]
  ]
})

const set_sugar = () => ({
  type: "graph",
  start: "update_sugar",
  arrows: {

    update_sugar: {
      updated: "update_sugar"
    }

  },
  nodes: {update_sugar: update_sugar()}
})

const go_back_button = make_button('go_back', 'Back')
const pick_hot_button = make_button('hot', 'Next')
const pick_cold_button = make_button('cold', 'Next')
