class Forebruary

  monthNames: [
    "January"
    "February"
    "March"
    "April"
    "May"
    "June"
    "July"
    "August"
    "September"
    "October"
    "November"
    "December"
  ]

  constructor: (options) ->
    {@element, @date} = options
    @date = @date or new Date()

    @c = []
    for i in [0...6]
      w = []
      for j in [1..13]
        d = i * 7 + j - 6
        switch
          when (d < 1) then w.push('')
          when (d > 31) then break
          else w.push(d)
      @c.push(w)

    @header = document.createElement("div")
    @header.classList.add("header")

    @month = document.createElement("strong")
    @month.classList.add("month")
    @month.addEventListener("click", @showMonths, false)
    @header.appendChild(@month)

    @year = document.createElement("span")
    @year.classList.add("year")
    @year.addEventListener("click", @editYear, false)
    @year.addEventListener("keypress", @updateYear, false)
    @year.contentEditable = "true"
    @header.appendChild(@year)

    @element.appendChild(@header)

    @container = document.createElement("div")
    @container.classList.add("container")

    for w in @c
      ul = document.createElement("ul")
      for d in w
        li = document.createElement("li")
        li.innerText = d
        li.classList.add("date-#{d}")
        li.addEventListener("click", @clickDate.bind(@, d), false)
        ul.appendChild(li)
      @container.appendChild(ul)

    @element.appendChild(@container)

    @months = document.createElement("ul")
    @months.classList.add("months")
    for m in [0...@monthNames.length]
      li = document.createElement("li")
      li.classList.add("month-#{m}")
      li.addEventListener("click", @clickMonth.bind(@, m), false)
      li.innerText = @monthNames[m].substr(0, 3)
      @months.appendChild(li)
    @element.appendChild(@months)

    @showDate()
    @hideMonths()

  slide: (i) =>
    @slideIndex = i
    @container.style.webkitTransform = "translateX(-#{(i - 1) * 2}em)"

  getRow: (d) =>
    Math.floor((d + 6 - @slideIndex) / 7)

  showDate: (date) =>
    date = date or @date

    # Update header
    @month.innerText = @monthNames[date.getMonth()]
    @year.innerText = date.getFullYear()

    # Slide
    d1 = new Date(date.getFullYear(), date.getMonth(), 1)
    @slide(7 - d1.getDay())

    uls = @container.querySelectorAll("ul")

    # Toggle selected
    selected = @container.querySelectorAll(".selected")
    if selected
      for el in selected
        el.classList.remove("selected")
    d = date.getDate()
    uls[@getRow(d)].querySelector(".date-#{d}")
      .classList.add("selected")

    # Hide extra days
    for x in [29..31]
      for li in @container.querySelectorAll(".date-#{x}")
        li.style.opacity = 0
        extraDate = new Date(date.getFullYear(), date.getMonth(), x)
        if extraDate.getMonth() == date.getMonth()
          li.style.opacity = 1

    # Select month
    for li in @months.querySelectorAll("li")
      li.classList.remove("selected")
    @months.querySelector(".month-#{date.getMonth()}")
      .classList.add("selected")

  setDate: (date) =>
    @date = date
    @showDate()

  clickDate: (d, e) =>
    @setDate(new Date(@date.getFullYear(), @date.getMonth(), d))

  showMonths: (e) =>
    @months.style.webkitTransform = "translateY(0)"

  hideMonths: (e) =>
    @months.style.webkitTransform = "translateY(-#{@element.offsetHeight}px)"

  clickMonth: (m, e) =>
    @setDate(new Date(@date.getFullYear(), m, @date.getDate()))
    @hideMonths()

  editYear: (e) =>
    @year.focus()

  updateYear: (e) =>
    if e.keyCode == 13
      @setDate(new Date(@year.innerText, @date.getMonth(), @date.getDate()))
      @year.blur()


module.exports = Forebruary

