exports.encryptionSrvc = () => {
  const obj = {};
  function randInt(limit, isPlusMinus) {
    let int = Math.floor(Math.random() * limit);
    if (isPlusMinus) {
      int *= Math.random() < 0.5 ? -1 : 1;
    }
    return int;
  }

  function generateSteps(len) {
    const steps = [];
    for (let index = 0; index < len; index += 1) {
      steps[index] = randInt(65535, true);
    }
    return steps;
  }

  function generatePassphrase(len) {
    let steps = '';
    for (let index = 0; index < len; index += 1) {
      steps += String.fromCharCode(randInt(65535, true));
    }
    return steps;
  }

  function posMod(val, mod) {
    return ((val % mod) + mod) % mod;
  }

  function shiftLetter(letter, steps, letterCount, shouldDecode) {
    let letterCode = letter.charCodeAt(0);
    for (let index = 0; index < letterCount + 1; index += 1) {
      if (shouldDecode) {
        letterCode = posMod(letterCode + (steps.charCodeAt(index % steps.length) * -1), 65535);
      } else {
        letterCode = posMod(letterCode + steps.charCodeAt(index % steps.length), 65535);
      }
    }

    return String.fromCharCode(posMod(letterCode, 65535));
  }

  function codeString(msg, steps, shouldDecode) {
    let encoded = '';
    for (let index = msg.length - 1; index >= 0 ; index -= 1) {
      encoded = shiftLetter(msg[index], steps, msg.length - index, shouldDecode) + encoded;
    }
    return encoded;
  }

  function encode(msg, steps) {
    return codeString(msg, steps);
  }

  function decode(msg, steps) {
    return codeString(msg, steps, true);
  }

  obj.generateSteps = generateSteps;
  obj.generatePassphrase = generatePassphrase;
  obj.encode = encode;
  obj.decode = decode;

  return obj;
};
