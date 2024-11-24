// alert("test")
// console.log("test")
// document.addEventListener("DOMContentLoaded", function () {
//   var messageSpan = document.getElementById("messageSpan")
//   messageSpan.textContent = "tijabo"
//   var currentDate = new Date()
//   console.log("currentDate--------------------------------", currentDate)
//   var currentMonth = currentDate.getMonth() + 1
//   var currentDay = currentDate.getDate()

//   //   if (currentMonth === 5 && currentDay >= 5 && currentDay <= 10) {
//   //     messageSpan.textContent = "Waqtiga " + currentMonth
//   //   } else {
//   //     messageSpan.textContent = ""
//   //   }
// })

function get_pages() {
  frappe.xcall("frappe.desk.desktop.get_workspace_sidebar_items").then((r) => {
    var arr = Array(r.pages[0].content)

    r.pages.forEach((element, index) => {
      if (element.name != "Home") {
        frappe.db.get_doc("Workspace", element.name).then((res) => {
          if (res.shortcuts.length > 0) {
            var listitmes = ``

            res.shortcuts.forEach((el) => {
              //  alert(el.label)
              if (el.type == "DocType") {
                listitmes += `<li><a href="/app/${el.link_to
                  .replace(/\s/g, "-")
                  .toLowerCase()}">${el.label}</a></li>`
              }
            })

            $(`<li><a class="sidebar-sub-toggle "><svg class="icon md" style = "color:white">
           <use  fill="white" stroke="white"   href="#icon-${element.icon}"></use>
       </svg> ${element.name} <span class="sidebar-collapse-icon ti-angle-down"></span></a>
   <ul>
  
     
           
       ${listitmes}
      
   </ul>
</li>


`).appendTo(".sideitems")
          }
        })
      }
      // console.log(element)
    })
  })
}
function make_cust_nav_bar(navbardata) {
  // toolbar
  // if (frappe.boot && frappe.boot.home_page !== "setup-wizard") {
  // 	frappe.frappe_toolbar = new frappe.ui.toolbar.Toolbar();
  // }
  // if(this.navbardata){

  let navitems = ``
  let dropDownitems = ``
  let moredropDownitems = ``
  // let me = this
  // alert("ok")
  navbardata.forEach((el, index) => {
    //  alert(el.label)

    if (el.type == "DocType" && el.doc_view !== "List") {
      if (index > 10) {
        moredropDownitems += `<a class="dropdown-item " href="/app/${el.link_to
          .replace(/\s/g, "-")
          .toLowerCase()}">${el.label}</a>`
      } else {
        navitems += `<a class="nav-link nav-item" href="/app/${el.link_to
          .replace(/\s/g, "-")
          .toLowerCase()}">${el.label}</a>`
      }
    } else if (el.type == "DocType" && el.doc_view == "List") {
      // alert(el.label)
      if (index > 10) {
        moredropDownitems += `<a class="dropdown-item " href="/app/${el.link_to
          .replace(/\s/g, "-")
          .toLowerCase()}">${el.label}</a>`
      } else {
        navitems += `<a class="nav-link nav-item" href="/app/${el.link_to
          .replace(/\s/g, "-")
          .toLowerCase()}">${el.label}</a>`
        // alert(navitems)
      }
    } else if (el.type == "Page") {
      if (index > 10) {
        moredropDownitems += `<a class="dropdown-item " href="/app/${el.link_to
          .replace(/\s/g, "-")
          .toLowerCase()}">${el.label}</a>`
      } else {
        navitems += `<a class="nav-link nav-item" href="/app/${el.link_to
          .replace(/\s/g, "-")
          .toLowerCase()}">${el.label}</a>`
      }
    } else if (el.type == "Report") {
      // navitems += `<a class="nav-link nav-item" href="/app/${el.label.replace(" " , "-").toLowerCase()}/view/report">${el.label}</a>`

      dropDownitems += `<a class="dropdown-item" href="/app/query-report/${el.link_to}">${el.label}</a>`
      // console.log(dropDownitems)
    }
  })

  if (moredropDownitems) {
    navitems += `
			<div class="dropdown nav-item">
	 <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	   More
	 </a>
	 <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
	  ${moredropDownitems}
	  
	 </div>
   </div>
			`
  }
  if (dropDownitems) {
    navitems += `
		 <div class="dropdown nav-item">
  <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Reports
  </a>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
   ${dropDownitems}
   
  </div>
</div>
		 `
  }

  //  alert('ok')
  navbar = `

	<div class="overlay" data-overlay-first-page></div>
	<div class="overlay" data-overlay-first-page></div>
	<div class="menu" data-menu-first-page>
	  <div class="profile__img__close__nav">
		<div class="menu_profile__image__name">
		  <!-- <div class="menu_profile__image">
			<img src="./assests/images/profile-imp.png" alt="profile_img" />
		  </div> -->
		  <span class="menu_name">Cashier 1</span>
		</div>
		<div class="close__navbar__icon" data-first-page-close-nav>
		  <i class="fa fa-x"></i>
		</div>
	  </div>
	
	  <div class="menu__companies">
	  
		<span class="companies__title">Cashiers</span>
		<span class="companies__title">Ivoice</span>
		<span class="companies__title">IPD</span>
		<span class="companies__title">OPD</span>
		<span class="companies__title">Bill</span>
		<span class="companies__title">Reporting</span>
		<span class="companies__title">Config</span>
		<span class="companies__title">Cashiers</span>
		<span class="companies__title">Cashiers</span>
	  </div>
	
	  
	
	  <div class="menu__profile">
		<span>My Profile</span>
	   
		<span>Log out</span>
	  </div>
	</div>
	<header class="header">
	  <div class="logo__navlinks">
		<!-- logo -->
		<a class="mylogo nav-link icon" href="/app" data-logo>
		<i class="fa fa-home"></i>
		</a> 

		
		
		${navitems}
	
	<!--	<a class="nav-link nav-item" href="#">Configuration</a>  -->
	  </div>
	 
		
		
		<div class="profile__image__name mr-3">
		  <div class="profile__image">
			
		  </div>
		  <span class="nav-link nav-item">${frappe.boot.user.first_name}</span>
		  <button class="ml-3 mr-5  btn nav-link nav-item" onclick = "frappe.app.logout()">Logout</button>
		  <div class="dropdown nav-item">
		  <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			My Profile
		  </a>
		  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">		  
		  <button class="dropdown-item" onclick="frappe.ui.toolbar.route_to_user()">My Settings</button>
		  <button class="dropdown-item" onclick="frappe.ui.toolbar.clear_cache()">Reload</button>
		  
		  </div>
		</div>
		  	

		</div>
		<div class="open-navbarbtn" data-first-page-open-nav onclick = "openFirstPageNav()">
		  <i class="fa fa-bars"></i>
		</div>
	  </div>



	
	</header>
	
	

		`

  // 		<div class="notification__icon" data-notify-icon>
  // 	<a class="nav-link icon" href="#"
  // 	  ><i class="fa fa-bell"></i
  // 	></a>
  // 	<span class="notification__icon__indicator">7</span>
  //   </div>
  return navbar

  // }
  // }
}
function get_notification() {
  frappe.db.get_list("Nofication", { limit: 1000 }).then((r) => {
    $("#notif_count").html(r.length)
    // alert(r.length)
  })
}

