exports.homeCtrl = ($scope) => {
  $scope.msg = 'home';
  const headerText = $('#chaos-to-order').text().trim();
  const letterProp = [];
  let killOne = false;

  function randInt(limit, isPlusMinus) {
    let int = Math.floor(Math.random() * limit);
    if (isPlusMinus) {
      int *= Math.random() < 0.5 ? -1 : 1;
    }
    return int;
  }

  function setHeader() {
    let chaotic = '';
    for (let index = 0; index < headerText.length; index += 1) {
      let curr = `<span class='cto'/><b>${headerText[index]}</b></span>`;
      curr = $(curr).css({
        color: `rgb(${letterProp[index].color.vals[0]}, ${letterProp[index].color.vals[1]}, ${letterProp[index].color.vals[2]})`,
        'font-size': `${letterProp[index].font.vals[0]}px`,
        margin: `${letterProp[index].margin.vals[0]}px ${letterProp[index].margin.vals[1]}px ${letterProp[index].margin.vals[2]}px ${letterProp[index].margin.vals[3]}px`,
      });
      $(curr[0]).text(String.fromCharCode(letterProp[index].letter.vals[0]));
      chaotic += $(curr)[0].outerHTML;
    }
    $('#chaos-to-order').html(chaotic);
  }

  const finalHeader = ['O', 'r', 'd', 'e', 'r'];

  function retToTarget(prop, index) {
    const curr = prop.vals[index];
    const diff = prop.target[index] - curr;
    if (Math.abs(diff) < prop.step) {
      return prop.target[index];
    }
    if (diff < 0) {
      return curr - prop.step;
    }
    return curr + prop.step;
  }

  function order() {
    let disordered = false;
    for (let lIndex = 0; lIndex < letterProp.length; lIndex += 1) {
      const letter = letterProp[lIndex];
      const propKeys = Object.keys(letter);
      for (let pIndex = 0; pIndex < propKeys.length; pIndex += 1) {
        const prop = letter[propKeys[pIndex]];
        for (let vIndex = 0; vIndex < prop.vals.length; vIndex += 1) {
          const newVal = retToTarget(prop, vIndex);
          if (newVal !== prop.target[vIndex]) {
            disordered = true;
          }
          prop.vals[vIndex] = newVal;
        }
      }
      // let currLetter = letter['letter'].vals[0];
      // if (!currLetter.match(/[A-Za-z ]/)) {
      //   if (currLetter == currLetter.charCodeAt(0) + 1) {
      //     letter['letter'].vals[0] = 'a';
      //   } else {
      //     letter['letter'].vals[0] = ' ';
      //   }
      // }
    }
    setHeader();
    if (disordered) {
      if (Object.keys($('#chaos-to-order')).length) {
        window.setTimeout(order, 100);
      } else {
        killOne = true;
      }
    }
  }

  function initLetterProp(index) {
    if (letterProp[index]) {
      return;
    }
    letterProp[index] = {};
    letterProp[index].letter = {
      step: 0.6,
      vals: [finalHeader[index].charCodeAt(0)],
    };
    letterProp[index].color = {
      step: 8,
      vals: [0, 0, 0],
    };
    letterProp[index].font = {
      step: 1,
      vals: [48],
    };
    letterProp[index].margin = {
      step: 2,
      vals: [0, 0, 0, 0],
    };
  }

  let isOrdered = false;
  function disorder() {
    const motb = 10; // Margin Offset Top/Botom
    const morl = 60; // Margin Offset Right/Left
    const co = 255; // Color Offset
    const so = 30; // size Offset
    for (let index = 0; index < headerText.length; index += 1) {
      let letter;
      let color;
      let font;
      let margin;
      if (isOrdered) {
        letter = [finalHeader[index].charCodeAt(0)];
        color = [0, 0, 0];
        font = [48];
        margin = [0, 0, 0, 0];
      } else {
        letter = [headerText[index].charCodeAt(0)];
        color = [randInt(co), randInt(co), randInt(co)];
        font = [randInt(so, true) + 48];
        margin = [randInt(motb), randInt(motb), randInt(motb), randInt(morl)];
      }

      initLetterProp(index);

      letterProp[index].letter.target = letter;
      letterProp[index].color.target = color;
      letterProp[index].font.target = font;
      letterProp[index].margin.target = margin;
    }
    isOrdered = !isOrdered;

    setHeader();
    if (Object.keys($('#chaos-to-order')).length || !killOne) {
      window.setTimeout(order, 1000);
      window.setTimeout(disorder, 5000);
    } else {
      killOne = false;
    }
  }

  let skipDisorder;
  if (!skipDisorder) {
    disorder();
    window.setTimeout(order, 100);
  }

  $scope.disorder = disorder;
  $scope.order = order;
};
