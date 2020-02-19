
function Match(profileA, profileB) {
    this.left = profileA;
    this.right = profileB;
    this.profiles = [profileA, profileB];
}

let img = "https://www.thespruceeats.com/thmb/IVEwZUNTa5XGDFhGtbF8iFaxn3I=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Hamburger-Hot-Dog-58add5f03df78c345bdef6ff.jpg";

let profiles = [
    new Profile("Name 1", "Desc 1", img),
    new Profile("Name 2", "Description 2", img),
    new Profile("Name 3", "Description 3", img),
    new Profile("Name 4", "Description 4", img)
];

let matches = [
    new Match(profiles[0], profiles[1]),
    new Match(profiles[2], profiles[3])
]

let areaElements = document.getElementsByClassName("draggable");
let areas = [];

for (var i = 0; i < areaElements.length; i++) {
  var area = areaElements[i];

  areas.push({
    x: area.x,
    y: area.y
  });
}

interact.maxInteractions(Infinity);

// interact.js example code below!
let transformProp;
const dragPositions = areas; /*[1, 2, 3, 4].reduce((acc, n) => {
  acc[`drag${n}`] = { x: 0, y: 0 }
  return acc
}, {})*/

// setup draggable elements.
interact('.draggable')
  .draggable({
    listeners: {
      start (event) {
        const position = dragPositions[event.target.id]
        position.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
        position.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
      },
      move (event) {
        const position = dragPositions[event.target.id]
        position.x += event.dx;
        position.y += event.dy;

        if (transformProp) {
          event.target.style[transformProp] =
            'translate(' + position.x + 'px, ' + position.y + 'px)';
        }
        else {
          event.target.style.left = position.x + 'px';
          event.target.style.top  = position.y + 'px';
        }
      },
      end (event) {
        const position = dragPositions[event.target.id]
        event.target.setAttribute('data-x', position.x);
        event.target.setAttribute('data-y', position.y);
      },
    }
  })

// setup drop areas.
// dropzone #1 accepts draggable #1
setupDropzone('#drop1', '#drag1');
// dropzone #2 accepts draggable #1 and #2
setupDropzone('#drop2', '#drag1, #drag2');
// every dropzone accepts draggable #3
setupDropzone('.js-drop', '#drag3');

/**
 * Setup a given element as a dropzone.
 *
 * @param {HTMLElement|String} target
 * @param {String} accept
 */
function setupDropzone (target, accept) {
  interact(target)
    .dropzone({
      accept: accept,
      ondropactivate: function (event) {
        addClass(event.relatedTarget, '-drop-possible');
      },
      ondropdeactivate: function (event) {
        removeClass(event.relatedTarget, '-drop-possible');
      },
    })
    .on('dropactivate', function (event) {
      const active = event.target.getAttribute('active')|0;

      // change style if it was previously not active
      if (active === 0) {
        addClass(event.target, '-drop-possible');
        event.target.textContent = 'Drop me here!';
      }

      event.target.setAttribute('active', active + 1);
    })
    .on('dropdeactivate', function (event) {
      const active = event.target.getAttribute('active')|0;

      // change style if it was previously active
      // but will no longer be active
      if (active === 1) {
        removeClass(event.target, '-drop-possible');
        event.target.textContent = 'Dropzone';
      }

      event.target.setAttribute('active', active - 1);
    })
    .on('dragenter', function (event) {
      addClass(event.target, '-drop-over');
      event.relatedTarget.textContent = 'I\'m in';
    })
    .on('dragleave', function (event) {
      removeClass(event.target, '-drop-over');
      event.relatedTarget.textContent = 'Drag me…';
    })
    .on('drop', function (event) {
      removeClass(event.target, '-drop-over');
      event.relatedTarget.textContent = 'Dropped';
    });
}

function addClass (element, className) {
  if (element.classList) {
    return element.classList.add(className);
  }
  else {
    element.className += ' ' + className;
  }
}

function removeClass (element, className) {
  if (element.classList) {
    return element.classList.remove(className);
  }
  else {
    element.className = element.className.replace(new RegExp(className + ' *', 'g'), '');
  }
}

interact(document).on('ready', function () {
  transformProp = 'transform' in document.body.style
    ? 'transform': 'webkitTransform' in document.body.style
      ? 'webkitTransform': 'mozTransform' in document.body.style
        ? 'mozTransform': 'oTransform' in document.body.style
          ? 'oTransform': 'msTransform' in document.body.style
            ? 'msTransform': null;
});