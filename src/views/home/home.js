exports.homeCtrl = ($scope) => {
  $scope.msg = 'home';
  const headerText = $('#chaos-to-order').text().trim();
  const letterProp = [];

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
    const diff = prop.target - curr;
    if (Math.abs(diff) < prop.step) {
      return prop.target;
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
          if (newVal !== prop.target) {
            disordered = true;
          }
          prop.vals[vIndex] = newVal;
        }
      }
    }
    setHeader();
    if (disordered) {
      window.setTimeout(order, 100);
    }
  }


  function disorder() {
    const motb = 10; // Margin Offset Top/Botom
    const morl = 30; // Margin Offset Right/Left
    const co = 255; // Color Offset
    const so = 30; // size Offset
    for (let index = 0; index < headerText.length; index += 1) {
      letterProp[index] = {};
      letterProp[index].letter = {
        target: finalHeader[index].charCodeAt(0),
        step: 1,
        vals: [headerText[index].charCodeAt(0)],
      };
      letterProp[index].color = {
        target: 0,
        step: 8,
        vals: [randInt(co), randInt(co), randInt(co)],
      };
      letterProp[index].font = {
        target: 48,
        step: 1,
        vals: [randInt(so, true) + 48],
      };
      letterProp[index].margin = {
        target: 0,
        step: 1,
        vals: [randInt(motb), randInt(motb), randInt(motb), randInt(morl)],
      };
    }
    setHeader();
    window.setTimeout(order, 2000);
    window.setTimeout(disorder, 10000);
  }

  disorder();
  window.setTimeout(order, 100);
  // window.setTimeout(disorder, 5000);

  $scope.disorder = disorder;
  $scope.order = order;
};
