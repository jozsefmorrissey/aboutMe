exports.encryptionCtrl = ($scope, encryptionSrvc) => {
  function setPosition(jqObj, incVal) {
    let position = jqObj.attr('position');
    if (!position) {
      position = '0';
    }
    const newVal = Number.parseInt(position, 10) + incVal;
    jqObj.attr('position', newVal);
  }

  function getPosition(id) {
    return $(`#${id}`).attr('position');
  }

  function getPassPhrases (elem) {
  	return getList(elem, 'pass-phrase');
  }

  function getBreadCrumbs (elem) {
  	return getList(elem, 'bread-crumb');
  }

  function getList (elem, clazz) {
    const phrases = [];
    $(elem).find(`.${clazz}`).each(function () {
      const value = $(this).val();
      phrases.push(value);
    });
    return phrases;
  }

  function encryptMulti(multiId, textId) {
    const multiElem = $(`#${multiId}`);
    const textElem = $(`#${textId}`);

    const passPhrases = getPassPhrases(multiElem);
    const breadCrumbs = getBreadCrumbs(multiElem);

    let encrypted = `\n\n${textElem.val()}`;
    for (let index = passPhrases.length - 1; index >= 0; index -= 1) {
      if (passPhrases[index]) {
        encrypted = encryptionSrvc.encode(encrypted, passPhrases[index]);

        if (breadCrumbs[index]) {
          encrypted = `\n\n${breadCrumbs[index]}\n\n${encrypted}`;
        }
      }
    }

    textElem.val(encrypted);
  }


  function encrypt(id) {
    const jqObj = $(`#${id}`);
    const ogMsg = jqObj.val();
    const passPhrase = jqObj.attr('pass-phrase');
    if (passPhrase) {
      const encoded = encryptionSrvc.encode(ogMsg, passPhrase);
      jqObj.text(encoded);
      jqObj.val(encoded);
      $scope.decrypted = false;
      setPosition(jqObj, 1);
    }
  }

  function decrypt(id) {
    const jqObj = $(`#${id}`);
    const ogMsg = jqObj.val();
    const passPhrase = jqObj.attr('pass-phrase');
    if (passPhrase) {
      const decoded = encryptionSrvc.decode(ogMsg, passPhrase)
      jqObj.text(decoded);
      jqObj.val(decoded);
      $scope.decrypted = true;
      setPosition(jqObj, -1);
    }
  }

  $('#user-encrypt-text').val('\n\nR in ROYGBIV\n\n✠⛛⛎♛♟☒▀╭┘ⓞ⒇␰⏳⎻⌝⋙䖓䓲䒸䏳䎜䌜䈷䇈䄼䂺䀈㽾㻮㹚㶅㳹峟導孯婎妷壡垧圈嘩唹呇卧劂冾傖侜桠杀晇攂搨拥慲悄彃帵峹宵媗奷埸囙櫊楉树晱攴握戭悾彈巧屟嫯奼堆噇哒掺我悧庋崔孰奖埗嘐呐劅傷件䵞䭞䦁吥刵做予䲃䩏䡋䘰䐱䉇䀴㷴㯪㧱㟬㗠㏟ㅤ⽀⵾⮊⦜❃┱⋼ℳἵᴶᬷᤋ᛾ᔃኒႧສ౪੔࡝ْє');

  $scope.getPosition = getPosition;
  $scope.encrypt = encrypt;
  $scope.decrypt = decrypt;
  $scope.encryptMulti = encryptMulti;
};