function make_header_nav(data) {
  let navhtml = make_cust_nav_bar(data)

  if (frappe.boot && frappe.boot.home_page !== "setup-wizard") {
    let route = window.location.href
    // alert(window.location.href)
    // if(route !== "http://localhost/app" &&  route !== "http://localhost/app/home" ){
    // frappe.frappe_toolbar = new frappe.ui.toolbar.Toolbar();
    // alert(frappe.session.user)
    // console.log(frappe.boot)

    $(navhtml).prependTo($(".header_sec").empty())
    // $('.header_sec').empty('')
    // $(navhtml).appendTo('.header_sec')
    // let awesome_bar = new frappe.search.AwesomeBar();
    //  awesome_bar.setup("#navbar-search");
    // }
  }
}

if (JSON.parse(localStorage.getItem("navdata")) === null) {
  localStorage.setItem("navdata", JSON.stringify([]))
}
frappe.ui.Page = class Page {
  constructor(opts) {
    $.extend(this, opts)

    this.set_document_title = true
    this.buttons = {}
    this.fields_dict = {}
    this.views = {}

    this.make()
    let navbardata = JSON.parse(
      localStorage.getItem("navdata") || JSON.parse([])
    )

    // console.log(navbardata)
    frappe.ui.pages[frappe.get_route_str()] = this
    // let route  = window.location.href
    // alert("ok ok ")

    if (this.title !== "Workspace") {
      frappe.realtime.on("new_notice", (data) => {
        frappe.show_alert("New Notication ", 10)
        // alert("in realtime")
        setTimeout(() => {
          get_notification()
        }, 100)
      })
      make_header_nav(navbardata)
      get_notification()
    }
    // else{
    // 	$('.header_sec').empty()
    // }
  }

  make() {
    this.wrapper = $(this.parent)
    this.add_main_section()
    this.setup_scroll_handler()
    this.setup_sidebar_toggle()
  }

  setup_scroll_handler() {
    let last_scroll = 0
    window.addEventListener(
      "scroll",
      frappe.utils.throttle(() => {
        $(".page-head").toggleClass(
          "drop-shadow",
          !!document.documentElement.scrollTop
        )
        let current_scroll = document.documentElement.scrollTop
        if (current_scroll > 0 && last_scroll <= current_scroll) {
          $(".page-head").css("top", "-15px")
        } else {
          $(".page-head").css("top", "var(--navbar-height)")
        }
        last_scroll = current_scroll
      }),
      500
    )
  }

  get_empty_state(title, message, primary_action) {
    let $empty_state = $(`<div class="page-card-container">
			<div class="page-card">
				<div class="page-card-head">
					<span class="indicator blue">
						${title}</span>
				</div>
				<p>${message}</p>
				<div>
					<button class="btn btn-primary btn-sm">${primary_action}</button>
				</div>
			</div>
		</div>`)

    return $empty_state
  }

  load_lib(callback) {
    frappe.require(this.required_libs, callback)
  }

  // add_main_section() {
  // 	$(frappe.render_template("page", {})).appendTo(this.wrapper);
  // 	if (this.single_column) {
  // 		// nesting under col-sm-12 for consistency
  // 		this.add_view(
  // 			"main",
  // 			'<div class="row layout-main">\
  // 				<div class="col-md-12 layout-main-section-wrapper">\
  // 					<div class="layout-main-section"></div>\
  // 					<div class="layout-footer hide"></div>\
  // 				</div>\
  // 			</div>'
  // 		);
  // 	} else {
  // 		this.add_view(
  // 			"main",
  // 			`
  // 			<div class="row layout-main">
  // 				<div class="col-lg-2 layout-side-section"></div>
  // 				<div class="col layout-main-section-wrapper">
  // 					<div class="layout-main-section"></div>
  // 					<div class="layout-footer hide"></div>
  // 				</div>
  // 			</div>
  // 		`
  // 		);
  // 	}

  // 	this.setup_page();
  // }

  add_main_section() {
    $(frappe.render_template("page", {})).appendTo(this.wrapper)
    // if (this.single_column) {
    // 	// nesting under col-sm-12 for consistency
    // 	this.add_view(
    // 		"main",
    // 		'<div class="row layout-main">\
    // 			<div class="col-md-12 layout-main-section-wrapper">\
    // 				<div class="layout-main-section"></div>\
    // 				<div class="layout-footer hide"></div>\
    // 			</div>\
    // 		</div>'
    // 	);
    // } else {
    // alert("ok")
    this.add_view(
      "main",
      `
				<div class="row layout-main" style = "height:100% ;width:100%">
					
					
				<div class="col-lg-2 layout-side-section hide"></div>
					
					<div class="col-lg-12 layout-main-section-wrapper">
						<div class="layout-main-section" >
						
						</div>
						
					</div>



					<!-- Floot Button -->

					<div class="btn-group-fab" role="group" aria-label="FAB Menu">
					
				  </div>
								  </div>

			`
    )

    // }

    this.setup_page()
  }

  setup_page() {
    this.$title_area = this.wrapper.find(".title-area")

    this.$sub_title_area = this.wrapper.find("h6")

    if (this.title) this.set_title(this.title)

    if (this.icon) this.get_main_icon(this.icon)

    this.body = this.main = this.wrapper.find(".layout-main-section")
    this.container = this.wrapper.find(".page-body")
    this.sidebar = this.wrapper.find(".layout-side-section")
    this.footer = this.wrapper.find(".layout-footer")
    this.indicator = this.wrapper.find(".indicator-pill")

    this.page_actions = this.wrapper.find(".page-actions")

    this.btn_primary = this.page_actions.find(".primary-action")
    this.btn_secondary = this.page_actions.find(".btn-secondary")

    this.menu = this.page_actions.find(".menu-btn-group .dropdown-menu")
    this.menu_btn_group = this.page_actions.find(".menu-btn-group")

    this.actions = this.page_actions.find(".actions-btn-group .dropdown-menu")
    this.actions_btn_group = this.page_actions.find(".actions-btn-group")

    this.standard_actions = this.page_actions.find(".standard-actions")
    this.custom_actions = this.page_actions.find(".custom-actions")

    this.page_form = $('<div class="page-form row hide"></div>').prependTo(
      this.main
    )
    this.inner_toolbar = this.custom_actions
    this.icon_group = this.page_actions.find(".page-icon-group")

    if (this.make_page) {
      this.make_page()
    }

    this.card_layout && this.main.addClass("frappe-card")

    // keyboard shortcuts
    let menu_btn = this.menu_btn_group.find("button")
    menu_btn
      .attr("title", __("Menu"))
      .tooltip({ delay: { show: 600, hide: 100 } })
    frappe.ui.keys
      .get_shortcut_group(this.page_actions[0])
      .add(menu_btn, menu_btn.find(".menu-btn-group-label"))

    let action_btn = this.actions_btn_group.find("button")
    frappe.ui.keys
      .get_shortcut_group(this.page_actions[0])
      .add(action_btn, action_btn.find(".actions-btn-group-label"))
  }

  setup_sidebar_toggle() {
    let sidebar_toggle = $(".page-head").find(".sidebar-toggle-btn")
    let sidebar_wrapper = this.wrapper.find(".layout-side-section")
    if (this.disable_sidebar_toggle || !sidebar_wrapper.length) {
      sidebar_toggle.remove()
    } else {
      sidebar_toggle.attr("title", __("Toggle Sidebar")).tooltip({
        delay: { show: 600, hide: 100 },
        trigger: "hover",
      })
      sidebar_toggle.click(() => {
        if (frappe.utils.is_xs() || frappe.utils.is_sm()) {
          this.setup_overlay_sidebar()
        } else {
          sidebar_wrapper.toggle()
        }
        $(document.body).trigger("toggleSidebar")
        this.update_sidebar_icon()
      })
    }
  }

  setup_overlay_sidebar() {
    let overlay_sidebar = this.sidebar
      .find(".overlay-sidebar")
      .addClass("opened")
    $('<div class="close-sidebar">').hide().appendTo(this.sidebar).fadeIn()
    let scroll_container = $("html").css("overflow-y", "hidden")

    this.sidebar.find(".close-sidebar").on("click", (e) => close_sidebar(e))
    this.sidebar.on("click", "button:not(.dropdown-toggle)", (e) =>
      close_sidebar(e)
    )

    let close_sidebar = () => {
      scroll_container.css("overflow-y", "")
      this.sidebar.find("div.close-sidebar").fadeOut(() => {
        overlay_sidebar
          .removeClass("opened")
          .find(".dropdown-toggle")
          .removeClass("text-muted")
      })
    }
  }

  update_sidebar_icon() {
    let sidebar_toggle = $(".page-head").find(".sidebar-toggle-btn")
    let sidebar_toggle_icon = sidebar_toggle.find(".sidebar-toggle-icon")
    let sidebar_wrapper = this.wrapper.find(".layout-side-section")
    let is_sidebar_visible = $(sidebar_wrapper).is(":visible")
    sidebar_toggle_icon.html(
      frappe.utils.icon(
        is_sidebar_visible ? "sidebar-collapse" : "sidebar-expand",
        "md"
      )
    )
  }

  set_indicator(label, color) {
    this.clear_indicator()
      .removeClass("hide")
      .html(`<span>${label}</span>`)
      .addClass(color)
  }

  add_action_icon(icon, click, css_class = "", tooltip_label) {
    const button = $(`
			<button class="text-muted btn btn-default ${css_class} icon-btn">
				${frappe.utils.icon(icon)}
			</button>
		`)

    button.appendTo(this.icon_group.removeClass("hide"))
    button.click(click)
    button
      .attr("title", __(tooltip_label || frappe.unscrub(icon)))
      .tooltip({ delay: { show: 600, hide: 100 }, trigger: "hover" })

    return button
  }

  clear_indicator() {
    return this.indicator
      .removeClass()
      .addClass("indicator-pill whitespace-nowrap hide")
  }

  get_icon_label(icon, label) {
    let icon_name = icon
    let size = "xs"
    if (typeof icon === "object") {
      icon_name = icon.icon
      size = icon.size || "xs"
    }
    return `${
      icon ? frappe.utils.icon(icon_name, size) : ""
    } <span class="hidden-xs"> ${__(label)} </span>`
  }

  set_action(btn, opts) {
    let me = this
    if (opts.icon) {
      opts.label = this.get_icon_label(opts.icon, opts.label)
    }

    this.clear_action_of(btn)

    btn
      .removeClass("hide")
      .prop("disabled", false)
      .html(opts.label)
      .on("click", function () {
        let response = opts.click.apply(this, [btn])
        me.btn_disable_enable(btn, response)
      })

    if (opts.working_label) {
      btn.attr("data-working-label", opts.working_label)
    }

    // alt shortcuts
    let text_span = btn.find("span")
    frappe.ui.keys
      .get_shortcut_group(this)
      .add(btn, text_span.length ? text_span : btn)
  }

  set_primary_action(label, click, icon, working_label) {
    this.set_action(this.btn_primary, {
      label: label,
      click: click,
      icon: icon,
      working_label: working_label,
    })
    return this.btn_primary
  }

  set_secondary_action(label, click, icon, working_label) {
    this.set_action(this.btn_secondary, {
      label: label,
      click: click,
      icon: icon,
      working_label: working_label,
    })

    return this.btn_secondary
  }

  clear_action_of(btn) {
    btn.addClass("hide").unbind("click").removeAttr("data-working-label")
  }

  clear_primary_action() {
    this.clear_action_of(this.btn_primary)
  }

  clear_secondary_action() {
    this.clear_action_of(this.btn_secondary)
  }

  clear_actions() {
    this.clear_primary_action()
    this.clear_secondary_action()
  }

  clear_custom_actions() {
    this.custom_actions.addClass("hide").empty()
  }

  clear_icons() {
    this.icon_group.addClass("hide").empty()
  }

  //--- Menu --//

  add_menu_item(label, click, standard, shortcut) {
    return this.add_dropdown_item({
      label,
      click,
      standard,
      parent: this.menu,
      shortcut,
    })
  }

  add_custom_menu_item(parent, label, click, standard, shortcut, icon = null) {
    return this.add_dropdown_item({
      label,
      click,
      standard,
      parent: parent,
      shortcut,
      icon,
    })
  }

  clear_menu() {
    this.clear_btn_group(this.menu)
  }

  show_menu() {
    this.menu_btn_group.removeClass("hide")
  }

  hide_menu() {
    this.menu_btn_group.addClass("hide")
  }

  show_icon_group() {
    this.icon_group.removeClass("hide")
  }

  hide_icon_group() {
    this.icon_group.addClass("hide")
  }

  //--- Actions Menu--//

  show_actions_menu() {
    this.actions_btn_group.removeClass("hide")
  }

  hide_actions_menu() {
    this.actions_btn_group.addClass("hide")
  }

  add_action_item(label, click, standard) {
    return this.add_dropdown_item({
      label,
      click,
      standard,
      parent: this.actions,
    })
  }

  add_actions_menu_item(label, click, standard, shortcut) {
    return this.add_dropdown_item({
      label,
      click,
      standard,
      shortcut,
      parent: this.actions,
      show_parent: false,
    })
  }

  clear_actions_menu() {
    this.clear_btn_group(this.actions)
  }

  //-- Generic --//

  /*
   * Add label to given drop down menu. If label, is already contained in the drop
   * down menu, it will be ignored.
   * @param {string} label - Text for the drop down menu
   * @param {function} click - function to be called when `label` is clicked
   * @param {Boolean} standard
   * @param {object} parent - DOM object representing the parent of the drop down item lists
   * @param {string} shortcut - Keyboard shortcut associated with the element
   * @param {Boolean} show_parent - Whether to show the dropdown button if dropdown item is added
   */
  add_dropdown_item({
    label,
    click,
    standard,
    parent,
    shortcut,
    show_parent = true,
    icon = null,
  }) {
    if (show_parent) {
      parent.parent().removeClass("hide")
    }

    let $link = this.is_in_group_button_dropdown(
      parent,
      "li > a.grey-link > span",
      label
    )
    if ($link) return $link

    let $li
    let $icon = ``

    if (icon) {
      $icon = `<span class="menu-item-icon">${frappe.utils.icon(icon)}</span>`
    }

    if (shortcut) {
      let shortcut_obj = this.prepare_shortcut_obj(shortcut, click, label)
      $li = $(`
				<li>
					<a class="grey-link dropdown-item" href="#" onClick="return false;">
						${$icon}
						<span class="menu-item-label">${label}</span>
						<kbd class="pull-right">
							<span>${shortcut_obj.shortcut_label}</span>
						</kbd>
					</a>
				</li>
			`)
      frappe.ui.keys.add_shortcut(shortcut_obj)
    } else {
      $li = $(`
				<li>
					<a class="grey-link dropdown-item" href="#" onClick="return false;">
						${$icon}
						<span class="menu-item-label">${label}</span>
					</a>
				</li>
			`)
    }

    $link = $li.find("a").on("click", click)

    if (standard) {
      $li.appendTo(parent)
    } else {
      this.divider = parent.find(".dropdown-divider")
      if (!this.divider.length) {
        this.divider = $(
          '<li class="dropdown-divider user-action"></li>'
        ).prependTo(parent)
      }
      $li.addClass("user-action").insertBefore(this.divider)
    }

    // alt shortcut
    frappe.ui.keys
      .get_shortcut_group(parent.get(0))
      .add($link, $link.find(".menu-item-label"))

    return $link
  }

  prepare_shortcut_obj(shortcut, click, label) {
    let shortcut_obj
    // convert to object, if shortcut string passed
    if (typeof shortcut === "string") {
      shortcut_obj = { shortcut }
    } else {
      shortcut_obj = shortcut
    }
    // label
    if (frappe.utils.is_mac()) {
      shortcut_obj.shortcut_label = shortcut_obj.shortcut.replace("Ctrl", "⌘")
    } else {
      shortcut_obj.shortcut_label = shortcut_obj.shortcut
    }
    // actual shortcut string
    shortcut_obj.shortcut = shortcut_obj.shortcut.toLowerCase()
    // action is button click
    if (!shortcut_obj.action) {
      shortcut_obj.action = click
    }
    // shortcut description can be button label
    if (!shortcut_obj.description) {
      shortcut_obj.description = label
    }
    // page
    shortcut_obj.page = this
    return shortcut_obj
  }

  /*
   * Check if there already exists a button with a specified label in a specified button group
   * @param {object} parent - This should be the `ul` of the button group.
   * @param {string} selector - CSS Selector of the button to be searched for. By default, it is `li`.
   * @param {string} label - Label of the button
   */
  is_in_group_button_dropdown(parent, selector, label) {
    if (!selector) selector = "li"

    if (!label || !parent) return false

    const item_selector = `${selector}[data-label="${encodeURIComponent(
      label
    )}"]`

    const existing_items = $(parent).find(item_selector)
    return existing_items?.length > 0 && existing_items
  }

  clear_btn_group(parent) {
    parent.empty()
    parent.parent().addClass("hide")
  }

  add_divider() {
    return $('<li class="dropdown-divider"></li>').appendTo(this.menu)
  }

  get_or_add_inner_group_button(label) {
    var $group = this.inner_toolbar.find(
      `.inner-group-button[data-label="${encodeURIComponent(label)}"]`
    )
    if (!$group.length) {
      $group = $(
        `<div class="inner-group-button" data-label="${encodeURIComponent(
          label
        )}">
					<button type="button" class="btn btn-default ellipsis" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						${label}
						${frappe.utils.icon("select", "xs")}
					</button>
					<div role="menu" class="dropdown-menu"></div>
				</div>`
      ).appendTo(this.inner_toolbar)
    }
    return $group
  }

  get_inner_group_button(label) {
    return this.inner_toolbar.find(
      `.inner-group-button[data-label="${encodeURIComponent(label)}"]`
    )
  }

  set_inner_btn_group_as_primary(label) {
    this.get_or_add_inner_group_button(label)
      .find("button")
      .removeClass("btn-default")
      .addClass("btn-primary")
  }

  btn_disable_enable(btn, response) {
    if (response && response.then) {
      btn.prop("disabled", true)
      response.then(() => {
        btn.prop("disabled", false)
      })
    } else if (response && response.always) {
      btn.prop("disabled", true)
      response.always(() => {
        btn.prop("disabled", false)
      })
    }
  }

  /*
   * Add button to button group. If there exists another button with the same label,
   * `add_inner_button` will not add the new button to the button group even if the callback
   * function is different.
   *
   * @param {string} label - Label of the button to be added to the group
   * @param {object} action - function to be called when button is clicked
   * @param {string} group - Label of the group button
   */
  add_inner_button(label, action, group, type = "default") {
    var me = this
    let _action = function () {
      let btn = $(this)
      let response = action()
      me.btn_disable_enable(btn, response)
    }
    if (group) {
      var $group = this.get_or_add_inner_group_button(group)
      $(this.inner_toolbar).removeClass("hide")

      if (
        !this.is_in_group_button_dropdown(
          $group.find(".dropdown-menu"),
          "a",
          label
        )
      ) {
        return $(
          `<a class="dropdown-item" href="#" onclick="return false;" data-label="${encodeURIComponent(
            label
          )}">${label}</a>`
        )
          .on("click", _action)
          .appendTo($group.find(".dropdown-menu"))
      }
    } else {
      let button = this.inner_toolbar.find(
        `button[data-label="${encodeURIComponent(label)}"]`
      )
      if (button.length == 0) {
        button = $(`<button data-label="${encodeURIComponent(
          label
        )}" class="btn btn-${type} ellipsis">
					${__(label)}
				</button>`)
        button.on("click", _action)
        button.appendTo(this.inner_toolbar.removeClass("hide"))
      }
      return button
    }
  }

  remove_inner_button(label, group) {
    if (typeof label === "string") {
      label = [label]
    }
    // translate
    label = label.map((l) => __(l))

    if (group) {
      var $group = this.get_inner_group_button(__(group))
      if ($group.length) {
        $group
          .find(`.dropdown-item[data-label="${encodeURIComponent(label)}"]`)
          .remove()
      }
      if ($group.find(".dropdown-item").length === 0) $group.remove()
    } else {
      this.inner_toolbar
        .find(`button[data-label="${encodeURIComponent(label)}"]`)
        .remove()
    }
  }

  change_inner_button_type(label, group, type) {
    let btn

    if (group) {
      var $group = this.get_inner_group_button(__(group))
      if ($group.length) {
        btn = $group.find(
          `.dropdown-item[data-label="${encodeURIComponent(label)}"]`
        )
      }
    } else {
      btn = this.inner_toolbar.find(
        `button[data-label="${encodeURIComponent(label)}"]`
      )
    }

    if (btn) {
      btn.removeClass().addClass(`btn btn-${type} ellipsis`)
    }
  }

  add_inner_message(message) {
    let $message = $(
      `<span class='inner-page-message text-muted small'>${message}</div>`
    )
    this.inner_toolbar.find(".inner-page-message").remove()
    this.inner_toolbar.removeClass("hide").prepend($message)

    return $message
  }

  clear_inner_toolbar() {
    this.inner_toolbar.empty().addClass("hide")
  }

  //-- Sidebar --//

  add_sidebar_item(label, action, insert_after, prepend) {
    var parent = this.sidebar.find(".sidebar-menu.standard-actions")
    var li = $("<li>")
    var link = $("<a>").html(label).on("click", action).appendTo(li)

    if (insert_after) {
      li.insertAfter(parent.find(insert_after))
    } else {
      if (prepend) {
        li.prependTo(parent)
      } else {
        li.appendTo(parent)
      }
    }
    return link
  }

  //---//

  clear_user_actions() {
    this.menu.find(".user-action").remove()
  }

  // page::title
  get_title_area() {
    return this.$title_area
  }

  set_title(title, icon = null, strip = true, tab_title = "") {
    if (!title) title = ""
    if (strip) {
      title = strip_html(title)
    }
    this.title = title
    frappe.utils.set_title(tab_title || title)
    if (icon) {
      title = `${frappe.utils.icon(icon)} ${title}`
    }
    let title_wrapper = this.$title_area.find(".title-text")
    title_wrapper.html(title)
    title_wrapper.attr("title", this.title)
  }

  set_title_sub(txt) {
    // strip icon
    this.$sub_title_area.html(txt).toggleClass("hide", !!!txt)
  }

  get_main_icon(icon) {
    return this.$title_area
      .find(".title-icon")
      .html('<i class="' + icon + ' fa-fw"></i> ')
      .toggle(true)
  }

  add_help_button(txt) {
    //
  }

  add_button(label, click, opts) {
    if (!opts) opts = {}
    let button = $(`<button
			class="btn ${opts.btn_class || "btn-default"} ${
      opts.btn_size || "btn-sm"
    } ellipsis">
				${opts.icon ? frappe.utils.icon(opts.icon) : ""}
				${label}
		</button>`)
    // Add actions as menu item in Mobile View (similar to "add_custom_button" in forms.js)
    let menu_item = this.add_menu_item(label, click, false)
    menu_item.parent().addClass("hidden-xl")

    button.appendTo(this.custom_actions)
    button.on("click", click)
    this.custom_actions.removeClass("hide")

    return button
  }

  add_custom_button_group(label, icon, parent) {
    let dropdown_label = `<span class="hidden-xs">
			<span class="custom-btn-group-label">${__(label)}</span>
			${frappe.utils.icon("select", "xs")}
		</span>`

    if (icon) {
      dropdown_label = `<span class="hidden-xs">
				${frappe.utils.icon(icon)}
				<span class="custom-btn-group-label">${__(label)}</span>
				${frappe.utils.icon("select", "xs")}
			</span>
			<span class="visible-xs">
				${frappe.utils.icon(icon)}
			</span>`
    }

    let custom_btn_group = $(`
			<div class="custom-btn-group">
				<button type="button" class="btn btn-default btn-sm ellipsis" data-toggle="dropdown" aria-expanded="false">
					${dropdown_label}
				</button>
				<ul class="dropdown-menu" role="menu"></ul>
			</div>
		`)

    if (!parent) parent = this.custom_actions
    parent.removeClass("hide").append(custom_btn_group)

    return custom_btn_group.find(".dropdown-menu")
  }

  add_dropdown_button(parent, label, click, icon) {
    frappe.ui.toolbar.add_dropdown_button(parent, label, click, icon)
  }

  // page::form
  add_label(label) {
    this.show_form()
    return $(
      "<label class='col-md-1 page-only-label'>" + label + " </label>"
    ).appendTo(this.page_form)
  }
  add_select(label, options) {
    var field = this.add_field({ label: label, fieldtype: "Select" })
    return field.$wrapper.find("select").empty().add_options(options)
  }
  add_data(label) {
    var field = this.add_field({ label: label, fieldtype: "Data" })
    return field.$wrapper.find("input").attr("placeholder", label)
  }
  add_date(label, date) {
    var field = this.add_field({
      label: label,
      fieldtype: "Date",
      default: date,
    })
    return field.$wrapper.find("input").attr("placeholder", label)
  }
  add_check(label) {
    return $(
      "<div class='checkbox'><label><input type='checkbox'>" +
        label +
        "</label></div>"
    )
      .appendTo(this.page_form)
      .find("input")
  }
  add_break() {
    // add further fields in the next line
    this.page_form.append('<div class="clearfix invisible-xs"></div>')
  }
  add_field(df, parent) {
    this.show_form()

    if (!df.placeholder) {
      df.placeholder = df.label
    }

    df.input_class = "input-xs"

    var f = frappe.ui.form.make_control({
      df: df,
      parent: parent || this.page_form,
      only_input: df.fieldtype == "Check" ? false : true,
    })
    f.refresh()
    $(f.wrapper)
      .addClass("col-md-2")
      .attr("title", __(df.label))
      .tooltip({
        delay: { show: 600, hide: 100 },
        trigger: "hover",
      })

    // html fields in toolbar are only for display
    if (df.fieldtype == "HTML") {
      return
    }

    // hidden fields dont have $input
    if (!f.$input) f.make_input()

    f.$input.attr("placeholder", __(df.label))

    if (df.fieldtype === "Check") {
      $(f.wrapper).find(":first-child").removeClass("col-md-offset-4 col-md-8")
    }

    if (df.fieldtype == "Button") {
      $(f.wrapper).find(".page-control-label").html("&nbsp;")
      f.$input.addClass("btn-xs").css({ width: "100%", "margin-top": "-1px" })
    }

    if (df["default"]) f.set_input(df["default"])
    this.fields_dict[df.fieldname || df.label] = f
    return f
  }
  clear_fields() {
    this.page_form.empty()
  }
  show_form() {
    this.page_form.removeClass("hide")
  }
  hide_form() {
    this.page_form.addClass("hide")
  }
  get_form_values() {
    var values = {}
    for (let fieldname in this.fields_dict) {
      let field = this.fields_dict[fieldname]
      values[fieldname] = field.get_value()
    }
    return values
  }
  add_view(name, html) {
    let element = html
    if (typeof html === "string") {
      element = $(html)
    }
    this.views[name] = element.appendTo($(this.wrapper).find(".page-content"))
    if (!this.current_view) {
      this.current_view = this.views[name]
    } else {
      this.views[name].toggle(false)
    }
    return this.views[name]
  }
  set_view(name) {
    if (this.current_view_name === name) return
    this.current_view && this.current_view.toggle(false)
    this.current_view = this.views[name]

    this.previous_view_name = this.current_view_name
    this.current_view_name = name

    this.views[name].toggle(true)

    this.wrapper.trigger("view-change")
  }
}
// let navbardata = [{"title" : "OPD Orders" , "type" : "DocType"}, {"title" : "IPD Order" , "type" : "DocType"} , {"title" : "Que" , "type" : "DocType"}]

frappe.Application = class extends frappe.Application {
  constructor() {
    super()
    this.make()
  }

  make() {
    // $(` <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css">`).appendTo("head")
    // $(`<div class="col-lg-2 layout-sidebar-section"></div>`).appendTo("#body")
    // make_side()
    // get_pages()
    // sidebar_togg()
    // this.make_nav_bar()
  }
  make_nav_bar() {
    $('<div class = "header_sec"> </div>').appendTo("header")
  }
}

frappe.views.Workspace = class customWorkspace {
  constructor(wrapper) {
    this.wrapper = $(wrapper)
    this.page = wrapper.page
    this.title = "Home"
    // this.prepare_container()
  }
  show() {
    // $('.navbar').css('display' , 'none')
    //    alert("ok and")
    $(".page-head").hide()
    $(".header_sec").hide()
    // alert("ok")

    get_notification()

    //  this.body =

    this.page.main.empty()
    var me = this

    frappe.call({
      // method: "rasiin_design.api.template.get_html", //dotted path to server method
      method: "rasiin_design.api.template.app_page",
      callback: function (r) {
        // code snippet
        // alert("ol 2")
        // console.log("this is from python " ,r.message)
        var body = r.message[0]
        // console.log(r.message[1])
        $(frappe.render_template(body)).appendTo(me.page.main)
        $(".app_btn").click(function (e) {
          // alert( "Handler for .click() called." );
          // console.log(e.currentTarget.id)
          // alert(e.currentTarget.id)
          frappe.db
            .get_doc("Home Page", `${e.currentTarget.id}`)
            .then((doc) => {
              let navbardata = doc.home_shortcut
              //  navbardata.unshift({"label" : doc.name , "type" : "DocType" , "link_to" : doc.name})
              // console.log(doc.shortcuts[0].label)
              localStorage.removeItem("navdata")
              localStorage.setItem("navdata", JSON.stringify(navbardata))
              make_header_nav(navbardata)
              frappe.set_route(
                `/app/${doc.home_shortcut[0].link_to
                  .replace(/\s/g, "-")
                  .toLowerCase()}`
              )
              $(".header_sec").show()
              $(".page-head").show()
              // let app = new frappe.ui.Page()
              // make_header_nav(navbardata)

              // console.log(doc.shortcuts)
            })
        })
        //         frappe.require(['/assets/rasiin_design/js/lib/highcharts/code/highcharts.js' ,'/assets/rasiin_design/js/lib/highcharts/code/modules/exporting.js','/assets/rasiin_design/js/lib/highcharts/code/modules/export-data.js' ], () => {
        //             // alert("ok ")
        //            // Income vs Expense
        //         Highcharts.chart('containerchart', {
        //             chart: {
        //             type: 'spline'
        //             },
        //             title: {
        //             text: 'Income Vs Expense'
        //             },
        //             subtitle: {
        //             text: 'Year 2022'
        //             },
        //             xAxis: {
        //             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        //                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //             accessibility: {
        //                 description: 'Months of the year'
        //             }
        //             },
        //             yAxis: {
        //             title: {
        //                 text: 'Amount'
        //             },
        //             labels: {
        //                 // formatter: function () {
        //                 // return this.value + '°';
        //                 // }
        //             }
        //             },
        //             tooltip: {
        //             crosshairs: true,
        //             shared: true
        //             },
        //             plotOptions: {
        //             spline: {
        //                 marker: {
        //                 radius: 4,
        //                 lineColor: '#666666',
        //                 lineWidth: 1
        //                 }
        //             }
        //             },
        //             series: [{
        //             name: 'Income',
        //             marker: {
        //                 symbol: 'square'
        //             },
        //             lineColor:"#0f0",
        //             data : r.message[1][0]['inc']
        //             // data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, 26.4, 22.8, 17.5, 12.1, 7.6]

        //             }, {
        //             name: 'Expense',
        //             lineColor:"#f00",
        //             marker: {
        //                 symbol: 'diamond'
        //             },
        //             data : r.message[1][0]['exp']
        //             // data: [1.5, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
        //             }]
        //         });

        //                   // Create the chart
        // Highcharts.chart('pichart', {
        //     chart: {
        //       type: 'pie'
        //     },
        //     title: {
        //       text: 'Balance Sheet'
        //       },

        //     accessibility: {
        //       announceNewData: {
        //         enabled: true
        //       },
        //       point: {
        //         valueSuffix: '$'
        //       }
        //     },

        //     plotOptions: {
        //       series: {
        //         dataLabels: {
        //           enabled: true,
        //           format: '{point.name}: ${point.y:.1f}'
        //         }
        //       }
        //     },

        //     tooltip: {
        //       headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        //       pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        //     },

        //     series: [
        //       {
        //         name: "Browsers",
        //         colorByPoint: true,
        //         data: r.message[2]

        //         // [
        //         //   {
        //         //     name: "Chrome",
        //         //     y: 61.04,
        //         //     drilldown: "Chrome"
        //         //   },
        //         //   {
        //         //     name: "Safari",
        //         //     y: 9.47,
        //         //     drilldown: "Safari"
        //         //   },
        //         //   {
        //         //     name: "Edge",
        //         //     y: 0.0,
        //         //     drilldown: "Edge"
        //         //   },
        //         //   {
        //         //     name: "Firefox",
        //         //     y: 8.15,
        //         //     drilldown: "Firefox"
        //         //   },
        //         //   {
        //         //     name: "Other",
        //         //     y: 11.02,
        //         //     drilldown: null
        //         //   }
        //         // ]
        //       }
        //     ],

        //   });

        //          })
      },
    })
    // frappe.xcall("rasiin_design.api.template.get_html")
    // .then(r => {
    //     console.log('this is from python',r.message)
    //  $(frappe.render_template(r.message)).appendTo(this.page.main)
    // })

    // make_side()
    // sidebar_togg()
    // get_pages()
  }
  prepare_container() {
    // let list_sidebar = $(`
    // 	<div class="list-sidebar overlay-sidebar hidden-xs hidden-sm">
    // 		<div class="desk-sidebar list-unstyled sidebar-menu"></div>
    // 	</div>
    // `).appendTo(this.wrapper.find(".layout-side-section"));
    // this.sidebar = list_sidebar.find(".desk-sidebar");
    // this.body = this.wrapper.find(".layout-main-section");
  }

  // let openMenuFirstPageIcon = document.querySelector(
  // 	"[data-first-page-open-nav]"
  //   );
  //   const closeMenuFirstPageIcon = document.querySelector(
  // 	"[data-first-page-close-nav]"
  //   );
  //   const menuFirstPage = document.querySelector("[data-menu-first-page]");
  //   const overlayFirstPage = document.querySelector("[data-overlay-first-page]");
  //   const dataTable = document.querySelector("[data-table-sec]");
}
